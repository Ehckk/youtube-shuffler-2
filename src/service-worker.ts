/// <reference lib="webworker" />

import { build, files, version } from '$service-worker'

const worker = ( self as unknown) as ServiceWorkerGlobalScope
const STATIC_CACHE_NAME = `cache${version}`
const APP_CACHE_NAME = `offline${version}`

const routes = ["/"];

const addDomain = (assets: string[]) => assets.map((f) => self.location.origin + f);

const ourAssets = addDomain([
...files.filter((f) => !/\/icons\/(apple.*?|original.png)/.test(f)),
...build,
...routes,
]);

const toCache = [...ourAssets]
const staticAssets = new Set(toCache)

worker.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(STATIC_CACHE_NAME).then((cache) => {
			return cache.addAll(toCache)
		}).then(() => worker.skipWaiting())
	)
})

worker.addEventListener("activate", (event) => {
	event.waitUntil(caches.keys().then(async (keys) => {
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== STATIC_CACHE_NAME && key !== APP_CACHE_NAME) {
					await caches.delete(key)
				}
			}
			worker.clients.claim()
		})
	}))
})

const fetchAndCache = async (req: Request) => {
	const cache = await caches.open(APP_CACHE_NAME)
	try {
		const res = await fetch(req)
		cache.put(req, res.clone())
		return res
	} catch (err) {
		const res = await cache.match(req)
		if (res) {
			return res
		}
		throw err
	}
} 

worker.addEventListener("fetch", (event) => {
	if (event.request.method !== 'GET' || event.request.headers.has("range")) {
		return
	}
	const url = new URL(event.request.url)
	const isHttp = url.protocol.startsWith("http")
	const devServerReq = url.hostname === self.location.hostname && url.port !== self.location.port
	const staticAsset = staticAssets.has(url.href)
	const skip = event.request.cache === "only-if-cached" && !staticAsset
	if (isHttp && !devServerReq && !skip) {
		event.respondWith(
			(async () => {
				const cached = staticAsset && (await caches.match(event.request))
				return cached || fetchAndCache(event.request)
			})()
		)
	}
})
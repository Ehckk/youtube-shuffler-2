import type PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { derived, get, type Writable } from "svelte/store"; 
import { writable } from "svelte/store";
import type { PlaylistItem } from "./interfaces/PlaylistItem";
import type { Notif } from "./interfaces/Notif";
import type { NotifType } from "./interfaces/NotifType";
import type { ShuffleOptions } from "./interfaces/ShuffleOptions";

const createNotification = () => {
	const { subscribe, update } = writable<Notif[]>([])
	let count = 0
	// TODO notifoptions
	const push = (type: NotifType, message: string, info?: string, duration?: number) => {
		const newNotif: Notif = { type, message, info, id: ++count, duration }
		update((n) => [...n, newNotif])
		return count
	}
	const pop = (id: number) => {
		update((n) => {
			if (!n.length || id === 0) return []
			const target = id || Math.max(...n.map((i) => i.id))
			return n.filter((i) => i.id !== target)
		})
	}
	return { subscribe, update, push, pop }
}
const notifs = createNotification()
const shuffleOptions = writable<ShuffleOptions>({ keepCurrent: true, ignorePrev: false }) 
const currentPos = writable<number>(0)

const createPlaylist = () => {
	const { subscribe, update, set } = writable<PlaylistItem[]>([])
	let isPaused = false
	let isLooping = false
	const add = (item: PlaylistItem, index: number | null) => {
		update((n) => index === null ? [...n, item] : [...n.slice(0, index), item, ...n.slice(index, n.length)])
		return
	}
	const remove = (item: PlaylistItem) => {
		update((n) => n.filter((i) => i.id !== item.id))
		return item
	}
	const next = () => {
		currentPos.set(get(currentPos) + 1)
	}
	const prev = () => {
		currentPos.set(get(currentPos) - 1)
	}
	const clear = () => {
		update(() => [])
		currentPos.set(0)
	}
	const pause = () => {
		isPaused = !isPaused
	}
	const loop = () => {
		isLooping = !isLooping 
	}
	return { subscribe, update, set, add, remove, next, prev, clear, pause, loop, isPaused, isLooping }
}
const playlist = createPlaylist()
const current = derived<[typeof playlist, typeof currentPos], PlaylistItem>([playlist, currentPos], ([$playlist, $currentPos]) => $playlist[$currentPos])
const shuffling = writable<boolean>(false) 
const searching = writable<boolean>(false) 
const playState = writable<PlayerStates>(-1)
const loop= writable<boolean>(false)
const queue = writable<HTMLDivElement>()

export { notifs, shuffleOptions, currentPos, playlist, current, searching, shuffling, playState, loop, queue }
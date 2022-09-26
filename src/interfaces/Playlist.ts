import type { Thumbnail } from "./Thumbnail"

interface Playlist {
	kind: string
	etag: string
	id: string
	snippet: {
		publishedAt: string
		channelId: string
		title: string
		description: string
		thumbnails: {
			default?: Thumbnail
			medium?: Thumbnail
			high?: Thumbnail
			standard?: Thumbnail
			maxres?: Thumbnail
		}
		channelTitle: string
		localized: {
			title: string
			description: string
		}
		status: {
			privacyStatus: string // TODO enum here
		}
		contentDetails: {
			itemCount: number
		}
	}
}

export type { Playlist }
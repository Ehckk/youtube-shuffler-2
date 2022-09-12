import type { Thumbnail } from "./Thumbnail"

interface PlaylistSnippet {    
	publishedAt: string
	channelId: string
	title: string
	description: string
	thumbnails: {
		default: Thumbnail
		medium: Thumbnail
		high: Thumbnail
		standard?: Thumbnail
		maxres?: Thumbnail
	},
	channelTitle: string
	tags: string[]
	localized: {
		title: string
		description: string
	}
}

export type { PlaylistSnippet }
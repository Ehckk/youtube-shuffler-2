import type { Playlist } from "./Playlist"

interface PlaylistResponse {
	kind: string
	etag: string
	pageInfo: {
		totalResults: 1
		resultsPerPage: 5
	}
	items: Playlist[]
}

export type { PlaylistResponse }
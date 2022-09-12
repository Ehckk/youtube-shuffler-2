import type { PlaylistItemSearch } from "./PlaylistItemSearch"

interface PlaylistResponse {
	data: PlaylistItemSearch | null
	status: number
}

export type { PlaylistResponse }
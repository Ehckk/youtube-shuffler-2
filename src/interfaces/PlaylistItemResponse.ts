import type { PlaylistItem } from "./PlaylistItem"

interface PlaylistItemResponse {
    kind: string
    etag: string
    nextPageToken: string
    items: PlaylistItem[]
}

export type { PlaylistItemResponse }
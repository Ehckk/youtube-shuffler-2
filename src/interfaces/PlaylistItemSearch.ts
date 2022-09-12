import type { PlaylistItem } from "./PlaylistItem"

interface PlaylistItemSearch {
    kind: string
    etag: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    },
    items: PlaylistItem[]
    nextPageToken?: string
    prevPageToken?: string
}

export type { PlaylistItemSearch }
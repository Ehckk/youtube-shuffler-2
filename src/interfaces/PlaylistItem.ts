import type { PlaylistItemSnippet } from "./PlaylistItemSnippet"

interface PlaylistItem {
    kind: string
    etag: string
    id: string
    snippet: PlaylistItemSnippet
    contentDetails: {
        videoId: string
        videoPublishedAt: string
    },
    status: {
        privacyStatus: string
    }
}

export type { PlaylistItem }
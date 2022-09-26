import type { Thumbnail } from "./Thumbnail"

interface PlaylistItem {
    id: string
    snippet: {
        publishedAt: string
        channelId: string
        title: string
        description: string
        thumbnails: {
            default: Thumbnail
            medium: Thumbnail
            high: Thumbnail
            standard: Thumbnail
            maxres: Thumbnail
        },
        channelTitle: string
        playlistId: string
        position: number
        resourceId: {
            kind: string
            videoId: string
        }
        videoOwnerChannelTitle: string,
        videoOwnerChannelId: string
    }
    contentDetails: {
        videoId: string
        videoPublishedAt: string
    },
    status: {
        privacyStatus: string
    }
}

export type { PlaylistItem }
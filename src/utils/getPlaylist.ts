import type { PlaylistItem, QueueItem } from "../interfaces"
import { PlaylistErrors } from "../interfaces"
import { getPlaylistId } from "./getPlaylistId"
import { getPlaylistItems } from "./getPlaylistItems"
import { playlist, playlistId } from '../store'
import { get } from "svelte/store"

const getPlaylist = async (query: string | null, nextPageToken: string | null): Promise<void> => {
	if (get(playlistId) === null) {
		if (query === null) return Promise.reject(PlaylistErrors.BlankQuery)
		if (query.length === 0) return Promise.reject(PlaylistErrors.BlankQuery)
		const id = getPlaylistId(query)
		playlistId.set(id)
	} else if (nextPageToken === null) {
		return
	}
	const { data, status } = await getPlaylistItems(get(playlistId)!, nextPageToken)
	if (data === null) {
		return Promise.reject(status === 400 ? PlaylistErrors.InvalidQuery : PlaylistErrors.Internal)
	}
	const validItems: QueueItem[] = data.items.reduce((prevItems: QueueItem[], item: PlaylistItem) => {
		if (item.snippet.title === 'Deleted video') {
			console.log(`Failed to load video with id ${item.contentDetails.videoId} due to it being deleted`);
			return prevItems
		}
		if (item.snippet.title === 'Private video') {
			console.log(`Failed to load video with id ${item.contentDetails.videoId} due to it being private`);
			return prevItems
		}
		prevItems.push({ position: prevItems.length, item })
		return prevItems
	}, [])
	playlist.set([...get(playlist), ...validItems])
	return await getPlaylist(query, data.nextPageToken ?? null)
}

export { getPlaylist }
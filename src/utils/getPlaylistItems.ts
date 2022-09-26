import axios from "axios"
import type { PlaylistItem } from "@/interfaces/PlaylistItem";
import type { PlaylistItemResponse } from "@/interfaces/PlaylistItemResponse";
import type { PlaylistParameters } from "@/interfaces/PlaylistParameters";
import { get } from "svelte/store";
import { playlist, notifs } from '@/store';
import { formatQuery } from "./formatQuery";
import { NotifType } from "@/interfaces/NotifType";
const url = "https://www.googleapis.com/youtube/v3/";
const key = import.meta.env.VITE_YOUTUBE_TOKEN

const fetchNextPage = async (playlistId: string, pageToken: string | null): Promise<PlaylistItemResponse> => {
	const params: PlaylistParameters = {
		key: key,
		playlistId: playlistId,
		maxResults: 50,
		part: 'id, snippet, status, contentDetails',
		pageToken: pageToken ?? undefined
	}
	const { data } = await axios.get<PlaylistItemResponse>(url + 'playlistItems', { params })
	return data
}

const getPlaylistItems = async (playlistId: string, firstPage: boolean, pageToken: string | null): Promise<void> => {
	// console.log(playlistId, firstPage, pageToken);
	if (!firstPage && pageToken === null) {
		console.log('done');
		return
	}
	const { items, nextPageToken } = await fetchNextPage(formatQuery(playlistId), pageToken)
	addPlaylistItems(items)
	return getPlaylistItems(playlistId, false, nextPageToken ?? null)
}

const addPlaylistItems = (items: PlaylistItem[]=[]): void => {
	const item = items.shift() ?? null
	if (item === null) return
	if (item.snippet.title === 'Deleted video' || item.snippet.title === 'Private video') {
		const deleted = item.snippet.title === 'Deleted video'
		notifs.push(NotifType.Yellow, `Load Failed - ${deleted ? 'Deleted' : 'Private'}`, `Video with id ${item.contentDetails.videoId} failed to load due to it being ${deleted ? 'deleted' : 'private'}`)
		return addPlaylistItems(items)
	}
	playlist.add(item, null)
	return addPlaylistItems(items)
}

export { getPlaylistItems }
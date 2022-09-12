import axios from "axios"
import type { PlaylistItemSearch, PlaylistParameters, PlaylistResponse } from "../interfaces"
const url = "https://www.googleapis.com/youtube/v3/";
const key = import.meta.env.VITE_YOUTUBE_TOKEN

async function getPlaylistItems(playlistId: string, pageToken: string | null): Promise<PlaylistResponse> {
	const params: PlaylistParameters = {
		key: key,
		playlistId: playlistId,
		maxResults: 50,
		part: 'id, snippet, status, contentDetails'
	}
	if (pageToken !== null) {
		params.pageToken = pageToken
	}
	let status: number = 200
	const { data } = await axios.get<PlaylistItemSearch>(url + 'playlistItems', { params }).then((response) => {
		if (response.data.items.length === 0) {
			status = 400
			return { data: null }
		}
		return response
	}).catch(() => { 		
		status = 500
		return { data: null }
	})
	return { data, status }
}

export { getPlaylistItems }
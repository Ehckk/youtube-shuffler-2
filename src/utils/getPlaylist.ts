import axios from "axios"
import type { PlaylistParameters } from "@/interfaces/PlaylistParameters"
import type { PlaylistResponse } from "@/interfaces/PlaylistResponse"
const key = import.meta.env.VITE_YOUTUBE_TOKEN

const getPlaylist = async (playlistId: string) => {
	const params: PlaylistParameters = {
		key: key,
		id: playlistId,
		maxResults: 50,
		part: 'id, snippet, status, contentDetails'
	}
	const { data } = await axios.get<PlaylistResponse>('https://www.googleapis.com/youtube/v3/' + 'playlists', { params })
	if (data.items.length === 0) {
		return Promise.reject('Playlist not found') 
	}
	return data.items[0]
}

export { getPlaylist }
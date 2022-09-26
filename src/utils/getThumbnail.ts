import type { PlaylistItem } from "@/interfaces"

const getThumbnail = (item: PlaylistItem) => {
	const thumbnails = item.snippet.thumbnails
	return thumbnails.high ? thumbnails.high.url : thumbnails.medium ? thumbnails.medium.url : thumbnails.standard ? thumbnails.standard.url : thumbnails.default.url
}

export { getThumbnail }
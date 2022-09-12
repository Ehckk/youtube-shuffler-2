const getPlaylistId = (query: string): string | null => {
	query = query.trim()
	if (!query || query.length === 0) return null
	if ((query.includes('youtube.com') || query.includes('youtu.be')) && query.includes('playlist?list=')) {
		return String(query.match(/(playlist\?list=)(.*?)(?=(?:\?|$))/)![0].replace('playlist?list=', '')) ?? null
	}
	return query
}
// case query.length < 20 || query.includes(' '):	
// 	id = await searchForPlaylist('search', 'id', {q: query, type: 'playlist'}).then((r) => r.items[0] ? r.items[0].id.playlistId : null)
// 	break;
export { getPlaylistId }
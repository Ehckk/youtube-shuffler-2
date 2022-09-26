const formatQuery = (query: string): string => {
	query = query.trim()
	if ((query.includes('youtube.com') || query.includes('youtu.be')) && query.includes('playlist?list=')) {
		const format = String(query.match(/(playlist\?list=)(.*?)(?=(?:\?|$))/)![0].replace('playlist?list=', ''))
		return format
	}
	return query
}
export { formatQuery }
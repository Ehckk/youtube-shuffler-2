export const prerender = true;

export const load = () => {
	return {
		status: 302,
		redirect: '/'
	}
}
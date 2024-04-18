export const getApiOrigin = () => {
	if (process.env.NEXT_PUBLIC_ORIGIN !== undefined) {
		return process.env.NEXT_PUBLIC_ORIGIN
	}
	return 'http://localhost:8000'
}

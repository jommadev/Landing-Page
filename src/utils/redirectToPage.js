export function redirectToLogin(router) {
	router.push({
		pathname: '/login',
		query: { message: 'Your Session Expired. Please Login Again' },
	});
}


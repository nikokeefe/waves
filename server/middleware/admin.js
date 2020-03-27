let admin = (request, response, next) => {
	if (request.user.role === 0) {
		return response.send('You need admin privlages to update brands.');
	}
	next();
};

module.exports = { admin };

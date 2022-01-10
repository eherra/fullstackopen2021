const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	console.error(error.name)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'SequelizeValidationError') {
		getSequelizeValidationError(error.message, response)
	} else if (error.name === 'TypeError') {
		return response.status(400).send({ error: 'ID not found' })
	} else if (error.name === 'SequelizeUniqueConstraintError') {
		return response.status(400).send({ error: 'DB constraint error' })
	} else if (error.name === 'SequelizeDatabaseError') {
		return response.status(400).send({ error: 'Check SQL variables' })
	}
	next(error)
}

const getSequelizeValidationError = (errorMessage, response) => {
	if (errorMessage.includes('isEmail')) {
		return response.status(400).send({ error: 'Validation isEmail on username failed' })
	} else if (errorMessage.includes('year')) {
		return response.status(400).send({ error: 'Validation year - check that year value' })
	}
	return response.status(400).send({ error: 'DB validation error' })
}

module.exports = { errorHandler }

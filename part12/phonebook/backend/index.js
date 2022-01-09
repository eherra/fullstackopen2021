require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const personsRouter = require('./routes/persons')
const indexRouter = require('./routes/index')
const { errorHandler, unknownEndpoint } = require('./utils/errorHandlers')

app.use(express.json())
app.use(cors())

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :body'))

app.use('/', indexRouter);
app.use('/api/persons', personsRouter);

app.use(unknownEndpoint)
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
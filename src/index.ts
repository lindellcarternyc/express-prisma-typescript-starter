import express from 'express'
import morgan from 'morgan'


const app = express()
app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 6969

app.use('/', (_, res) => {
  res.status(404).send('NOT FOUND')
})

const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
import express from 'express'
import { scanDiskDrive } from './scanDiskDrive'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.send('Dockerizing Node Application'))

app.get('/api/scanDiskDrive', (req, res) => {
  const { folder, ext } = req.query

  if (typeof folder !== 'string' || typeof ext !== 'string') {
    return res.send('Query is not valid.')
  }

  const result = scanDiskDrive(folder, ext)

  return res.send(JSON.stringify(result))
})

app.listen(5000, () => console.log(`⚡️[bootup]: Server is running at port: 5000`))

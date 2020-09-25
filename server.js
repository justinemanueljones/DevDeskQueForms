const express = require('express')
const uuid = require('uuid').v4
const cors = require('cors')
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const friends = [
  {
    id: uuid(),
    title: 'Unit 2',
    description: 'React',
    curriculum: 'Lambda Launch',
    status: 'student',
    wit: [
      'Google',
      'Stackoverflow',
      'oher',
    ],
  },
]

app.get('/friends/:id', (req, res) => {
  const friend = friends.find(fr => fr.id === req.params.id)
  if (!friend) {
    res.status(404).json({ message: 'No such friend!' })
  }
  else {
    res.json(friend)
  }
})

app.get('/friends', (req, res) => {
  res.json(friends)
})

app.post('/friends', (req, res) => {
  const { title, description, curriculum, status } = req.body
  const requiredFields = { title, description, curriculum, status }

  if (Object.values(requiredFields).some(field => (!field || !field.trim()))) {
    res.status(400).json({ message: 'Some required fields are missing or invalid.' })
  }
  else if (req.body.wit && !Array.isArray(req.body.wit)) {
    res.status(400).json({ message: 'The optional `wit` field must be an array.' })
  }
  else {
    const newFriend = { id: uuid(), ...req.body }
    friends.push(newFriend)
    res.status(200).json(newFriend)
  }
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})

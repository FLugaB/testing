const express = require('express');
const router = express.Router()

console.log(`WOIII`)
console.log(`WOIII`)

router.get('/', (req, res) => {
  res.send('This is New Routes')
})


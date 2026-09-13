const express = require('express');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/about', (req, res) => {
    res.send('About')
  })

  app.get('/contact',(req,res)=>{
    res.send('Contact')
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
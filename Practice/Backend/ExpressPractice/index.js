const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
// http://localhost:3000/file1.txt
//app.get or app.post or app.put or app.delete(path,handlers)
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/about', (req, res) => {
    res.send('Hello About us!');
  });

  
app.get('/contact', (req, res) => {
    res.send('Hello Contact!');
  });

  app.get('/blog/:id', (req, res) => {
    // for this query => http://localhost:3000/blog/js?mode=dark&page=js
    console.log(req.params); // { id: 'js' }
    console.log(req.query);//{ mode: 'dark', page: 'js' }
    res.send(`Hello Blog of ${req.params.id}`);
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
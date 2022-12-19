const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const blog = { id: 1, title: 'Blog title', description: 'Blog description' };
  res.send(blog);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi.`);
});

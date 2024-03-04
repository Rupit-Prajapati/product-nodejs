const express = require('express')
require('./dbConfig')
const Product = require('./product');
const product = require('./product');
const app = express();
const multer = require('multer')
app.use(express.json())

app.get('/', async (req, res) => {
  const data = await Product.find();
  res.send(data)
})

app.get('/:name', async (req, res) => {
  const id = req.params
  const data = await Product.find(id);
  res.send(data)
})

app.post('/', async (req, res) => {
  const data = new Product(req.body)
  const result = await data.save();
  res.send(result)
})

app.delete('/:_id', async (req, res) => {
  console.log(req.params)
  const data = await Product.deleteOne(req.params)
  res.send(data)
})

app.put('/:_id', async (req, res) => {
  console.log(req.params, req.body)
  const data = await product.updateOne(req.params, { $set: req.body })
  res.send(data)
})

app.get('/search/:key', async (req, res) => {
  console.log(req.params.key)
  const data = await Product.find({
    '$or': [
      { 'name': { $regex: req.params.key } },
      { 'brand': { $regex: req.params.key } },
      { 'category': { $regex: req.params.key } },
    ]
  })
  res.send(data)
})

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
}).single('user_file')
// }).array('user_file', 2)

app.post('/upload', upload, (req, res) => {
  res.send('upload')
})

app.listen(8000)
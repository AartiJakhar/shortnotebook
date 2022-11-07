const express = require('express')
const  cors = require('cors')


const connectToMongo=require('./db')
connectToMongo();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())
// available Routes
app.use('/api/auth',require('./routes/Auth'))
app.use('/api/notes',require('./routes/Notes'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Inotebook backend listening at http://localhost:3000 on port ${port}`);

});

// require=require('esm')(module)
// module.exports=require('./index')
const express = require('express')
const dbConnect=require('./dbConnect')
const jobsRoute=require('./routes/jobsRoute')
const userRoute=require('./routes/usersRoute')
const path=require('path')

const app = express()
app.use(express.json())
app.use('/api/jobs/',jobsRoute)
app.use('/api/users',userRoute)




const port = process.env.PORT || 5000;
if(process.env.NODE_ENV === 'production')
 {
     app.use('/' , express.static('client/build'))

     app.get("*", (req, res) => {

          res.sendFile(path.join(__dirname, 'client/build/index.html'))
       
     });
 }



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
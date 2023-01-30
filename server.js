const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()


const HttpError = require('./helper/Error/Error')

const createUser = require('./routes/users/signUp')
const signIn = require('./routes/users/signIn')
const updateUser = require('./routes/users/updateUser')
const singleUser = require('./routes/users/getUser')
const deleteUser = require('./routes/users/deleteUser')
const followers = require('./routes/users/followUser')
const unFollowers = require('./routes/users/unfollowUser')
const allUser = require('./routes/users/allUser')
const getFriend = require('./routes/users/getFollowingUser')


const createPost = require('./routes/posts/createPost')
const updatePost = require('./routes/posts/updatePost')
const deletepost = require('./routes/posts/deletePost')
const likedPost = require('./routes/posts/likePost')
const singlePost = require('./routes/posts/singlePost')
const friendPost = require('./routes/posts/firendPost')

//conversation
const createCon = require('./routes/messanger/conversation')
const message = require('./routes/messanger/message')


app.use(express.json())
app.use('/uploads',express.static(path.join('uploads')))
dotenv.config()



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  
    next();
  });

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.once('error',(err)=>console.error(err))
db.on('open',()=>console.log('Database connected'))

//middlewear

app.use('/api/createuser',createUser)
app.use('/api/signin',signIn)
app.use('/api/update',updateUser)
app.use('/api/single',singleUser)
app.use('/api/delete',deleteUser)
app.use('/api/follower',followers)
app.use('/api/unfollower',unFollowers)
app.use('/api/alluser',allUser)
app.use('/api/friend',getFriend)



app.use('/api/createpost',createPost)
app.use('/api/updatepost',updatePost)
app.use('/api/deletepost',deletepost)
app.use('/api/likepost',likedPost)
app.use('/api/singlepost',singlePost)
app.use('/api/friendpost',friendPost)


//con
app.use('/api/conversation',createCon)
app.use('/api/message',message)









app.use((req,res,next)=>{
    const errors = new HttpError('No routes found',500)
    return next(errors)
})

app.use((error,req,res,next)=>{

    if(req.file){
        fs.unlink(req.file.path, err=>{
            console.log(err)
        })
    }
    

    if(res.headerSent){
        return next(error)
    }

    res.status(error.code || 500)
    res.json({message:error.message || 'something went wrong'})
})

app.listen(5000,()=>{
    console.log('server running')
})
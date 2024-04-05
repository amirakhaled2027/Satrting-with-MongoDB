const mongoose = require('mongoose')
const userModel = require('./user.schema')

const app = express()
const bodyParcel = require('body-parcel')

const url = "mongodb+srv://FirstUse:123FirstUse123@firstuse.zugs4rj.mongodb.net/?retryWrites=true&w=majority&appName=FirstUse";

const connectDB = async() => {
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(url)
        console.log('connect to Mongo DB')
    
    } catch (error) {
        console.log('error while connect to mongo ' + error)
        process.exit()
    }
}
connectDB();
app.use(bodyParcel.json());

app.get('./users', async function(req,res){
    let allUsers = await userModel.find()
    res.json({Users:allUsers, Status:2000})
})

app.post('/users', async function(req,res){
    console.log(req.body)
    let {name, email, age, phone} = req.body
    const user = {
        name: name,
        email: email,
        age: age,
        phone: phone
    }

    let createdUser = await userModal.create(user)
    res.json({message: 'user added successfully', Status:200, User:createdUser})
})

app.put('/users/:id', async function(req,res){
    let payload = res.body
    await userModal.findByIdAndUpdate(req.params.id.payload)
    res.json({message: 'User updates successfully ', Status:200})
})

app.deleted('/users/:id', async function(req,res){
    await userModel.findByIdAndDelete(req.params.id)
    res.json({message: 'user deleted successfully ', Status:200})
})

app.listen(8080);







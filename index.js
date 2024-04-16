const path = require('path');
const mongooseConnect = require("mongoose")
const cloudinary = require('cloudinary').v2;
const express = require('express')
const multer = require('multer');
const cors = require('cors')
const adminsRoute  = require('./Routes/adminsRoute')
const productRoute = require('./Routes/products');
const categoryRoute = require('./Routes/categories');
const userRoute = require('./Routes/users');
const regiserRoute = require('./Routes/register');
const loginRoute = require('./Routes/login');
const logoutRoute = require('./Routes/logout')
const refreshRoute = require('./Routes/refreshToken')
const registerAdminRoute = require('./Routes/registerAdmin')
const loginAdminRoute = require('./Routes/loginAdmin')
const logoutAdminRoute = require('./Routes/logoutAdmin')
const routerSubCategory = require('./Routes/sub-categories')
const Chatrouter = require('./Routes/messages');
const { app, server } = require('./socket/socket');
// ---------------- connect to database local and 
const DBlocal = "mongodb://localhost:27017/Dubazzile_Version_2"
const DBurl = 'mongodb+srv://Mena:dubizzle123456@dubizzle.udouey4.mongodb.net/Dubizzle?retryWrites=true&w=majority'

mongooseConnect.connect(DBurl).then((data) => {
    console.log('connected to dubizzle in atlas')

}).catch((err) => {
    console.log('error' + err)
})




app.use(cors()) // search (cors origins)
app.use(express.json())

app.use("/api/register", regiserRoute)
app.use('/registerAdmin', registerAdminRoute);
app.use("/api/login", loginRoute);
app.use('/loginAdmin', loginAdminRoute);
app.use("/refreshToken", refreshRoute)
app.use("/api/logout", logoutRoute)
app.use('/logoutAdmin', logoutAdminRoute)


// Multer Setup for storing imaegs
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });
  
  const storage = multer.diskStorage({
    // destination: './upload/images',
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  });
  
  const upload = multer({ storage, limits: { files: 5 } });
    
  app.post('/upload', upload.array('images', 5), function (req, res) {
    const promises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, function (err, result) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(result.secure_url);
          }
        });
      });
    });
  
    Promise.all(promises)
      .then(imageUrls => {
        res.status(200).json({
          success: true,
          message: "Uploaded!",
          image_urls: imageUrls
        });
      })
      .catch(error => {
        console.error('Error uploading files:', error);
        res.status(500).json({ success: false, message: 'Error uploading files' });
      });
  });


app.use('/admins', adminsRoute)
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);

app.use('/sub-category', routerSubCategory);
app.use('/chat', Chatrouter);

app.all('*', (req, res, next) => {
    res.send(`<h1> welcom Dubazzel server you don't select any path</h1><br/> <a href="http://localhost:3000/properties/alldata"></a>`)
})



// app.all('/', (req, res, next) => {
//     res.send('sorry this path not supported now')
// })








//--------------- error handling midle ware --------------
app.use((err, req, res, next) => {
    res.json({ msg: err })
})



const port = 3000
server.listen(port, () => {
    console.log("server connected port : " + port)
})



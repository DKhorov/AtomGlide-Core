
console.log("AtomGlide Node.JS Core ");

import cors from 'cors'
import multer from 'multer';
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {registerValidator} from './validations/auth.js'
import {loginValidation} from './validations/auth.js'
import {PostCreateValidation} from './validations/auth.js'
import {validationResult} from 'express-validator'
import UserModel from './models/user.js'
import {PS,uc} from './control/index.js'
import checkAuth from './utils/checkAuth.js'
import { register } from './control/control.js'



// Подключение к MongoDB с использованием mongoose
mongoose
 .connect('API_KEY')
 .then(()=>{console.log("Статус базы данных --- OK")}) // Если подключение успешно, выводим сообщение "DataBase --- OK"
 .catch((err)=>{console.log("Статус базы данных --- ERROR" , err)}); // Если произошла ошибка, выводим сообщение "DataBase --- ERROR" и саму ошибку

// Создание экземпляра приложения express
const app = express()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));

const upload = multer({ storage: storage });


app.use('/uploads',express.static('uploads/'));
app.use(express.json());
app.get('/auth/me' , checkAuth, uc.getMe);
app.get('/posts/:id' , PS.getOne);
app.get('/posts', PS.getAll);
app.get('/posts/tags', PS.tagsAll);
app.get('/tags', PS.tagsAll);
app.delete('/posts/:id',checkAuth , PS.remove);
app.patch('/posts/:id',checkAuth  , PS.update);
app.post('/auth/login' ,loginValidation, uc.login);
app.post('/auth/register' , registerValidator, uc.register);
app.post('/posts' ,checkAuth ,PostCreateValidation, PS.create);
app.post('/upload', upload.single('image'),(req, res, ) => {
    res.json({
        url:`/uploads/${req.file.originalname}`,});


});



// Запуск сервера на порту 4000
app.listen(4000, (err) =>{
    if (err){
        return console.log("Статус сервера --- ERROR ");
    }
    console.log("Статус сервера --- OK");
}); 



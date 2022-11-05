const express = require('express');
const cors = require('cors');
const path = require('path')
const { expressjwt: expressJWT } = require('express-jwt');
const {config} = require('./config');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(expressJWT({secret: config.jwtSecretKey, algorithms: ['HS256']}).unless({path:[/^\/api\//]}))

app.use(express.static(path.join(__dirname,"public")))
app.use(cors())

app.use('/api',require('./routes/login'));
app.use('/admin/usuario',require('./routes/usuario'));
app.use('/admin/producto',require('./routes/producto'));
app.use('/admin/cliente',require('./routes/cliente'));
app.use('/admin/empleado',require('./routes/empleado'));
app.use('/admin/rol',require('./routes/rol'));
app.use('admin/menu',require('./routes/menu'));
app.use('/client/perfil',require('./routes/clientePerfil'))

//Error-handling middleware
app.use((err,req,res,next) =>{
    if(err.name === 'UnauthorizedError')
        res.status(401).send('token invalido')
    //unknown error 
    console.log(err)
    res.send({status:1,msg:'unknown error'})
})

app.listen(80, ()=>{
    console.log('server running on http://127.0.0.1');
})
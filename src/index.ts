import express from 'express'
import morgan from 'morgan'
import EnterpriseRouter from './routes/enterprise.routes'
import UsuarioRoter from './routes/usuario.route';

const app = express()

app.use(express.json())
app.use(morgan('dev'))


const port= Number(process.env.PORT) || 3000;
app.listen(port)
//Routes
app.use(EnterpriseRouter,UsuarioRoter)

console.log('executing in port',port)


import express from 'express'
import morgan from 'morgan'
import EnterpriseRouter from './routes/enterprise.routes'

const app = express()

app.use(express.json())
app.use(morgan('dev'))


const port= Number(process.env.PORT) || 3000;
app.listen(port)
//Routes
app.use(EnterpriseRouter)

console.log('executing in port',port)


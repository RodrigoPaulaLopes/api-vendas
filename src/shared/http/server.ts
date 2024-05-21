import 'reflect-metadata'
import express, { NextFunction, Response, Request } from "express"
import cors from 'cors'
import router from './routes/index.router'
import AppError from "../errors/error"
import "../typeorm"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    } 

    return response.status(500).json({
        status: 'error',
        message: error.message
    })
})
app.listen(3002, () => console.log('http://localhost:3002/api/v1/'))

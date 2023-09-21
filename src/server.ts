import 'express-async-errors'
import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import { router } from './routes'
import { AppError } from './utils/AppError/AppError'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  return res.json({ message: 'Hello World' })
})

app.use(router) // Outros endpoints da aplicação

// Este trecho de código adiciona um handler de erro global para a aplicação.
// Alguns erros foram tipados e são bem conhecidos com a classe AppError.
// Caso o erro não seja um AppError, ele é tratado como um erro interno do servidor.
app.use(
  async (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      })
    }

    return response.status(500).json({ message: error.message })
  },
)

app.listen(8080, () => {
  console.log('Server running on port 8080')
})

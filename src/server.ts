import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

import { Server } from 'socket.io'
import config from './config'
import router from './routes'
import { v4 as uuid } from 'uuid'
import { createServer } from 'http'
import morgan from 'morgan'

type items = {
  id: string
  value: string
}

export const ServerConfig = () => {
  const app = express()
  const server = createServer(app)

  app.use(morgan('dev'))

  const socketIo = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  })

  let todoList: items[] = []
  const todoListNameSpace = socketIo.of('/todo')

  todoListNameSpace.on('connection', (socket) => {
    console.log(console.log('New connection established', socket.id))

    socket.emit('update', todoList)

    // add item
    socket.on('addItem', (item: string) => {
      console.log('add item', item)
      const newItem: items = { id: uuid(), value: item }
      todoList.push(newItem)
      console.log(todoList)
      todoListNameSpace.emit('update', todoList)
    })

    // update item
    socket.on('updateItem', (itemObj: items) => {
      console.log(itemObj)
      const findedItem = todoList.find((item) => item.id === itemObj.id)
      if (findedItem) {
        findedItem.value = itemObj.value
        todoListNameSpace.emit('update', todoList)
      }
    })

    // delete item
    socket.on('deleteItem', (id: string) => {
      todoList = todoList.filter((item) => item.id !== id)
      todoListNameSpace.emit('update', todoList)
    })

    socket.off('disconnect', () => {
      console.log('Client disconnected')
    })
  })

  app.use(bodyParser.json())

  app.get('/health', async (req: Request, res: Response) => {
    res.json({ ok: true, environment: config.env })
  })

  app.use(router)

  return server
}

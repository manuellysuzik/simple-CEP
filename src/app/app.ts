require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

import express from 'express'
import cors from 'cors'
import route from "../routes"
import "../database"


class App {
  app: any

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
    this.routes()
  }

  routes() {
    this.app.use(route)
  }
}

export default new App().app


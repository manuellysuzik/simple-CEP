import { createConnection } from 'typeorm'

try {
  createConnection()
} catch (err) {
  err
}


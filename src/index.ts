import config from './config'
import { ServerConfig } from './server'

const server = ServerConfig()
const { port } = config

server.listen(port, () => {
  console.log(`Server running on ${port}`)
})

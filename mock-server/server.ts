import jsonServer from 'json-server'
import { createErrorMiddleware } from './middleware'

const server = jsonServer.create()
const router = jsonServer.router('mock-server/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(createErrorMiddleware([
    {
            route: '/users',
            method: 'POST',
            statusCode: 503,
            times: 2
        }

        // Later:
        // {
        //     route: '/users',
        //     method: 'GET',
        //     statusCode: 500,
        //     times: 1
        // }

        // Timeout simulation:
        // {
        //     route: '/users',
        //     method: 'POST',
        //     statusCode: 503,
        //     times: 1,
        //     delayMs: 5000
        // }
]))
server.use(router)
server.listen(3001, () => {
    console.log('Mock server running on port 3001')
})
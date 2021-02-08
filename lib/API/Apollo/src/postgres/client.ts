import {Client} from 'pg'

// const environment = process.env.ENVIRONMENT || 'development'

function connectToDB() {
    const client = new Client({
        user: process.env.DATABASE_USER || 'test',
        host: process.env.DATABASE_HOST_URL || 'localhost',
        database: process.env.DATABASE_NAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'test',
        port: 5432,
    })

    try {
        console.info("Connected to DB")
        client.connect()
        client.query('SELECT NOW()')
        
        return client
    } catch(e) {
        console.info("Connection failed")
        console.error(e)
        process.exit(1)
    }
}

const dbClient = connectToDB()

export default dbClient;
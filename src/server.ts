import express, { response } from 'express'

const app = express()

app.get('/users', (req, res) => {
    return res.json({message: "Hello World Boy!"})
})



app.listen(3333, () => console.log('running! port 3000'))
const express = require('express')
const app = express()
const PORT = 3000;

app.get('/home', (req, res) => {
    res.status(200).send('<h1>Welcome to Home Page</h1>')
})

app.get('/aboutus', (req, res) => {
    res.status(200).json({
        email: "suppoer@example.com",
        phone: "1234567891",
        address:"123 Main Street, India"
    })
})

app.use((req, res) => {
    res.status(404).send("404 Not found")
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
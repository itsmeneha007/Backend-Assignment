const express = require("express")
const app = express()
const PORT = 3000

app.get("/home", (req, res) => {
    res.status(200).send("<h1>Welcome to Home Page</h1>")
})

app.get("/aboutus", (req, res) => {
    res.status(200).json({
        email: "support@example.com",
        phone: "+91-1234567890",
        address: "123, Express Lane, Node City"
    })
})

app.use((req, res) => {
    res.status(404).send("404 Not Found")
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
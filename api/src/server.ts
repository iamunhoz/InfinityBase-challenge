import express from "express"
import { Routes } from "src/lib/routes"
import { serverData } from "src/lib/config"
import { AppDataSource } from "src/lib/ormconfig"
import cors from "cors"
import Socket from "./socket"
import { seedDatabase } from "./lib/db.dev.seeder"

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your front-end domain or '*' to allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
)

Socket.initialize(app)

AppDataSource.initialize()
  .then(async () => {
    console.log("Database has been initialized")
    await seedDatabase(AppDataSource)
    new Routes(app)
    app.listen(serverData.port, () => {
      console.log(
        `Server ${serverData.APP_VERSION} is running on http://localhost:${serverData.port}`
      )
    })
  })
  .catch((error) =>
    console.error("Error during Data Source initialization:", error)
  )

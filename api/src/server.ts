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
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
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

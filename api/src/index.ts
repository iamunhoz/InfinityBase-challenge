import express from "express"
import { Routes } from "src/lib/routes"
import { serverData } from "src/lib/config"
import { AppDataSource } from "src/lib/ormconfig"

const app = express()
app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized")
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

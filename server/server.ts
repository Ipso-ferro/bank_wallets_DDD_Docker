
import express, {Express} from "express";
import { createControllers } from "./initializers/InitControllers";
import { config } from "./config";





const app: Express = express()

app.use(express.json());
// console.log(process.env)

const listApiController = createControllers()

listApiController.forEach((controller) => {
    app.use(controller.path, controller.router())
})


app.listen(config.server.apiPort, () => {
    console.log("working")
})


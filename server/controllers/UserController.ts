import { Router, Request, Response, response } from "express";
import { UserHandler } from "../../domain/users/handlers/UserHandler";
import { GetUserIdQuery } from "../../domain/users/queries/GetUserIdQuery";
import { AddNewUserRequest } from "../requests/AddNewUserRequest";
import { ApiController } from "./ApiController";

export class UserControllers implements ApiController{
  readonly path = "/bank";

  constructor(readonly userHandler: UserHandler) {}

  router(): Router {
    const router: Router = Router();

    router.post("/add/user", async (req: Request, res: Response) => {

      try {
        const requestValidator = new AddNewUserRequest(req)
        if (!requestValidator.validate()){
          throw new Error(requestValidator.errorMessage)
        } 
        const response = await this.userHandler.handlerAddNewUser(requestValidator.toCommand())
        res.status((response).status).json(response)
      } catch (error:any) {
        res.status(400).json(error.message);
      }
     
    });
    router.get("/user/:id",async (req: Request, res: Response) => {
      const id = req.params.id;

      const customerId: GetUserIdQuery = {id};
      const customer = await this.userHandler.getUserById(customerId);

      const response = customer == undefined ? [] : customer;
      res.status(200).json(response);
    });

    router.get("/all/users",async (req:Request,res:Response)=>{
      const response= await this.userHandler.getAllUsers()
      res.status(200).json(response)
    })
    return router;
  }
}

import { Router } from 'express';
import userController from './app/controllers/userController';

const route = Router();

route.post("/users", userController.create)
route.get("/users", userController.index)
route.get("/users/:id", userController.show)
route.put("/users/:id", userController.update)
route.delete("/users/:id", userController.delete)

export default route;

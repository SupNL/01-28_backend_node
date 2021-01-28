import { Router } from 'express';

import UserController from './controller/UserController';

const routes = Router();

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.create);
routes.delete("/users/:id", UserController.remove);

export default routes;
import { Router } from "express";
import usersRouter from "./users.routes"
import appointmentsRouter from "./appointements.routes"

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/appointments", appointmentsRouter);

export default routes;

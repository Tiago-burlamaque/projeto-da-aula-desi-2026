import { Router } from "express";
import { createUser, loginUser } from "../controller/usuario.controller.js";

const usuarioRouter = Router()

usuarioRouter.post('/login', loginUser)
usuarioRouter.post('/cadastrar', createUser)

export default usuarioRouter;
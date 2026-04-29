import { Router } from "express";
import { createService,
        deleteService,
        getAllServices,
        getServiceById,
        updateService
 } from "../controller/service.controller.js";

const serviceRouter = Router()

serviceRouter.post('/service', createService)
serviceRouter.get('/service', getAllServices)
serviceRouter.get('/service:id', getServiceById)
serviceRouter.patch('/service:id', updateService)
serviceRouter.delete('/service', deleteService)

export default serviceRouter;
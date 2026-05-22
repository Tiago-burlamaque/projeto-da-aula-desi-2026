import { Router } from "express";
import { 
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService
} from "../controller/service.controller.js";

const serviceRouter = Router();

// 🔥 CORRIGIDO - Sem /service duplicado!
serviceRouter.post('/', createService);           // POST /service
serviceRouter.get('/', getAllServices);           // GET /service  
serviceRouter.get('/:id', getServiceById);       // GET /service/2
serviceRouter.put('/:id', updateService);         // PUT /service/2 ✅
serviceRouter.delete('/:id', deleteService);      // DELETE /service/2 ✅

export default serviceRouter;
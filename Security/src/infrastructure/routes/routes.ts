import { Router } from "express";
import { SecurityController } from "../controllers/Controller";

const router = Router();
const controller = new SecurityController();

router.get("/roles/:id", controller.listRole.bind(controller));
router.post("/roles", controller.createRole.bind(controller));
router.put("/roles", controller.updateRole.bind(controller));
router.post("/roles/:id/asign", controller.asignRole.bind(controller));
router.get("/empresa/:id/user", controller.findUserByCompany.bind(controller));
router.post("/module", controller.createModule.bind(controller));
router.put("/module", controller.updateModule.bind(controller));
router.get("/module", controller.listModule.bind(controller));
router.get("/module/subscription/:idEmp", controller.listModuleSubscription.bind(controller));
router.get("/roles/:idRol/modules/:idEmp", controller.moduleByRole.bind(controller));
router.post("/user", controller.createUser.bind(controller));
router.put("/user", controller.updateUser.bind(controller));
router.get("/user/:id/cognito", controller.findUser.bind(controller));

export default router;
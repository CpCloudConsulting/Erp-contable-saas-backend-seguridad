import { Request, Response } from "express";
import { Container } from "../../container/Container";

export class SecurityController {
  private readonly services = new Container();

  async findUserByCompany(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const result = await this.services.findUserByCompany.execute(id);
    return res.json(result);
  }

  async listRole(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const result = await this.services.listRole.execute(id);
    return res.json(result);
  }

  async createRole(req: Request, res: Response) {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const role = await this.services.createRole.execute(body);
    return res.json(role);
  }

  async updateRole(req: Request, res: Response) {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const role = await this.services.updateRole.execute(body);
    return res.json(role);
  }

  async createModule (req: Request, res: Response) {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const module = await this.services.createModule.execute(body);
    return res.json(module);
  }

  async updateModule (req: Request, res: Response) {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const module = await this.services.updateModule.execute(body);
    return res.json(module);
  }

  async listModule(req: Request, res: Response) {
    const modules = await this.services.listModule.execute();
    return res.json(modules);
  }

  async asignRole(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const role = await this.services.asignRole.execute(id, body.modules);
    return res.json(role);
  }

  async moduleByRole(req: Request, res: Response) {
    const idRol = Number(req.params.idRol);
    const idEmp = Number(req.params.idEmp);
    if (!idRol || isNaN(idRol) || !idEmp || isNaN(idEmp)) {
      return res.status(400).json({ error: "Invalid IDs" });
    }
    const data = { idRol, idEmp}
    const modules = await this.services.moduleByRole.execute(data);
    return res.json(modules);
  }

  async listModuleSubscription(req: Request, res: Response) {
    const idEmp = Number(req.params.idEmp);
    if (!idEmp || isNaN(idEmp)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const data = { idEmp };
    const modules = await this.services.listModuleSubscription.execute(data);
    return res.json(modules);
  }

  async createUser(req: Request, res: Response){
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const user = await this.services.createUser.execute(body);
    return res.json(user);
  }

  async updateUser(req: Request, res: Response){
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const user = await this.services.updateUser.execute(body);
    return res.json(user);
  }

  async findUser(req: Request, res: Response){
    const id = req.params.id as string;
    const user = await this.services.findUserByCognito.execute(id);
    return res.json(user);
  }

}
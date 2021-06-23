import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, admin } = req.body;

    const userService = new CreateUserService();

    const user = await userService.execute({
      name,
      email,
      password,
      admin,
    });

    return res.status(201).json(user);
  }
}

export { CreateUserController };

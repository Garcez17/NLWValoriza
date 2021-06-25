import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { tag_id, user_receiver, message } = req.body;
    const { user_id: user_sender } = req;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id, 
      user_receiver, 
      user_sender, 
      message,
    });

    return res.status(201).json(compliment);
  }
}

export { CreateComplimentController };

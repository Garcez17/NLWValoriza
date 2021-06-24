import { getCustomRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { TagsRepository } from "../repositories/TagsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  user_sender: string;
  user_receiver: string;
  message: string;
  tag_id: string;
}

class CreateComplimentService {
  async execute({ message, tag_id, user_receiver, user_sender }: IRequest): Promise<Compliment> {
    const usersRepository = getCustomRepository(UsersRepository);
    
    const tagsRepository = getCustomRepository(TagsRepository);

    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    if (user_sender === user_receiver) throw new Error('You cannot praise yourself.');

    const userSender = await usersRepository.findOne(user_sender);

    if (!userSender) throw new Error('User sender not found.');
    
    const userReceiver = await usersRepository.findOne(user_receiver);

    if (!userReceiver) throw new Error('User receiver not found.');

    const tag = await tagsRepository.findOne(tag_id);

    if (!tag) throw new Error('Tag not found');

    const compliment = complimentsRepository.create({
      message,
      tag_id,
      user_receiver,
      user_sender,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };

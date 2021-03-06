import { getCustomRepository } from "typeorm";
import { Tag } from "../entities/Tag";
import { TagsRepository } from "../repositories/TagsRepository";

class CreateTagService {
  async execute(name: string): Promise<Tag> {
    const tagsRepository = getCustomRepository(TagsRepository);

    if (!name) throw new Error('Incorrect name!');

    const tagAlreadyExits = await tagsRepository.findOne({ name });

    if (tagAlreadyExits) throw new Error('Tag already exists.');

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
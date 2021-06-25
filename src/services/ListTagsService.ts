import { getCustomRepository } from "typeorm";
import { Tag } from "../entities/Tag";
import { TagsRepository } from "../repositories/TagsRepository";

class ListTagsService {
  async execute(): Promise<Tag[]> {
    const tagsRepository = getCustomRepository(TagsRepository);

    return tagsRepository.find();
  }
}

export { ListTagsService };
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class ListUsersService {
  async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    return usersRepository.find();
  }
}

export { ListUsersService };
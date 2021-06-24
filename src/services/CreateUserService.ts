import { hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin = false }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) throw new Error('Email incorrect.');

    const findExistentUser = await usersRepository.findOne({ email });

    if (findExistentUser) throw new Error('User already exists.');

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
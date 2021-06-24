import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) throw new Error('Email/Password incorrect.');

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) throw new Error('Email/Password incorrect.');

    const token = sign({
      email: user.email,
    }, 
      '0006f285cb0c01433032484f2b3281e5',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      user,
      token,
    }
  }
}

export { AuthenticateUserService };

import { hash } from 'bcryptjs';
// import { injectable, inject } from 'tsyringe'
// import AppError from "../../../shared/errors/AppError";

import { getRepository } from 'typeorm'

import UserModel from '../models/User.model';
// import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

// @injectable()
class CreateUserService {
  // constructor(
  //   @inject("UsersRepository")
  //   private userRepository: IUsersRepository
  // ) { }

  public async execute({ name, email, password }: IRequest): Promise<UserModel> {
    const usersRepository = getRepository(UserModel)

    const checkUserExists = await usersRepository.findOne({
      where: { email }
    })

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }
    // const checkUserExists = await this.userRepository.findByEmail(email);

    // if (checkUserExists) {
    //   throw new AppError('Email adress already used.');
    // }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({ name, email, password: hashedPassword });
    await usersRepository.save(user);
    // const user = await this.userRepository.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    return user;
  }
}

export default CreateUserService;

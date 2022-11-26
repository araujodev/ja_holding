import { Inject, Injectable } from '@nestjs/common';
import { hashPasswordTransform } from 'src/common/helpers/crypto';
import { userDefaultPass } from 'src/users/constants/user.businessrule';
import { User } from 'src/users/entities/user.entity';
import { MessageHelper } from 'src/users/helpers/message.helper';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

interface ICreateUser {
  name: string;
  username: string;
  password?: string;
}

Injectable();
export class CreateUserUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async execute(userParams: ICreateUser): Promise<any> {
    const userExists = await this.userRepository.findOne({
      where: { username: userParams.username },
    });

    if (userExists) {
      throw new Error(MessageHelper.USER_EXISTS_MESSAGE);
    }

    const passwordForTransform = userParams.password ?? userDefaultPass;
    const user = {
      id: uuid(),
      name: userParams.name,
      username: userParams.username,
      password: await hashPasswordTransform.to(passwordForTransform),
    } as User;

    await this.userRepository.save(user);

    const userPasswordReturnToOriginal = (u: User, originalPassword: string) =>
      (u.password = originalPassword);

    userPasswordReturnToOriginal(user, passwordForTransform);

    return user;
  }
}

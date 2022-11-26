import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPasswordTransform } from 'src/common/helpers/crypto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

interface IResponseLogin {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await hashPasswordTransform.compare(pass, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any): Promise<IResponseLogin> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    } as IResponseLogin;
  }
}

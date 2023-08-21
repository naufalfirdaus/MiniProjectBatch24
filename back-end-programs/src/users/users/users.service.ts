import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  private async findUserByUsername(username: string) {
    return this.userRepo.findOne({
      where: [
        { userName: username },
        { usersEmails: { pmailAddress: username } },
      ],
      relations: {
        usersEmails: true,
        usersPhones: true,
        usersEducations: true,
      },
    });
  }

  public async validateUser(username: string, password: string) {
    const user = await this.findUserByUsername(username);

    if (user) {
      const compare = await bcrypt.compare(password, user.userPassword);
      if (compare) {
        const { userPassword, ...result } = user;
        return result;
      }
    }

    return null;
  }

  public async login(user: any) {
    const User = await this.findUserByUsername(user.userName);

    const {
      userEntityId,
      userName,
      userFirstName,
      userLastName,
      userCurrentRole,
    } = user;

    const { usersEmails, usersPhones, usersEducations, userPhoto } = User;

    const payload = {
      userid: userEntityId,
      username: userName,
      firstname: userFirstName,
      lastname: userLastName,
      userphoto: userPhoto,
      email: usersEmails[0].pmailAddress,
      phone: usersPhones[0].uspoNumber,
      roleid: userCurrentRole,
      school: usersEducations[0].usduSchool,
      degree: usersEducations[0].usduDegree,
      fieldstudy: usersEducations[0].usduFieldStudy,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async getUserData(userEntityId: number) {
    try {
      const userData = await this.userRepo.findOne({
        where: {
          userEntityId: userEntityId,
        },
        relations: {
          usersEducations: true,
        },
      });

      return userData;
    } catch (error) {
      error.message;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'output/entities/Roles';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    @InjectRepository(Roles)
    private roleService: Repository<Roles>,
    private jwtService: JwtService,
  ) {}

  public async login(user: any) {
    const payload = {
      userid: user.userEntityId,
      username: user.userName,
      firstname: user.userFirstName,
      lastname: user.userLastName,
      roles: user.role.roleName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOne({
      where: [
        { userName: username },
        { usersEmails: { pmailAddress: username } },
      ],
      relations: { usersEmails: true },
    });

    if (user) {
      const role = await this.roleService.findOne({
        where: {
          roleId: user.userCurrentRole,
        },
      });
      const compare = user.userPassword == password;
      if (compare) {
        const { userPassword, ...result } = user;
        return { ...result, role };
      }
    }

    return null;
  }
}

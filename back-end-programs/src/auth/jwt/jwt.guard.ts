import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport/dist';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtGuard extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'miniproject',
    });
  }
  async validate(payload: any) {
    return {
      UserId: payload.userid,
      Username: payload.username,
      Firstname: payload.firstname,
      Lastname: payload.lastname,
      userphoto: payload.userphoto,
      email: payload.email,
      phone: payload.phone,
      roleId: payload.roleid,
      school: payload.school,
      degree: payload.degree,
      Fieldstudy: payload.fieldstudy,
    };
  }
}

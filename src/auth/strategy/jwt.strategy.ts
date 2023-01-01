import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User, UserDocument } from "../../user/user.schema";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, @InjectModel(User.name) private readonly model: Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')
    })
  }

  async validate(payload: { sub: number, email: string }) {
    const user = await this.model.findOne({ id: payload.sub, email: payload.email }).exec()

    delete user.password

    return user
  }
}
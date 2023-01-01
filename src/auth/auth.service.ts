import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../user/user.schema";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>, private jwt: JwtService, private config: ConfigService) {}


  async signin(dto: AuthDto): Promise<any> {
    const user = await this.model.findOne({ email: dto.email }).exec()

    if (!user)
      throw new ForbiddenException('Credential Failed on user')

    if (await !argon.verify(user.password, dto.password))
      throw new ForbiddenException('Credential Failed on Password')

    return this.signToken(user.id, user.email)
  }

  async signup(dto: AuthDto): Promise<any> {
    try {
  
      const user = await this.model.create({
        email: dto.email,
        password: dto.password,
      })
  
      return this.signToken(user.id, user.email)
    } catch(e) {
      if (e.code === 11000)
        throw new ConflictException({ message: 'user exists',  })

      throw new ForbiddenException('Credentials Failed')
    }
  }

  async signToken(id: string, email: string): Promise<{ token: string }> {
    const payload = {
      sub: id,
      email
    }

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1y',
      secret: this.config.get('JWT_SECRET')
    })

    return {
      token,
    }
  }
}
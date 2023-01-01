import { AuthGuard } from "@nestjs/passport";

export class JWTGuarad extends AuthGuard('jwt') {
  constructor() {
    super()
  }
}

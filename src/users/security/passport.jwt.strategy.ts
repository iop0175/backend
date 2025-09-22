import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { UsersService } from "../users.service";
import { Payload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'Ajkldnk12345!#makdsl1123'
        });
    }
    async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
        const user = await this.usersService.tokenValidateUser(payload);
        if (!user) {
            return (new UnauthorizedException({ message: 'user doew not exist' }))
        }
        return {
            userid: user.userid,
            name: user.name,
            email: user.email,
        };
    }
}
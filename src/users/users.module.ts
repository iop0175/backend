import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({
    secret: 'Ajkldnk12345!#makdsl1123',
    signOptions: { expiresIn: '36000s' }
  })
    , PassportModule,
  ],
  providers: [UsersService,JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule { }

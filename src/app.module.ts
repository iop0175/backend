import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/calple'),
    UsersModule,
    ProjectModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

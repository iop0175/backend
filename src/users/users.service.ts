import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { User, UserDocument} from './schema/users.schema';
import { Model } from 'mongoose';
import { Payload } from './security/payload.interface';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
      async create(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
      }
      
      async findByIdAndPw(userid:string,password:string):Promise<User|null>{
        const user = this.userModel.findOne({userid,password}).exec();
        return user;
      }
      async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
      }
      async findByEmailAndName(email:string,name:string):Promise<User|null>{
        return this.userModel.findOne({email,name}).exec();
      }
      async findPw(userid:string,email:string,name:string):Promise<User|null>{
        return this.userModel.findOne({userid,email,name}).exec();
      }
      async findById(userid:string):Promise<User | null>{
        return this.userModel.findOne({userid}).exec();
      }
      async tokenValidateUser(payload:Payload):Promise<User | null>{
        return  this.findById(payload.userid);
      }
}

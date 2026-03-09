import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [] as any[];
  private idCounter = 1;
  
  create(createUserDto: CreateUserDto) {
    const user = {
      id: this.idCounter++, ...createUserDto
    };
    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
    
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return 'user with id ${id} not found';
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return 'user with id ${id} not found';
    }
    this.users.splice(userIndex, 1);
    return 'This action remove a #${id} user';
  }
}

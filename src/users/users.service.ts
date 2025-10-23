import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    // id name email role
    {
      id: 1,
      name: 'Alice',
      email: 'jHg4o@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'hEg6o@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'jHg4o@example.com',
      role: 'INTERN',
    },
  ];
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(user: CreateUserDto) {
    const highestId = Math.max(...this.users.map((user) => user.id), 0);
    const newUser = {
      id: highestId + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, userUpdate: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User Not Found');
    }
    this.users[userIndex] = { ...this.users[userIndex], ...userUpdate };
    return this.users[userIndex];
  }
  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User Not Found');
    }
    const [deletedUser] = this.users.splice(userIndex, 1);
    return deletedUser;
  }
}

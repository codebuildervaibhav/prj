import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
  return user
  }
  
  create(user: { name: string; email: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, userUpdate: Partial<{ name?: string; email?: string; role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }>) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    this.users[userIndex] = { ...this.users[userIndex], ...userUpdate };
    return this.users[userIndex];
  }
  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser[0];
  }

}

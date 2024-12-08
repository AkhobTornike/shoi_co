import { Injectable } from '@angular/core';
import * as usersData from '../../../public/users.json';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): User[] {
    return (usersData as any).default;
  }

  getUserByID(userID: number): User {
    const users = this.getUsers();
    const user = users.find(u => u.userId === userID);

    return user ? user : { userId: 0, userName: '', email: '', firstName: '', lastName: ''};
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  getUsers() {
    return this.userList = this.fireBase.list('users');
  }

  insertUser(user: User) {
    this.getUsers();
    this.userList.push({
      identification: user.identification,
      name: user.name,
      mail: user.mail
    });
  }
}

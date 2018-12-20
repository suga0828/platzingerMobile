import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable()
export class UserProvider {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  getUsers(): AngularFireList<User> {
    return this.angularFireDatabase.list('/users');
  }

  getUserById(uid: string): AngularFireObject<User> {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  createUser(user: User) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user: User) {
    return this.angularFireDatabase.object('/users/' + user.uid).update(user);
  }

  setAvatar(avatar, uid) {
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar)
  }

  addFriend(userId, friendId) {
    this.angularFireDatabase.object('users/' + userId + '/friends/' + friendId).set(friendId);
    return this.angularFireDatabase.object('users/' + friendId + '/friends/' + userId).set(userId);
  }
}

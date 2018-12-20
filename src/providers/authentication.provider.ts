import { Injectable } from '@angular/core';

import { AngularFireAuth } from'@angular/fire/auth';
import * as firebase  from'firebase/app'

@Injectable()

export class AuthenticationProvider {

  constructor(private angularFireAuth: AngularFireAuth) { }

  loginWithEmail(email:string, password:string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.angularFireAuth.auth.signInWithPopup(provider);
  }

  registerWithEmail(email:string, password:string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.angularFireAuth.user;
  }

  logOut() {
    return this.angularFireAuth.auth.signOut();
  }

}

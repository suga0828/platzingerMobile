import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user.provider';
import { Status, User } from '../../interfaces/user';
import { AuthenticationProvider } from '../../providers/authentication.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[];
  query: string;
  user: User;
  uid: string;
  status: Status;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public authenticationProvider: AuthenticationProvider)
  {
    this.status = this.navParams.get('status');
    this.authenticationProvider.getStatus()
      .subscribe( data => {
        this.userProvider.getUserById(data.uid)
          .valueChanges()
          .subscribe( (user: User) => {
            this.user = user;
            if (this.status !== user.status) {
              this.user.status = user.status;
              this.userProvider.editUser(this.user);
            }
          });
      });
    console.log(this.user);
    this.userProvider.getUsers()
      .valueChanges()
      .subscribe( data => {
        this.friends = data;
      });
  }

  goToConversation(user: User) {
    this.navCtrl.push('ConversationPage', { data: user });
  }

}

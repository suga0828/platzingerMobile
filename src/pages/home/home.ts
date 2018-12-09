import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../providers/user.provider';
import { Status, User } from '../../interfaces/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: User[];
  query: string;
  alexander: User = {
    name: 'Alexander',
    age: 26,
    active: false,
    status: Status.Online,
  };

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider) {
    this.contacts = this.userProvider.get();
    this.userProvider.add(this.alexander);

  }

  goToConversation(user) {
    this.navCtrl.push('ConversationPage', { data: user });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication.provider';
import { UserProvider } from '../../providers/user.provider';
import { HomePage } from '../home/home';
import { User, Status } from '../../interfaces/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  operation: string = 'login';

  nick: string;
  email: string;
  password: string;
  status: Status = Status.Online;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    private userProvider: UserProvider,
    public toastCtrl: ToastController) {
  }

  login() {
    this.authenticationProvider.loginWithEmail(this.email, this.password)
      .then( data => {
        const toast = this.toastCtrl.create({
          message: 'Inicio de sesión correcto',
          duration: 2000
        });
        console.log(data);
        toast.present();
        this.navCtrl.push(HomePage, { status: this.status });
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: 'Ocurrió un error',
          duration: 2000
        });
        toast.present();
        console.log(error)
      })
  }

  register() {
    this.authenticationProvider.registerWithEmail(this.email, this.password)
      .then(data => {
        const user: User = {
          uid: data.user.uid,
          nick: this.nick,
          email: data.user.email
        }
        console.log(user);
        this.userProvider.createUser(user)
          .then(data => {
            const toast = this.toastCtrl.create({
              message: 'Registrado correctamente',
              duration: 2000
            });
            toast.present();
            console.log(data)
            this.operation = 'login'
          })
          .catch(error => {
            const toast = this.toastCtrl.create({
              message: 'Ocurrió un error',
              duration: 2000
            });
            toast.present();
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  loginWithFacebook() {
    this.authenticationProvider.loginWithFacebook()
      .then( data => {
        if (data.additionalUserInfo.isNewUser) {
          const newUser: User =
          {
            uid: data.user.uid,
            email: data.user.email,
            name: data.user.displayName,
            status: this.status
          }
          this.userProvider.createUser(newUser)
            .then(data => {
              const toast = this.toastCtrl.create({
                message: 'Registrado y logueado con Facebook correctamente',
                duration: 2000
              });
              toast.present();
            })
            .catch(error => {
              const toast = this.toastCtrl.create({
                message: 'Ocurrió un error',
                duration: 2000
              });
              toast.present();
              console.log(error)
            })
        } else {
          const toast = this.toastCtrl.create({
            message: 'Inicio de sesión con Facebook correcto',
            duration: 2000
          });
          toast.present();
        }
        this.navCtrl.push(HomePage);
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: 'Ocurrió un error',
          duration: 2000
        });
        toast.present();
        console.log(error)
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

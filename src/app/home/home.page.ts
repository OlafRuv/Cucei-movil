import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';

// Importamos la autentificación en nuestra pagina de login
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

import { AlertController } from '@ionic/angular'

// Verificación de usuarios
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = "";
  password: string = "";
  constructor
  (
    public navCtrl: NavController, 
    public afAuth: AngularFireAuth,
    public user: UserService,
    public router: Router,
    public authService: AuthService,
    public alertController: AlertController
  ) { }

  ngOnInit(){
  }

  async showAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }

  async login(){
    const { username, password } = this
    this.authService.loginEmailUser(username + '@codedamn.com', password)
    .then((res)=>{
      this.showAlert("Welcome", "You're logging!")
      this.onLoginRedirect()
    }).catch( err => this.showAlert('Error: ', err.message))
  }

  onLoginRedirect(){
    this.router.navigate(['/tabs/map'])
  }

  // Creamos el metodo login en async
  // abdcefg + @codedamn.com
  /*
  async login(){
    const { username, password } = this
    try{
      // There is a kind of a hack... xd
      const res = await this.afAuth.signInWithEmailAndPassword(username + '@codedamn.com', password);
      
      
      if(res.user){
        this.user.setUser({
          uid: res.user.uid,
          username,
          password
        })
        this.router.navigate(['/tabs'])
      }
      

    }catch(err){
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        console.log("User Not Found")
      }
    }
  }
  */
}

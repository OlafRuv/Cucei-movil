import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';

// Importamos la autentificación en nuestra pagina de login
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = "";
  password: string = "";
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) { // Agregamos el parametro de AngularFireAuth
    
  }

  ngOnInit(){

  }

  // Creamos el metodo login en async
  // abdcefg + @codedamn.com
  async login(){
//    console.log("Username: "+ this.username);
//    console.log("Password: "+ this.password);
    const { username, password } = this
    try{
      // There is a kind of a hack... xd
      const res = await this.afAuth.signInWithEmailAndPassword(username + '@codedamn.com', password);
    }catch(err){
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        console.log("User Not Found")
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';

// Importamos la autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router'

import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:string = "";
  nombre:string = "";
  apellido:string = "";
  telefono:string = "";
  placas:string = "";
  password:string = "";
  cpassword: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async register(){
    const { username, nombre, apellido, telefono, placas, password, cpassword } = this
    if(password !== cpassword){
      this.showAlert("Error!", "Passwords don't match")
      return console.error("Passwords don't match")
    }

    try{
      const res = await this.afAuth.createUserWithEmailAndPassword(username + '@codedamn.com', password)
      console.log(res)
      this.showAlert("Success!", "Welcome aboard!")
      this.router.navigate['/tabs']
    }catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }
}

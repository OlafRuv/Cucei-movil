import { Component, OnInit } from '@angular/core';

// Importamos la autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router'

import { AlertController } from '@ionic/angular'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';

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
    public alertController: AlertController,
    public router: Router,
    public afStore: AngularFirestore,
    public user: UserService
  ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string){
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
  }

  async register(){
    const { username, nombre, apellido, telefono, placas, password, cpassword } = this
    if(password !== cpassword){
      this.showAlert("Error!", "Passwords don't match")
      return console.error("Passwords don't match")
    }

    try{
      const res = await this.afAuth.createUserWithEmailAndPassword(username + '@codedamn.com', password)
      
      this.afStore.doc('users/' + res.user.uid).set({
        username,
        nombre,
        apellido,
        telefono,
        placas,
        password
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })

      this.presentAlert("Success", "You are registered!")
      this.router.navigate(['/tabs'])

    }catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  }

  async showAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }
}

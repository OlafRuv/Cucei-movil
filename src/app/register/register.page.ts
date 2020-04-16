import { Component, OnInit } from '@angular/core';

// Importamos la autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

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
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register(){
    const { username, nombre, apellido, telefono, placas, password, cpassword } = this
    if(password !== cpassword){
      return console.error("Passwords don't match")
    }

    try{
      const res = await this.afAuth.createUserWithEmailAndPassword(username + '@codedamn.com', password)
      console.log(res)
    }catch(error){
      console.dir(error)
    }
    
    
    /*if(this.username.length == 0){
        alert("Please add one username");
    }*/

    /*
    console.log("Username: "+ this.username);
    console.log("Nombre: "+ this.nombre);
    console.log("Apellido: "+ this.apellido);
    console.log("telefono: "+ this.telefono);
    console.log("placas: "+ this.placas);
    console.log("Password: "+ this.password);
    console.log("C_Password: "+ this.cpassword);
    */
  }

}

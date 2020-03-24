import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:string;
  password:string;
  nombre:string;
  apellido:string;
  telefono:string;
  placas:string;
  constructor() { }

  ngOnInit() {
  }

  verifyData(){
    /*if(this.username.length == 0){
        alert("Please add one username");
    }*/


    console.log("Username: "+ this.username);
    console.log("Password: "+ this.password);
    console.log("Nombre: "+ this.nombre);
    console.log("Apellido: "+ this.apellido);
    console.log("telefono: "+ this.telefono);
    console.log("placas: "+ this.placas);
  }

}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username:string;
  password:string;
  constructor(public navCtrl: NavController) {

  }

  login(){
    console.log("Username: "+ this.username);
    console.log("Password: "+ this.password);
  }

}

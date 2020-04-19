import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  // Para ver su funcionamiento (Actualizado)
  // https://www.youtube.com/watch?v=AyuIaJTqBLs
  

  // Revisar, video 3, minuto 17 aproximadamente
  // TODO: Revisar esto
  // @ViewChild('tabs', {static: true}) tabs: IonTabs
  
  /*
    ngOnInit() {
  //    this.tabs.select('map')
    }
  */

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public router: Router
  ) { }

  public app_name: string = 'Cucei Movil'
  public isLogged: boolean = false

  ngOnInit(){
    this.getCurrentUser()
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe( auth => {
      if(auth){
        console.log('user logged')
        this.isLogged = true
      } else {
        console.log('Not user logged')
      }
    })
    this.authService.isAuth().subscribe( user => {
      if(user){
        console.log("Usuario sesion en Tabs: ", user)
      }
    })
//    console.log("Logeado: ", this.isLogged)
  }

  onLogout(){
    this.afAuth.signOut()
    this.router.navigate(['../../home'])
  }
}

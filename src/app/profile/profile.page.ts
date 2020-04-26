import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';

import { AngularFireAuth } from '@angular/fire/auth';

//import { UserService } from '../user.service'

import { AuthService } from '../service/auth.service'
import { UserInterface } from '../models/user'

// Ya no existe Http de @angular/http
// import { HttpClient } from '@angular/common/http'

import { UsersDataApiService } from '../service/data-api-users'

// TODO: Revisar esto - Buscar una nueva forma de poner las imagenes

import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // Se inyecto en el constructor, public http: HttpClient
  
  nombre: string = ''
  apellido: string = ''


  constructor
  (
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private usersDataApi: UsersDataApiService,
    public router: Router
  ) { }

  public apiUsers = []

  user: UserInterface = {};
  
  public providerId: string = 'null'
  
  
  ngOnInit() {
    
    /*
    this.usersDataApi.getAllUsers().subscribe(users =>{
      console.log('Users', users)
      this.apiUsers = users
    })
    */
    this.authService.isAuth().subscribe(user => {
      if(user){
//        console.log("Usuario en perfil: ", user)
//        console.log("user.uid: ", user.uid)
        var idUser = user.uid
//        console.log("idUser: ", idUser)
        this.usersDataApi.getOneUser(idUser).subscribe(apiUser=>{
//          console.log('Api User', apiUser)
          this.user = apiUser
          console.log("Usuario: ", this.user)
          this.user.photoUrl = user.photoURL
//          console.log('URL', user.photoURL)
          /*
          this.user.username = apiUser.username
          this.user.nombre = apiUser.nombre
          this.user.apellido = apiUser.apellido
          this.user.telefono = apiUser.telefono
          this.user.placas = apiUser.placas
          */
        })
      }
    })
  }

  modificar(){
    console.log("Boton Editar Funcionando")
  }

  eliminar(idUser: string){
    console.log("Boton Eliminar Funcionando")
    console.log("Delete User: ", idUser)
    const confirmacion = confirm("Are you sure pana?")
    if(confirmacion){
//      console.log("Lo has borrado D:")
      this.afAuth.currentUser
      this.usersDataApi.deleteUser(idUser)
      this.authService.isAuth().subscribe(user => {
        user.delete()
      })
      this.router.navigate(['../../home'])
    }
//    this.usersDataApi.deleteUser(idUser)
  }
}

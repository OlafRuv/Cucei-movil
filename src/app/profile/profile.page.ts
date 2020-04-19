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
    private usersDataApi: UsersDataApiService
  ) { }

  public apiUsers = []
  public apiUser = ''

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
        const idBook = user.uid
        this.usersDataApi.getOneUser(idBook).subscribe(apiUser=>{
          this.user = apiUser
          this.user.photoUrl = user.photoURL
          console.log('URL', user.photoURL)
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

  eliminar(){
    console.log("Boton Eliminar Funcionando")
  }
}

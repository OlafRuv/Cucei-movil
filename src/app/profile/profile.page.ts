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

import * as firebase from 'firebase'

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
          //        user.reauthenticateWithCredential() 
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

  eliminar(){
    console.log("Boton Eliminar Funcionando")
    console.log("Delete User id: ", this.user.id)
    console.log("Delete User username: ", this.user.username)
    console.log("Delete User password: ", this.user.password)
    
    var login = {
      email: this.user.username + "@codedamn.com",
      password: this.user.password
    }

    console.log("Login: ", login)
    
    const confirmacion = confirm("Are you sure pana?")
    if(confirmacion){

      var userCreden = firebase.auth().currentUser
      
      var credentials = firebase.auth.EmailAuthProvider.credential(
        login.email,
        login.password
      )
      
      userCreden.reauthenticateWithCredential(credentials).then(function(){
        console.log("El usuario se ha autentificado")
        userCreden.delete().then(function(){
          console.log("El usuario se ha eliminado")
        }).catch(function(error){
          console.log("Error Delete:",error)
        })
      }).catch(function(error){
        console.log("Error:",error)
      })

      this.usersDataApi.deleteUser(this.user.id)

      this.router.navigate(['../../home'])
    }
  }
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from '../service/auth.service'
import { UsersDataApiService } from '../service/data-api-users'
import { UserInterface } from '../models/user'
import { Router } from '@angular/router'

//import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  constructor
  (
    private authService: AuthService,
    private usersDataApi: UsersDataApiService,
    public router: Router
  ) { }

  user: UserInterface = {};

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if(user){
        var idUser = user.uid
        this.usersDataApi.getOneUser(idUser).subscribe(apiUser=>{
          this.user = apiUser
          console.log("Usuario en Edit: ", this.user)
          this.user.photoUrl = user.photoURL
        })
      }
    })
  }

  onEditRedirect(){
    this.router.navigate(['/tabs/profile'])
  }

  saveChanges(){
    console.log("Actualizacion de usuario:",this.user)
    console.log("URL:", this.user.photoUrl)
    this.usersDataApi.updateUser(this.user)
    this.onEditRedirect()
  }
}

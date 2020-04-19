import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

// Importamos la autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router'

import { AlertController } from '@ionic/angular'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';

// Para subir las fotos
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../service/auth.service'
import { UsersDataApiService } from '../service/data-api-users'

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
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,

    private alertController: AlertController,
    private afStore: AngularFirestore,
    private user: UserService,
    private storage: AngularFireStorage,
    private usersDataApi: UsersDataApiService
  ) { }

  // ViewChild ejemplo actualizado
  // https://www.youtube.com/watch?v=AyuIaJTqBLs
  @ViewChild('imageUser', { static:true }) inputImageUser: ElementRef

  uploadPercent: Observable<number>
  
  urlImage: Observable<string>

  ngOnInit() {
    this.usersDataApi.getAllUsers().subscribe(users =>{
      console.log('Todos los usuarios (Register): ', users)
    })
  }

  async showAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }

  onUpload(event){
    // Subir la foto
    var id = Math.random().toString(36).substring(2);
    var file = event.target.files[0];
    var filePath = 'uploads/profile_' + id;
    var ref = this.storage.ref(filePath)
    var task = this.storage.upload(filePath, file)

    this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe()
  }

  onLoginRedirect(){
    this.router.navigate(['/tabs/map'])
  }

  onAddUser(){
    var {username, nombre, apellido, telefono, placas, password, cpassword} = this
    if(password !== cpassword){
      this.showAlert("Error!", "Passwords don't match")
      return console.error("Passwords don't match")
    }

    else{
      console.log("username (register): ", username)
      console.log("password (register): ", password)
      try{
        var url = this.inputImageUser.nativeElement.value
        console.log("url declarado: ", url)
        this.authService.registerUser(username + '@codedamn.com', password)
        .then((res)=>{
          this.authService.isAuth().subscribe(user => {
            if(user){
              console.log("Usuario en register: ", user)
              console.log("User.uid: ", user.uid)
  //            this.showAlert("Success", "You are registered!")
              this.afStore.doc('users/' + user.uid).set({
                username,
                nombre,
                apellido,
                telefono,
                placas,
                password
              })
              this.usersDataApi.getOneUser(user.uid).subscribe(apiUser =>{
                console.log("Api User cuando esta en la base de datos (register): ", apiUser)
              })
              user.updateProfile({
                displayName: '',
                photoURL: url
              }).then( function () {
                console.log('User Updated')
                console.log(user)
              }).catch( function (error) {
                console.log('error', error)
              })
            }
          })
          this.onLoginRedirect()
        }).catch( err => this.showAlert("Error!", err.message))
      }catch(error){
        console.dir(error)
        this.showAlert("Error", error.message)
      }
//      this.onLoginRedirect()
    }
  }
}

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
    public router: Router,
    public afAuth: AngularFireAuth,
    private authService: AuthService,

    public alertController: AlertController,
    public afStore: AngularFirestore,
    public user: UserService,
    private storage: AngularFireStorage
  ) { }

  // ViewChild ejemplo actualizado
  // https://www.youtube.com/watch?v=AyuIaJTqBLs
  @ViewChild('imageUser', { static:true }) inputImageUser: ElementRef

  uploadPercent: Observable<number>
  
  urlImage: Observable<string>

  ngOnInit() {
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
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = 'uploads/profile_' + id;
    const ref = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)

    this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe()
  }

  onLoginRedirect(){
    this.router.navigate(['/tabs/map'])
  }

  onAddUser(){
    const {username, nombre, apellido, telefono, placas, password, cpassword} = this
    if(password !== cpassword){
      this.showAlert("Error!", "Passwords don't match")
      return console.error("Passwords don't match")
    }

    try{
      const url = this.inputImageUser.nativeElement.value
      this.authService.registerUser(username + '@codedamn.com', password)
      .then((res)=>{
        this.authService.isAuth().subscribe(user => {
          if(user){
//            this.showAlert("Success", "You are registered!")
            this.afStore.doc('users/' + user.uid).set({
              username,
              nombre,
              apellido,
              telefono,
              placas,
              password
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
      }).catch( err => console.log('error', err.message))
    }catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  }
}

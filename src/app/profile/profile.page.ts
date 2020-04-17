import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';

// Ya no existe Http de @angular/http
// import { HttpClient } from '@angular/common/http'


// TODO: Revisar esto - Buscar una nueva forma de poner las imagenes

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // Se inyecto en el constructor, public http: HttpClient
  constructor(private storage: AngularFireStorage) { }

  uploadPercent: Observable<number>
  urlImage: Observable<string>

  ngOnInit() {
  }


  // ada5e3cb2da06dee6d82
  // https://upload.uploadcare.com/base/

  fileChanged(event){
    //console.log("Subir", event.target.files[0])
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = 'uploads/profile_' + id;
    const ref = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)

    this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe()


    /*
    const files = event.target.files
    //console.log(files)

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event =>{
      console.log(event)
    })
    */
  }
}

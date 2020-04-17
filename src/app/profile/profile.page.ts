import { Component, OnInit } from '@angular/core';

// Ya no existe Http de @angular/http
// TODO: Revisar esto 
import { HttpClient } from '@angular/common/http'

// Buscar una nueva forma de poner las imagenes

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }


  // ada5e3cb2da06dee6d82
  // https://upload.uploadcare.com/base/

  fileChanged(event){
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
  }

}

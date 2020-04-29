import { Component, OnInit, ViewChild, ElementRef, AfterContentInit} from '@angular/core';
import { CompileShallowModuleMetadata, AotCompiler } from '@angular/compiler';
import { GoogleMapComponent } from '../google-map/google-map.component';

import { AuthService } from '../service/auth.service'
import { UsersDataApiService } from '../service/data-api-users'
import { MarkersDataApiService } from '../service/data-api-markers'

import { UserInterface } from '../models/user'
import { MarkerInterface } from '../models/markers'

declare var google;


interface Marker{
  position: {
    lat: number,
    lng: number,
  }
  title: string
}

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit, AfterContentInit {
  map:any;
  @ViewChild('map',{ static: true })mapElement: ElementRef;

  lat:number;
  lng:number;

  constructor
  (
    private authService: AuthService,
    private usersDataApi: UsersDataApiService,
    private markersDataApi: MarkersDataApiService
  ) { }

  user: UserInterface = {};
  marker: MarkerInterface = {};
  public markers = []

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if(user){
        var idUser = user.uid
        this.usersDataApi.getOneUser(idUser).subscribe(apiUser=>{
          this.user = apiUser
//          console.log("Usuario en Map:", this.user)
//          console.log("Antes del Marker Username:",this.user.username)
        })
      }
    })
    this.markersDataApi.getAllMarkers().subscribe(apiMarkers => {
      this.markers = apiMarkers
    })
    //const idMarker = "Z8MucuvWOnZfQrqelOlQ"
    //this.markersDataApi.getOneMarker(idMarker).subscribe(apiMarker => {
    //  console.log("Un Marker por ID:", apiMarker)
    //})
    

  }

  ubicacion(){
    if(navigator.geolocation){
//      console.log("Tu navegador soporta geolocalizacion")
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        console.log("Latitud:",this.lat)
        console.log("Longitud:", this.lng)
      });
    }else{
      console.log("Tu navegador NO soporta geolocalizacion")
    }
  }

  addMarker(){
    if(navigator.geolocation){
//      console.log("Tu navegador soporta geolocalizacion")
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        this.saveMarker(this.lat, this.lng)
        console.log("Marker has saved")
      });
    }else{
      console.log("Tu navegador NO soporta geolocalizacion")
    }
  }

  saveMarker(lat, lng){
    console.log("User:", this.user)
    console.log("User ID:", this.user.id)
//    this.marker.id = this.user.id
    this.marker.username = this.user.username

    this.marker.lat = lat
    this.marker.lng = lng

    console.log("Marker:", this.marker)
    this.markersDataApi.addMarkerWithIDUser(this.marker, this.user.id)
//    this.markersDataApi.addMarker(this.marker)
  }

  deleteMarker(){
    console.log("User:", this.user)
    console.log("User ID:", this.user.id)
    this.markersDataApi.deleteMarker(this.user.id)
  }

  doRefresh(event){
    setTimeout(() => {
      console.log("Recargado :3")
      location.reload();
      event.target.complete()
    }, 1000)
  }

  funcionMapa(){
    console.log("Aqui es donde va funcion para latitud y longitud ponerlas en el mapa")
  }

  ngAfterContentInit():void{
    this.loadMap()
  }


  loadMap(){

    var myLatLng = {lat:20.592935, lng:-103.23173369999999}
    this.map = new google.maps.Map(this.mapElement.nativeElement,{
      zoom: 14,
      center: myLatLng,
    });

    console.log(this.markers)
    
    this.markersDataApi.getAllMarkers().subscribe(apiMarkers => {
      
      

      this.markers = apiMarkers
      
      console.log("Todos los markers (arreglo)",this.markers)
      this.markers.forEach(element => {
        this.markerGoogle(element)        
      });
    })
    /*
    google.maps.event.addListenerOne(this.map, 'idle', () => {
      this.mapElement.nativeElement.classList.add('show-map')
      const marker = {
        position: {
          lat: 20.6736,
          lng:-103.344
        },
        title: 'Punto Uno'
      }
      this.addMarker(marker)
    })
    */
  }
  markerGoogle(element: MarkerInterface){
    console.log("Marker en markerGoogle:", element)
    var marcador = new google.maps.Marker({
      position: new google.maps.LatLng(element.lat, element.lng),
      map: this.map
    })
    var infoWindow = new google.maps.InfoWindow({
      content:'<h1>Usuario: '+element.username+'</h1>'
    })
    marcador.addListener('click', function(){
      infoWindow.open(this.map, marcador)
    })
  }

  

  
  /*
 getPosition(){
  // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

 async ubicacion(){
    var position = await this.getPosition()
    console.log(position)
    console.log(typeof position)
    
  }
  */
  

  

  /*
  addMarker(marker: Marker){
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    })
  }
  */
  

  /*loadMap(){
    var map=new google.maps.Map(this.mapElement.nativeElement,{
      zoom: 14,
      center: {lat:20.6736, lng:-103.344},
    });
    return map;
  }

  IonViewDidLoad() {
    this.map=this.loadMap();
  }*/

}

import { Component, OnInit, ViewChild, ElementRef, AfterContentInit} from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { GoogleMapComponent } from '../google-map/google-map.component';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit, AfterContentInit {
  map:any;
  @ViewChild('map',{ static: true })mapElement: ElementRef;

  constructor() { 
    
  }

  ngOnInit() {
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
    this.map =new google.maps.Map(this.mapElement.nativeElement,{
      zoom: 14,
      center: {lat:20.6736, lng:-103.344},
    });
  }

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

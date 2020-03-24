import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  funcionMapa(){
    console.log("Aqui es donde va funcion para latitud y longitud ponerlas en el mapa")
  }

}

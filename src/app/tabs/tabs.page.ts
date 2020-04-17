import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  // Para ver su funcionamiento (Actualizado)
  // https://www.youtube.com/watch?v=AyuIaJTqBLs
  

  // Revisar, video 3, minuto 17 aproximadamente
  // TODO: Revisar esto
//  @ViewChild('tabs', {static: true}) tabs: IonTabs
  

  constructor() { }

  ngOnInit() {
//    this.tabs.select('map')
  }
}

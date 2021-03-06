import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Importamos los modulos necesarios para la base de datos
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireStorageModule } from '@angular/fire/storage'
import { UserService } from './user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/firestore'

// Ver esta parte de firebase, lo utilizo para eliminar
import * as firebase from 'firebase'

// Ya no existe Http de @angular/http
// import { HttpClientModule } from '@angular/common/http'

// TODO: Revisar esto de HTTP
// Inyectamos los modulos necesarios
// HttpClientModule - Probando

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

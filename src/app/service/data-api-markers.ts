import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { MarkerInterface } from '../models/markers'
import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs/operators'

import { AuthService } from '../service/auth.service'


@Injectable({
    providedIn: 'root'
})
export class MarkersDataApiService{
    constructor
    (private afs: AngularFirestore){
        this.markersCollection = afs.collection<MarkerInterface>('markers')
        this.markers = this.markersCollection.valueChanges()
    }
    private markersCollection: AngularFirestoreCollection<MarkerInterface>
    private markers: Observable<MarkerInterface[]>
    private markerDoc: AngularFirestoreDocument<MarkerInterface>
    private marker: Observable<MarkerInterface>
    
    
    getAllMarkers(){
        return this.markers = this.markersCollection.snapshotChanges()
        .pipe(map(changes=>{
            return changes.map(action=>{
                const data = action.payload.doc.data() as MarkerInterface;
                data.id = action.payload.doc.id;
                return data;
            });
        }));
    }

    getOneMarker(idmarker: string){
        this.markerDoc = this.afs.doc<MarkerInterface>('markers/' + idmarker)
        return this.marker = this.markerDoc.snapshotChanges()
        .pipe(map(action=>{
            if(action.payload.exists === false){
                return null
            }else{
                const data = action.payload.data() as MarkerInterface
                data.id = action.payload.id
                return data
            }
        }))
    }
    
    addMarker(marker: MarkerInterface){
        this.markersCollection.add(marker)
    }

    updateMarker(marker: MarkerInterface){
        let idmarker = marker.id
        this.markerDoc = this.afs.doc<MarkerInterface>('markers/' + idmarker)
        this.markerDoc.update(marker)
    }

    deleteMarker(idmarker: string){
        this.markerDoc = this.afs.doc<MarkerInterface>('markers/' + idmarker)
        this.markerDoc.delete()
    }
}

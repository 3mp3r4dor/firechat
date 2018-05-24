import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../interface/mensaje.interface';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';


@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Observable<Mensaje[]>;

  public usuario: any = {};

  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth ) {

    this.afAuth.authState.subscribe( user => {

      console.log( 'Estado del usuario ', user );
      if ( !user ) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });

  }
  login( proveedor: string ) {
    if ( proveedor === 'google' ) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit( 5 ) );
    this.chats = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Mensaje;
        const id = a.payload.doc.id;
        console.log( data );
        return { id, ...data };
      }))
    );
  }

  agregarMensaje( texto: string ) {
    // TODO falte el UID del usuario
    // tslint:disable-next-line:prefer-const
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add( mensaje );

  }

}

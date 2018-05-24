import { ChatService } from '../../providers/chat.service';
import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../interface/mensaje.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = '';
  elemento: any;
  constructor( public _chat: ChatService ) {

    this._chat.cargarMensajes();

  }

  ngOnInit() {
      this.elemento = document.getElementById('app-mensajes');
  }
  enviar_mensaje() {
  console.log( this.mensaje );
  if ( this.mensaje.length === 0 ) {
    return;
  }
  this._chat.agregarMensaje( this.mensaje ).then( () => this.mensaje = '' )
    .catch( ( err ) => console.error('error al guardar', err));
}

}

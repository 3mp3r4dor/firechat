import { ChatService } from '../../providers/chat.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor( public _chat: ChatService) { }

  ingresar( proveedor: string ) {
    console.log(proveedor);
    this._chat.login( proveedor );
  }

}

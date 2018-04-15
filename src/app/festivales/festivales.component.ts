import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Insertar } from '../models/Insertar';
import { AngularFireDatabase } from 'angularfire2/database';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-festivales',
  templateUrl: './festivales.component.html',
  styleUrls: ['./festivales.component.css']
})
export class FestivalesComponent implements OnInit {
  rutaObservable: Observable<any[]>;
  prueba: any;
  constructor( private router: Router,private cookieService: CookieService,private db: AngularFireDatabase) { }

  ngOnInit() {
  this.rutaObservable = this.getRutas('/rutas');
}
  
getRutas(listPath): Observable<any[]> {
  return this.db.list(listPath).valueChanges();
}

detalles(ident,nombre,desc,fot,preci) {
  this.prueba = {   
    id: ident.value,
    titulo: nombre.value,
    foto: fot.value,
    descripcion: desc.value,
    precio: preci.value
 };
  this.cookieService.set("actual", JSON.stringify(this.prueba)); 
  this.router.navigate(['/reserva', ident.value])
  }
}

import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/Servicios/vehiculo.service';

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  timeStart = {hour: 13, minute: 0 };
  timeEnd = {hour: 23, minute: 59 };

  public reserves = {
    fechaReserva:null,
    horaInicio:{hour: 13, minute: 0 },
    horaFinal:{hour: 23, minute: 59 },
  }
ngOnInit(){

}
 
}

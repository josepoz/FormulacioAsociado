import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-socio',
  templateUrl: './add-socio.component.html',
  styleUrls: ['./add-socio.component.css']
})
export class AddSocioComponent implements OnInit {
  prueba: string = 'Hola';
  constructor() { }

  ngOnInit() {
  }

  a(event)
  {
    this.prueba = event.target.value.toUpperCase();
    console.log(event.target.value);

  }
}

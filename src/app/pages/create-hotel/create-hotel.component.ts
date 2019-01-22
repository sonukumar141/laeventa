import { Component, OnInit } from '@angular/core';
import { Producth } from '../../app.models';


@Component({
  selector: 'laeventa-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
 
  newProducth: Producth;


  constructor() { }

  ngOnInit() {
    this.newProducth = new Producth();
    this.newProducth.shared = false;
    this.newProducth.ac = false;
  }

  createProducth(){
    console.log(this.newProducth);
  }
}

import { Component, OnInit } from '@angular/core';
import { Producth } from '../../app.models';
import { AppService } from '../../app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'laeventa-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
 
  newProducth: Producth;
  producthCategories = Producth.CATEGORIES;
  producthCities = Producth.CITIES;
  producthWifi = Producth.WIFI;
  producthAc = Producth.AC;
  producthRestaurant = Producth.RESTAURANT;
  producthParking = Producth.PARKING;
  producthAdvancePayment = Producth.ADVANCE_PAYMENT;
  producthFireworks = Producth.FIREWORKS;
  producthMusic = Producth.MUSIC;
  errors: any[] = [];

  constructor(private appService: AppService,
              private router: Router) { }

  ngOnInit() {
    this.newProducth = new Producth();
  }

  handleImage1Change(){
    this.newProducth.image_medium = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg";
  }

  handleImage2Change(){
    this.newProducth.image_big = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg";
  }

  handleImage3Change(){
    this.newProducth.image_small = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/4/image.jpeg";
  }

  handleImage4Change(){
    this.newProducth.image_extra = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg";
  }

  createProducth(){
    this.appService.createProducth(this.newProducth).subscribe(
      (producth: Producth) => {
        this.router.navigate([`/productsh/${producth._id}/${producth.name}`])
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    )
  }

}

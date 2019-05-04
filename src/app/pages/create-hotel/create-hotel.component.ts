import { Component, OnInit } from '@angular/core';
import { Producth } from '../../app.models';
import { AppService } from '../../app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AmazingTimePickerService } from 'amazing-time-picker';


@Component({
  selector: 'laeventa-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
 
  openTiming: any;
  newProducth: Producth;
  producthCategories = Producth.CATEGORIES;
  producthCities = Producth.CITIES;
  producthRegion = Producth.REGION;
  productFacilities = Producth.FACILITIES;
  producthLodgingPolicy = Producth.LODGING_POLICIES;
  producthFoodPolicy = Producth.FOOD_POLICIES;
  producthAlcoholPolicy = Producth.ALCOHOL_POLICIES;
  producthDecorPolicy = Producth.DECOR_POLICIES;
  producthParkingPolicy = Producth.PARKING_POLICIES;
  producthEquipmentPolicy = Producth.EQUIPMENT_POLICIES;
  producthCanteenPolicy = Producth.CANTEEN_POLICIES;
  producthWashroomPolicy = Producth.WASHROOM_POLICIES;
  producthScoreboardPolicy = Producth.SCOREBOARD_POLICIES;
  producthPowerPolicy = Producth.POWER_POLICIES;
  producthCommentatorPolicy = Producth.COMMENTATOR_POLICIES;
  producthTerms = Producth.TERMS_CONDITION;
  errors: any[] = [];

  constructor(private appService: AppService,
              private atp: AmazingTimePickerService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.newProducth = new Producth();
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  handleImage1Change(imageUrl: string){
    this.newProducth.image1 = imageUrl;
  }

  handleImage2Change(imageUrl: string){
    this.newProducth.image2 = imageUrl;
  }

  handleImage3Change(imageUrl: string){
    this.newProducth.image3 = imageUrl;
  }

  handleImage4Change(imageUrl: string){
    this.newProducth.image4 = imageUrl;
  }

  handleImage5Change(imageUrl: string){
    this.newProducth.image5 = imageUrl;
  }

  handleImage1Error(){
    this.newProducth.image1 = '';
  }

  handleImage2Error(){
    this.newProducth.image2 = '';
  }
  handleImage3Error(){
    this.newProducth.image3 = '';
  }

  handleImage4Error(){
    this.newProducth.image4 = '';
  }

  handleImage5Error(){
    this.newProducth.image5 = '';
  }

  selectOpenTime(){
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time =>{
      
      this.openTiming = time;
      console.log(this.openTiming);
      console.log(time);
    });
  }

  createProducth(){
    this.appService.createProducth(this.newProducth).subscribe(
      (producth: Producth) => {
        this.snackBar.open('Created your listing successfully. Add new Areas', '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });
        this.router.navigate([`/venues/${producth._id}/${producth.name}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
        this.snackBar.open('Please fill the required fields', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    )
  }

}

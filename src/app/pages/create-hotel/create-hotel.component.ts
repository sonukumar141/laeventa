import { Component, OnInit } from '@angular/core';
import { Producth } from '../../app.models';
import { AppService } from '../../app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'laeventa-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
 
  newProducth: Producth;
  producthCategories = Producth.CATEGORIES;
  producthCities = Producth.CITIES;
  producthRegion = Producth.REGION;
  productFacilities = Producth.FACILITIES;
  errors: any[] = [];

  constructor(private appService: AppService,
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

  createProducth(){
    this.appService.createProducth(this.newProducth).subscribe(
      (producth: Producth) => {
        this.snackBar.open('Created your listing successfully!. Add new areas to your listing', '×', { panelClass: 'success', verticalPosition: 'top', duration: 6000 });
        this.router.navigate([`/venues/${producth._id}/${producth.name}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    )
  }

}

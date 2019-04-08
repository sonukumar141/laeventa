import { Component, OnInit } from '@angular/core';
import { Productv } from '../../app.models';
import { AppService } from '../../app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'laeventa-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.scss']
})
export class CreateVendorComponent implements OnInit {

  newProductv: Productv;
  productvCategories = Productv.CATEGORIES;
  productvCities = Productv.CITIES;
  errors: any[] = [];

  constructor(private appService: AppService,
              private router: Router) { }

  ngOnInit() {
    this.newProductv = new Productv();
  }

  handleImage1Change(){
    this.newProductv.image_medium = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg";
  }

  handleImage2Change(){
    this.newProductv.image_big = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg";
  }

  handleImage3Change(){
    this.newProductv.image_small = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/4/image.jpeg";
  }

  handleImage4Change(){
    this.newProductv.image_extra = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg";
  }

  createProductv(){
    this.appService.createProductv(this.newProductv).subscribe(
      (productv: Productv) => {
        this.router.navigate([`/productsv/${productv._id}/${productv.name}`])
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    )
  }

}

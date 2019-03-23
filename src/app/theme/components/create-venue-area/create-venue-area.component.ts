import { Component, OnInit, Input } from '@angular/core';
import { VenueArea } from '../../../app.models';
import { AppService } from '../../../app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Producth } from '../../../app.models';


@Component({
  selector: 'laeventa-create-venue-area',
  templateUrl: './create-venue-area.component.html',
  styleUrls: ['./create-venue-area.component.scss']
})
export class CreateVenueAreaComponent implements OnInit {
 
  newVenueArea: VenueArea;
  @Input() producth: Producth;
  //producthCategories = Producth.CATEGORIES;
  venueAreaCategories = VenueArea.CATEGORIES;

  constructor(private appService: AppService,
              private router: Router) { }

  ngOnInit() {
    this.newVenueArea = new VenueArea();
  }

  handleImage1Change(imageUrl: string){
    this.newVenueArea.image1 = imageUrl;
  }

  handleImage2Change(imageUrl: string){
    this.newVenueArea.image2 = imageUrl;
  }

  handleImage3Change(imageUrl: string){
    this.newVenueArea.image3 = imageUrl;
  }

  handleImage4Change(imageUrl: string){
    this.newVenueArea.image4 = imageUrl;
  }

  handleImage5Change(imageUrl: string){
    this.newVenueArea.image5 = imageUrl;
  }

  handleImage6Change(imageUrl: string){
    this.newVenueArea.image6 = imageUrl;
  }

  handleImage1Error(){
    this.newVenueArea.image1 = '';
  }

  handleImage2Error(){
    this.newVenueArea.image1 = '';
  }

  handleImage3Error(){
    this.newVenueArea.image1 = '';
  }

  handleImage4Error(){
    this.newVenueArea.image1 = '';
  }

  handleImage5Error(){
    this.newVenueArea.image1 = '';
  }

  handleImage6Error(){
    this.newVenueArea.image1 = '';
  }


  createVenueArea(){
    this.newVenueArea.producth = this.producth;
    this.appService.createVenueArea(this.newVenueArea).subscribe(
      (venuearea: VenueArea) => {
        
      },
      (errorResponse: HttpErrorResponse) => {
       
      }
    )
  }

}

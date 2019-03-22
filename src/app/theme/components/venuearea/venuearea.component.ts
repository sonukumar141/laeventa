import { Component, OnInit } from '@angular/core';
import { VenueArea } from "../../../app.models";
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-venue-area',
  templateUrl: './venuearea.component.html',
  styleUrls: ['./venuearea.component.scss']
})
export class VenueAreaComponent implements OnInit {
  public venueareas: Array<VenueArea> = [];

  constructor(private appService: AppService) { }

  ngOnInit() { 
      this.getAllVenueAreas();
  }

  public getAllVenueAreas(){
    this.appService.getAllVenueAreas().subscribe(data=>{
      this.venueareas = data; 
      //for show more product  
      for (var index = 0; index < 3; index++) {
        //this.venueareas = this.venueareas.concat(this.venueareas);        
      }
    });
  }

}
import { Component, OnInit} from '@angular/core';
import { AppService } from '../../../app.service';
import { Producth} from '../../../app.models';
import { Router } from '@angular/router';



@Component({
  selector: 'laeventa-manage-venue',
  templateUrl: './manage-venue.component.html',
  styleUrls: ['./manage-venue.component.scss']
})
export class ManageVenueComponent implements OnInit {

  public productsh: Array<Producth> = [];
  producthDeleteIndex: number;

  constructor(private appService: AppService,
              private router: Router){}
    ngOnInit() {
        this.appService.getOwnerVenues().subscribe(
          data => {
            this.productsh = data;
          });
      }

      createListing(){
        this.router.navigate(['/create-venue/new']);
      }

      deleteProducth(producthId: string)  {

        this.appService.deleteOwnerVenue(producthId).subscribe(
        () => {
          this.productsh.splice(this.producthDeleteIndex, 1);
          this.producthDeleteIndex = undefined;
        },
        () => {
    
        })
      }
}
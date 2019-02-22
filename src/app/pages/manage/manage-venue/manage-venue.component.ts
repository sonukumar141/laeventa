import { Component, OnInit} from '@angular/core';
import { AppService } from '../../../app.service';
import { Producth} from '../../../app.models';


@Component({
  selector: 'laeventa-manage-venue',
  templateUrl: './manage-venue.component.html',
  styleUrls: ['./manage-venue.component.scss']
})
export class ManageVenueComponent implements OnInit {

  public productsh: Array<Producth> = [];
  producthDeleteIndex: number;

  constructor(private appService: AppService){}
    ngOnInit() {
        this.appService.getOwnerVenues().subscribe(
          data => {
            this.productsh = data;
          }

        )
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
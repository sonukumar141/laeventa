import { Component, OnInit } from '@angular/core';
import { Producth } from '../../app.models';
import { AppService } from '../../app.service';


@Component({
  selector: 'laeventa-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
 
  newProducth: Producth;
  producthCategories = Producth.CATEGORIES;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.newProducth = new Producth();
    this.newProducth.shared = false;
    this.newProducth.ac = false;
  }

  handleImageChange(){
    this.newProducth.images = [{"small": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg"}]
  }
  createProducth(){
    this.appService.createProducth(this.newProducth).subscribe(
      () => {
        debugger;
      },
      () => {

      }
    )
  }

}

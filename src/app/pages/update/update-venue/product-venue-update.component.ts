import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Producth } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductVenueUpdateZoomComponent } from './product-venue-update-zoom/product-venue-update-zoom.component';

@Component({
  selector: 'app-venue-update-hotel',
  templateUrl: './product-venue-update.component.html',
  styleUrls: ['./product-venue-update.component.scss']
})
export class ProductVenueUpdateComponent implements OnInit {
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public producth: Producth;
  public image: any;
  public images: any;
  public items: Array<any>= [];
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Producth>;

  constructor(public appService:AppService, 
              private activatedRoute: ActivatedRoute, 
              public dialog: MatDialog, 
              public formBuilder: FormBuilder) { 
                this.items = [
                  {url: 'producth.image_small'},
                  {url: 'producth.image_medium'},
                  {url: 'producth.image_big'},
                  {url: 'producth.image_extra'}
                ];
               }

  ngOnInit() {      
    this.sub = this.activatedRoute.params.subscribe(params => { 
      this.getProducthById(params['_id']); 
    }); 
    this.form = this.formBuilder.group({ 
      'review': [null, Validators.required],            
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    }); 
    this.getRelatedProducts();  
    
    
  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,      
      keyboard: true,
      navigation: true,
      pagination: false,       
      loop: false, 
      preloadImages: false,
      
      lazy: true, 
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  public getProducthById(_id){
    this.appService.getProducthById(_id).subscribe(data=>{
      this.producth = data;
      this.image = data.image1;
      this.zoomImage = data.image2;
      setTimeout(() => { 
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });
    });
  }

  public getRelatedProducts(){
    this.appService.getProductsh().subscribe(data => {
      this.relatedProducts = data;
    })
  }

  public selectImage(image){
    this.image = image;
    this.zoomImage = image;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget; 
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductVenueUpdateZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }

  public updateVenue(producthId: string, producthData: any){
      this.appService.updateOwnerVenue(producthId, producthData).subscribe(
        (updatedProducth: Producth) =>{
          debugger;
          this.producth = updatedProducth;
        },
        () =>{

        }
      )
  }
}
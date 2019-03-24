import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Producth, VenueArea } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductHotelZoomComponent } from './product-hotel-zoom/product-hotel-zoom.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-hotel',
  templateUrl: './product-hotel.component.html',
  styleUrls: ['./product-hotel.component.scss']
})
export class ProductHotelComponent implements OnInit {
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

  newVenueArea: VenueArea;
  //producthCategories = Producth.CATEGORIES;
  venueAreaCategories = VenueArea.CATEGORIES;
  public venueareas: Array<VenueArea> = [];
  venueareaDeleteIndex: number;

  constructor(public appService:AppService, 
              private auth: AuthService,
              private activatedRoute: ActivatedRoute, 
              public dialog: MatDialog, 
              public snackBar: MatSnackBar,
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
      this.newVenueArea = new VenueArea();
    }); 
    this.form = this.formBuilder.group({ 
      'review': [null, Validators.required],            
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    }); 
    this.getRelatedProducts();  

    this.appService.getOwnerVenueAreas().subscribe(
      data => {
        this.venueareas = data;
      });
    
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
  //this.newVenueArea.producthInput = this.producth;
  createVenueArea(){
    this.newVenueArea.producth = this.producth;
    console.log(this.newVenueArea.producth);
    this.appService.createVenueArea(this.newVenueArea).subscribe(
      (venuearea: VenueArea) => {
        this.snackBar.open('New Area Created successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 4000 });
      },
      (errorResponse: HttpErrorResponse) => {
       
      }
    )
  }

  deleteVenueArea(venueareaId: string)  {

    this.appService.deleteVenueArea(venueareaId).subscribe(
    () => {
      this.venueareas.splice(this.venueareaDeleteIndex, 1);
      this.venueareaDeleteIndex = undefined;
      this.snackBar.open('Area deleted successfully!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    },
    () => {

    })
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
      this.image = data.image_medium;
      this.zoomImage = data.image_big;
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
    this.dialog.open(ProductHotelZoomComponent, {
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

  public onCreateVenueArea(){
    // TBD
  }

  
}
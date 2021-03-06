import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Product, Category } from '../../../app.models';
import { Producth } from '../../../app.models';
import { Productv } from '../../../app.models';
import { ProductDialogComponent } from '../../../shared/products-carousel/product-dialog/product-dialog.component';

import { HttpErrorResponse } from '@angular/common/http';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'laeventa-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count:any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort:any;
  //public products: Array<Product> = [];
  public productsh: Array<Producth> = [];
  public categories:Category[];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#000000"];
  public sizes = ["S","M","L","XL","2XL","32","36","38","46","52","13.3\"","15.4\"","17\"","21\"","23.4\""];
  public page:any;

  city: string;
  //productsh: Producth[] = [];
  //productsv: Productv[] = [];

  errors: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
             public appService: AppService, 
             public dialog: MatDialog, 
             private router: Router) { }

  ngOnInit() {
  	 this.activatedRoute.params.subscribe((params) => {
  	 	this.city = params['city'];
        this.getProductsh();
        //this.getProductsv();
        //this.getAllProducts();
    });
    
  }

  getSearchJobs() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {
      //console.log(params['name']);
    });
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };

    //this.getCategories();
    this.getBrands();
    this.getAllProducts();  
  }

  public getAllProducts(){
    this.appService.getProductsh().subscribe(data=>{
      this.productsh = data; 
      //for show more product  
      for (var index = 0; index < 3; index++) {
        this.productsh = this.productsh.concat(this.productsh);        
      }
    });
  }

  public getCategories(){  
    if(this.appService.Data.categories.length == 0) { 
      this.appService.getCategories().subscribe(data => {
        this.categories = data;
        this.appService.Data.categories = data;
      });
    }
    else{
      this.categories = this.appService.Data.categories;
    }
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count){
    this.count = count;
    this.getAllProducts(); 
  }

  public changeSorting(sort){
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product){   
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product._id, product.name]); 
      }
    });
  }

  public onPageChanged(event){
      this.page = event;
      this.getAllProducts(); 
      window.scrollTo(0,0); 
  }

  public onChangeCategory(event){
    if(event.target){
      this.router.navigate(['/productsh', event.target.innerText.toLowerCase()]); 
    }   
  }

  getProductsh(){
    this.appService.getProductshByCity(this.city).subscribe(
        (productsh: any) => {
            this.productsh = productsh;
        },
        (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors;
        });
    }

}

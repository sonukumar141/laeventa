import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-producth-zoom',
  templateUrl: './producth-zoom.component.html',
  styleUrls: ['./producth-zoom.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProducthZoomComponent implements OnInit {
  
  @ViewChild('zoomImage') zoomImage;

  constructor(public dialogRef: MatDialogRef<ProducthZoomComponent>,
              @Inject(MAT_DIALOG_DATA) public image:any) { }

  ngOnInit() { }

  public close(): void {
    this.dialogRef.close();
  }

  public count:number = 10;
  public maxWidth:number = 60;
  public zoomIn(){
    if(this.count < 60){
      this.maxWidth = this.maxWidth + this.count;
      this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';      
      this.count = this.count + 10;
    }
  }  
 
  public zoomOut(){
    if(this.count > 10){
      this.count = this.count - 10;
      this.maxWidth = this.maxWidth - this.count;
      this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';      
    }
  }

}
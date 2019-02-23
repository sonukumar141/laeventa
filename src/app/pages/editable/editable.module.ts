import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EditableInputComponent } from './editable-input/editable-input.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    EditableInputComponent
  ],
  declarations: [
    EditableInputComponent
  ]
})
export class EditableModule { }
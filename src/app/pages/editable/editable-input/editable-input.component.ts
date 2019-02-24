import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'laeventa-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent implements OnInit {

    @Input() entity: any;

    @Input() field: string;

    @Input() className: string;

    @Output() entityUpdated = new EventEmitter();

    isActiveInput: boolean = false;

    constructor(private cdr: ChangeDetectorRef) {}
    ngOnInit(){

    }

    updateEntity(){
        this.entityUpdated.emit({[this.field]: this.entity[this.field]});
        this.isActiveInput = false;
    }
}
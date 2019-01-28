import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { AuthService } from '../../../pages/shared/auth.service';
import { Router } from '@angular/router';

import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(public appService:AppService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];    
  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }  

  methodOpenMenu() {
    this.trigger.openMenu();
  }

  methodCloseMenu() {
    this.trigger.closeMenu();
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      private router: Router,
      private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {  }

  async ionViewWillEnter() {
    await this.spinner.hide('generalLoading');
  }

  goQuests() {
    this.router.navigate(['quests']);
  }
}

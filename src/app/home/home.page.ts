import { Component, OnInit } from '@angular/core';
import { IMobile } from '../share/interfaces';
import { MobiledbService } from '../core/mobiledb.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
import { MobilecrudService } from '../core/mobilecrud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  mobiles: any;
  mobileId: string;
  mobileName: string;
  mobileCompany: string;
  mobilePrice: number;
  mobileInches: number;
  mobileColors: string[];
  mobileImage: string;

  constructor(private mobilecrudSevice: MobilecrudService, private route:
    Router) { }
  ngOnInit() {
    this.mobilecrudSevice.read_Mobile().subscribe(data => {
      this.mobiles = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          company: e.payload.doc.data()['company'],
          price: e.payload.doc.data()['price'],
          inches: e.payload.doc.data()['inches'],
          colors: e.payload.doc.data()['colors'],
          image: e.payload.doc.data()['image']
        };
      })
      console.log(this.mobiles);
    });
  }
  mobileTapped(mobile) {
    this.route.navigate(['/details', mobile.id]);
  }
}

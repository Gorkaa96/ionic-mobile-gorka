import { Component, OnInit } from '@angular/core';
import { IMobile } from '../share/interfaces';
import { MobiledbService } from '../core/mobiledb.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public mobiles: IMobile[];
  mobilesinit: IMobile[] = [
    {
      id: '1',
      name: 'Mi 10 Lite',
      company: 'Xiaomi',
      price: 324.03,
      inches: 6.57,
      colors: ['White', 'Black'],
      image: 'https://thumb.pccomponentes.com/w-530-530/articles/30/300205/1390-xiaomi-mi-10-lite-5g-6-64gb-blanco-libre.jpg'
    },
    {
      id: '2',
      name: 'K51S',
      company: 'LG',
      price: 148.99,
      inches: 6.55,
      colors: ['Blue', 'Black'],
      image: 'https://thumb.pccomponentes.com/w-530-530/articles/29/298691/lg-k51s-3-64gb-dual-sim-titan-libre.jpg'
    },
    {
      id: '3',
      name: 'Galaxi S21',
      company: 'Samsung',
      price: 1309,
      inches: 6.8,
      colors: ['White', 'Black'],
      image: 'https://thumb.pccomponentes.com/w-530-530/articles/34/348326/1623-samsung-galaxy-s21-ultra-5g-256gb-plata-libre.jpg'
    },
    {
      id: '4',
      name: 'iPhone 12',
      company: 'Apple',
      price: 959,
      inches: 6.1,
      colors: ['Red', 'Black'],
      image: 'https://thumb.pccomponentes.com/w-530-530/articles/32/328931/1319-apple-iphone-12-128gb-product-rojo-libre.jpg'
    },
    {
      id: '5',
      name: 'Poco X3',
      company: 'Xiaomi',
      price: 229,
      inches: 6.67,
      colors: ['Grey', 'Black'],
      image: 'https://thumb.pccomponentes.com/w-530-530/articles/32/321341/1317-xiaomi-poco-x3-nfc-6-128gb-gris-sombra-libre.jpg'
    },
    {
      id: '6',
      name: '7 Pro',
      company: 'Realme',
      price: 299,
      inches: 6.4,
      colors: ['Blue', 'Black'],
      image: 'https://thumb.pccomponentes.com/w-530-530/articles/32/323047/1210-realme-7-pro-8-128gb-azul-libre.jpg'
    }
  ]

  constructor(private mobiledbService: MobiledbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.mobiles !== undefined) {
      this.mobiles.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.mobiledbService.empty()) {
      this.mobilesinit.forEach(mobile => {
        this.mobiledbService.setItem(mobile.id, mobile);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.mobiledbService.getAll().then(
      (data) => this.mobiles = data
    );
  }
  mobileTapped(mobile) {
    this.route.navigate(['/details', mobile.id]);
  }
}

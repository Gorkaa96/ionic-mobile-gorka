import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { MobiledbService } from '../core/mobiledb.service';
import { Router } from '@angular/router';
import { IonMenu, ToastController } from '@ionic/angular';
import { IMobile } from '../share/interfaces';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  
  strId: string;
  mobile: IMobile;
  mobiles: IMobile[] = [];
  mobileForm: FormGroup;
  constructor(
    private router: Router,
    private mobiledbService: MobiledbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.mobiledbService.getLength().then(
      (data: Number) => {
        this.strId = data.toString();
      })
    this.mobileForm = new FormGroup({
      name: new FormControl(''),
      company: new FormControl(''),
      price: new FormControl(''),
      inches: new FormControl(''),
      colors: new FormControl(''),
      image: new FormControl(''),
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar película',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveMobile();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  saveMobile() {
    this.mobile = this.mobileForm.value;
    let nextKey = this.strId;
    let keyNum = Number.parseInt(nextKey);
    let IdNum = keyNum+1
    this.mobile.id = IdNum.toString();
    this.mobiledbService.setItem(this.mobile.id, this.mobile );
    console.warn(this.mobileForm.value);
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { MobiledbService } from '../core/mobiledb.service';
import { Router } from '@angular/router';
import { IonMenu, ToastController } from '@ionic/angular';
import { IMobile } from '../share/interfaces';
import { MobilecrudService } from '../core/mobilecrud.service';


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
    private mobilecrudService: MobilecrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
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
      header: 'Guardar movil',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.mobile=this.mobileForm.value;
            this.mobilecrudService.create_Mobile(this.mobile);
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
<<<<<<< HEAD
=======

  saveMobile() {
    this.mobile = this.mobileForm.value;
    let nextKey = Number.parseInt(this.strId)+1;
    this.mobile.id = nextKey.toString();
    this.mobiledbService.setItem(this.mobile.id, this.mobile );
    console.warn(this.mobileForm.value);
    }
>>>>>>> ba13a9248a77a0b6a5ec887134faae1b8de058fb
}

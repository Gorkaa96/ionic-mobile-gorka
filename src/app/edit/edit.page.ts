import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MobiledbService } from '../core/mobiledb.service';
import { IMobile } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  mobile: IMobile;
  mobileForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private mobiledbService: MobiledbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.mobiledbService.getItem(this.id).then(
      (data: IMobile) => {
        
        this.mobile = data;
        
        this.mobileForm.get('name').setValue(this.mobile.name),
        this.mobileForm.get('company').setValue(this.mobile.company),
        this.mobileForm.get('price').setValue(this.mobile.price),
        this.mobileForm.get('inches').setValue(this.mobile.inches),
        this.mobileForm.get('colors').setValue(this.mobile.colors),
        this.mobileForm.get('image').setValue(this.mobile.image)
      
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

  async onSubmit(){
    const toast = await this.toastController.create({
      header: 'Actualizar movil',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.updateMobile();
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
  
  updateMobile() {
    this.mobile = this.mobileForm.value;
    let id = this.id;
    this.mobiledbService.remove(this.id);
    this.mobile.id = id;
    this.mobiledbService.setItem(this.mobile.id, this.mobile);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MobilecrudService } from '../core/mobilecrud.service';
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

    this.id = this.activatedrouter.snapshot.params.id;
    this.mobilecrudService.read_Mobile().subscribe(data => {
      let mobiles = data.map(e => {       
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
      // tengo todos los móviles
      mobiles.forEach(element => {
        if(element.id == this.id){
          this.mobile=element;
          this.mobileForm.get('name').setValue(this.mobile.name),
          this.mobileForm.get('company').setValue(this.mobile.company),
          this.mobileForm.get('price').setValue(this.mobile.price),
          this.mobileForm.get('inches').setValue(this.mobile.inches),
          this.mobileForm.get('colors').setValue(this.mobile.colors),
          this.mobileForm.get('image').setValue(this.mobile.image) 
        }
      });

      console.log(this.mobile);
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
            this.mobile=this.mobileForm.value;
            this.mobilecrudService.update_Mobile(this.id,this.mobile);
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

}

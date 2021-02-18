import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobiledbService } from '../core/mobiledb.service';
import { IMobile } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import { MobilecrudService } from '../core/mobilecrud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  public mobile: IMobile;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private mobilecrudService: MobilecrudService,
    public toastController: ToastController
  ) { }
  
  ngOnInit() {
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
            
            this.mobile = element;
        }
      });

      console.log(this.mobile);
    });
  }

  editRecord(mobile) {
    this.router.navigate(['edit', mobile.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar movil',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.mobilecrudService.delete_Mobile(id);
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

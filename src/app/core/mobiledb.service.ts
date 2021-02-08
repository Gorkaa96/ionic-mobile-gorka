import { Injectable } from '@angular/core';
import { IMobile } from '../share/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MobiledbService {
  auxMobile: IMobile;
  auxMobileList: IMobile[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: IMobile) {
    this.storage.set(reference, {
      id: value.id, name: value.name, company:
        value.company, price: value.price, inches: value.inches, colors:
        value.colors, image: value.image
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<IMobile> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<IMobile[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: IMobile) => this.auxMobileList.push(data)
        );
      });
      return this.auxMobileList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  getLength(): Promise<Number>{
    return this.storage.length();
  }
  
} 
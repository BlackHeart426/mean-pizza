import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Item} from '../interface';


@Injectable({providedIn: 'root'})
export class CounterService {

  listProductInCart: Item[] = []
  currentProduct: Item
  counterProducts$: Subject<Item[]> = new Subject<Item[]>()

  constructor() { }

  isHas(id: string) {
    return !!this.listProductInCart.find(item => item.id === id)
  }

  getAllCounts(): Item[] {
    return this.listProductInCart
  }

  getCountById(id: string): number {
    // return this.listProductInCart.find(item => item.id === id).count
    return null
  }

  // getAllCounts(): Observable<Item[]> {
  //   return this.counterProducts$
  // }

  addItemOrIncrease(item: Item) {

    if (!this.isHas(item.id)) {
      this.listProductInCart.push({id: item.id, count: 0})
      return
    }
    this.listProductInCart.map(product => {
      product.id === item.id ? ++product.count : product.count
    })
  }

  removeItemOrDecrease(item: Item) {
    if (this.isHas(item.id)) {
      this.currentProduct = this.listProductInCart.find(product => item.id === product.id )
      this.currentProduct.count === 1
        ? this.listProductInCart = this.listProductInCart.filter(product => product.id != item.id)
        : this.listProductInCart.map(product => {
          product.id === item.id ? --product.count : product.count
        })
    }
  }



}

import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../interface';

@Pipe({name: 'searchProduct'})
export class SearchPipe implements PipeTransform{
  transform(products: Product[], searchStr = ''): Product[] {
    if (!searchStr.trim()) {
      return products
    }

    return products.filter(product => {
      return (
        product.title.toLowerCase().includes(searchStr.toLowerCase()) ||
        product.description.toLowerCase().includes(searchStr.toLowerCase())
      )
    })
  }

}

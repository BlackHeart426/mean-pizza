import {Decorator} from '@angular/compiler-cli/src/ngtsc/reflection';
import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import {CartService} from '../service/cart.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Directive({
  selector: '[appSwitchTemplate]'
})
export class SwitchTemplateDirective {

  counterItemsCartCurrent$: Observable<number> = new Subject<number>()
  counter: number
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.counterItemsCartCurrent$ = this.cartService.getCountCart()
  }
  @Output() switchTemplate: EventEmitter<any> = new EventEmitter<any>()

  @HostListener('mouseenter', ['$event.target']) onEnter(event: Event) {
    if (this.cartService.getItems().length > 0) {
      this.switchTemplate.emit(true)
    }
  }

  @HostListener('mouseleave', ['$event.target']) onLeave(event: Event) {
    this.switchTemplate.emit(false)
  }
}

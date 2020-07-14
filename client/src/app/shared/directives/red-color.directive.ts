import {Decorator} from '@angular/compiler-cli/src/ngtsc/reflection';
import {
  Directive, ElementRef,
  EventEmitter,
  HostListener,
  Output, Renderer2,
} from '@angular/core';
import {CartService} from '../service/cart.service';

@Directive({
  selector: '[appRedColor]'
})
export class RedColorDirective {
  constructor(
    private el: ElementRef,
    private r: Renderer2
  ) {
  }

  @HostListener('mouseenter', ['$event.target']) onEnter(event: Event) {
    console.log('123');
    this.r.setStyle(this.el.nativeElement, 'color', 'red')
    this.r.setStyle(this.el.nativeElement, 'cursor', 'pointer')

  }

  @HostListener('mouseleave', ['$event.target']) onLeave(event: Event) {
    this.r.setStyle(this.el.nativeElement, 'color', 'lightGrey')
  }
}

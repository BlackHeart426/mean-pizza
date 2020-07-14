import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CounterService} from '../../service/counter.service';
import {Observable} from 'rxjs';
import {CartItem, Item} from '../../interface';
import {CartService} from '../../service/cart.service';

export type SizeCounter = 'normal' | 'small'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() counter: number
  @Output() onChanged: EventEmitter<boolean> = new EventEmitter<boolean>()


  constructor(
  ) { }

  ngOnInit(): void {
  }

  changeCounter(increased: boolean): void {
    this.onChanged.emit(increased)
  }
}

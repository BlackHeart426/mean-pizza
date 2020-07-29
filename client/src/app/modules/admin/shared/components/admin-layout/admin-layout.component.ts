import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from '../../../../../shared/service/material.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef

  links = [
    {url: '/admin/dashboard', name: 'Обзор'},
    {url: '/admin/analytics', name: 'Аналитика'},
    {url: '/admin/history', name: 'История'},
    {url: '/admin/order', name: 'Добавить заказ'},
    {url: '/admin/categories', name: 'Ассортимент'}
  ]
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }


  logout(event: MouseEvent): void {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }
}

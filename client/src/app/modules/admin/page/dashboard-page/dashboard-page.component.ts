import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from '../../../../shared/service/material.service';
import {OverviewPage} from '../../shared/interfaces';
import {AnalyticsService} from '../../shared/service/analytics.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTargetNew') tapTargetNew: ElementRef
  tapTarget: MaterialInstance
  data$: Observable<OverviewPage>

  yesterday = new Date()

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.data$ = this.service.getOverview()

    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngAfterViewInit() {
    // console.log(this.tapTargetNew);
    // this.tapTarget = MaterialService.initTapTarget(this.tapTargetNew)
  }

  ngOnDestroy() {
    // this.tapTarget.destroy()
  }

  openInfo() {
    this.tapTarget.open()
  }
}

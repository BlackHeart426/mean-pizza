import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../modules/admin/shared/service/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MaterialService} from '../../shared/service/material.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.authService.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/menu'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}

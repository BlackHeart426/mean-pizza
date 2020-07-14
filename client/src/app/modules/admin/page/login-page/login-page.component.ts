import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/auth.service';
import {User} from '../../../../shared/interface';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AlertService} from '../../shared/service/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted: boolean
  message = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      if (params) {
        this.message = 'Please, log in'
      }
    })

    this.form = new FormGroup({
      email: new FormControl('root_admin@gmail.com', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('1q2w3e4r', [
        Validators.minLength(6),
        Validators.required
      ])
    })
  }

  submit() {
    console.log('312');
    const user: User = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }

    this.authService.loginAdmin(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.alertService.success('Авторизация успешна')
      this.submitted = false
    }, () => {
      this.submitted = true
      this.alertService.danger('Не удалось авторизоваться')
    })
  }
}

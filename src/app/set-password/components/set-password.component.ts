import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FadeInOrOut } from '../../shared/animations/animations';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.less'],
  animations: [FadeInOrOut]
})
export class SetPasswordComponent implements OnInit {
  public showForm = true;
  public errorMessage;
  public isLoading = false;
  public user = {};
  public errors = {};
  public queryParamsSub;
  public token;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnDestroy() {
    this.queryParamsSub.unsubscribe();
  }

  public setPassword = (form) => {
    if (!form.valid) return;
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.setPassword(this.token, form.value.password)
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      })
      .catch((err: any) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      });
  }
}

import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    if (this.authService.userData === null || this.authService.userData === undefined) {
      this.router.navigate(['/login']);
    }
  }

  navigateToLogin() {
    window.location.assign('/login');
  }
}

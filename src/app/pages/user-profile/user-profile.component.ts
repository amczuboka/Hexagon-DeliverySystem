import { Component } from '@angular/core';
import { Item } from 'src/app/modules/delivery.models';import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  authority!: string; //from authortity service
  myUser!: any; //from authortity service
  userDTO! : any; //object from db that has attribute, first, last, company, email

  constructor(
    public authService: AuthService,
    private Acrouter: ActivatedRoute,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    this.userService.getUser(this.myUser.uid).then((user) => {
        this.userDTO = user;
    });
  }

  ngAfterViewChecked() {
    this.myUser = this.authService.getUser();
    const type = this['Acrouter'].snapshot.params['type'];
    if (type != undefined) {
      this.authority = type;
    }
    if (this.myUser) {
      this.authority = this.myUser.photoURL;
    }
  }

}

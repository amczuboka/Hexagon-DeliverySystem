import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageInfo } from 'src/app/modules/chatbox.models';
import { AuthService } from 'src/app/services/auth.service';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  CustumorServicePage!: PageInfo;
  private subscription!: Subscription;
  constructor(
    public authService: AuthService,
    private chatrommService: ChatroomService
  ) {}

  ngOnInit() {
    this.subscription = this.chatrommService.pageNumber$.subscribe(
      (pageNumber) => {
        this.CustumorServicePage = pageNumber;
      }
    );
    this.CustumorServicePage = { pageNumber: 1, roomName: '' };
    this.chatrommService.setPageNumber(this.CustumorServicePage);
  }

  receiveData(data: any) {
    const pageInfo = data as PageInfo;
    if (pageInfo.pageNumber == 1) {
      this.CustumorServicePage.pageNumber = 1;
      this.chatrommService.setPageNumber(this.CustumorServicePage);
    }
    if (pageInfo.pageNumber == 2) {
      this.CustumorServicePage.pageNumber = 2;
      this.chatrommService.setPageNumber(this.CustumorServicePage);
    }
    if (pageInfo.pageNumber == 3) {
      this.CustumorServicePage.pageNumber = 3;
      this.CustumorServicePage.roomName = pageInfo.roomName;
      this.chatrommService.setPageNumber(this.CustumorServicePage);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

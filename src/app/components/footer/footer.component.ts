import { Component} from '@angular/core';
import { PageInfo } from 'src/app/modules/chatbox.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  CustumorServicePage: PageInfo = { pageNumber: 1, roomName: '' };
  constructor(public authService: AuthService) {}

  receiveData(data: any) {
    const pageInfo = data as PageInfo;
    if (pageInfo.pageNumber == 1) {
      this.CustumorServicePage.pageNumber = 1;
    }
    if (pageInfo.pageNumber == 2) {
      this.CustumorServicePage.pageNumber = 2;
    }
    if (pageInfo.pageNumber == 3) {
      this.CustumorServicePage.pageNumber = 3;
      this.CustumorServicePage.roomName = pageInfo.roomName;
    }
  }
}

import { Component, Renderer2, ElementRef} from '@angular/core';
import { PageInfo } from 'src/app/modules/chatbox.models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  CustumorServicePage: PageInfo = { pageNumber: 1, roomName: '' };

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  receiveData(data: any) {
    console.log(data);
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
      //  const basicContainer =
      //    this.el.nativeElement.querySelector('.basic-container');
      //  this.renderer.setStyle(basicContainer, 'max-width', '100%');
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageInfo } from 'src/app/modules/chatbox.models';
import { AuthService } from 'src/app/services/auth.service';
import { ChatroomService } from 'src/app/services/chatroom.service';

/**
 * FooterComponent represents the footer section of the application.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  /** PageInfo object representing the current page information for Customer Service. */
  CustumorServicePage!: PageInfo;

  /** Subscription to observe changes in page numbers from the ChatroomService. */
  private subscription!: Subscription;

  /**
   * Constructor of the FooterComponent.
   * @param authService - The AuthService for user authentication.
   * @param chatrommService - The ChatroomService for managing chatroom-related functionality.
   */
  constructor(
    public authService: AuthService,
    private chatrommService: ChatroomService
  ) {}

  /**
   * Lifecycle hook called after the component is initialized.
   */
  ngOnInit() {
    // Subscribe to changes in page numbers from the ChatroomService
    this.subscription = this.chatrommService.pageNumber$.subscribe(
      (pageNumber) => {
        this.CustumorServicePage = pageNumber;
      }
    );

    // Initialize Customer Service page information
    this.CustumorServicePage = { pageNumber: 1, roomName: '' };

    // Set the initial page number using the ChatroomService
    this.chatrommService.setPageNumber(this.CustumorServicePage);
  }

  /**
   * Receive data from a parent component.
   * @param data - Data received, typically PageInfo object.
   */
  receiveData(data: any) {
    const pageInfo = data as PageInfo;

    // Update the Customer Service page number based on received data
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

  /**
   * Lifecycle hook called before the component is destroyed.
   * Unsubscribe from the Subscription to avoid memory leaks.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

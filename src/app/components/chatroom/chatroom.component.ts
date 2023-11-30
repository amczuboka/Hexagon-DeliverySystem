import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  push,
  set,
  Database,
  get,
} from 'firebase/database';
import { User, UserDTO } from 'src/app/modules/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { PageInfo } from 'src/app/modules/chatbox.models';
import { snapshotToArray } from '../roomlist/roomlist.component';

/**
 * Custom ErrorStateMatcher implementation for form validation.
 * @class
 * @implements {ErrorStateMatcher}
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  /**
   * Checks whether the control is in an error state.
   * @param {FormControl | null} control - The form control being checked.
   * @param {FormGroupDirective | NgForm | null} form - The form to which the control belongs.
   * @returns {boolean} - A boolean indicating whether the control is in an error state.
   */
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

/**
 * Component representing a chatroom.
 * @component
 */
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit, AfterViewInit {
  /** Input property to receive data from the parent component. */
  @Input() dataFromParent: any;
  /** Output property to emit data to the parent component. */
  @Output() dataFromChild = new EventEmitter<any>();

  /** Reference to the left drawer element. */
  @ViewChild('leftDrawer') leftDrawer!: ElementRef;
  /** Reference to the chat content element. */
  @ViewChild('chatcontent') chatcontent!: ElementRef;

  /** Scroll top position for chat content. */
  scrolltop!: number;
  /** Information about the room creator. */
  creater!: UserDTO;
  /** Company name associated with the chatroom. */
  CompanyName!: string;
  /** Information about the person currently on the page. */
  PersonOnPage!: UserDTO;
  /** Form group for the chat form. */
  chatForm!: FormGroup;
  /** Name of the chat room. */
  roomname = '';
  /** Message to be sent in the chat. */
  message = '';

  /** Array containing chat messages. */
  chats: any[] = [];
  /** Custom error state matcher instance. */
  matcher = new MyErrorStateMatcher();

  /**
   * Constructor of the ChatroomComponent.
   * @constructor
   * @param {FormBuilder} formBuilder - The FormBuilder for creating form controls.
   * @param {DatePipe} datepipe - The DatePipe service for formatting dates.
   * @param {AuthService} authService - The AuthService for user authentication.
   * @param {ChatroomService} chatroomService - The ChatroomService for managing chatroom-related functionality.
   */
  constructor(
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private authService: AuthService,
    private chatroomService: ChatroomService
  ) {}

  /**
   * Lifecycle hook called after the component's view has been initialized.
   * @memberof ChatroomComponent
   * @method
   */
  ngAfterViewInit() {
    const user: User = this.authService.getUser();

    console.log('this.dataFromParent', this.dataFromParent);

    this.roomname = this.dataFromParent.roomName;

    const db = getDatabase();
    const RoomRef = ref(db, 'rooms/');
    const roomRef = query(
      RoomRef,
      orderByChild('roomname'),
      equalTo(this.roomname)
    );
    get(roomRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          onValue(
            ref(db, `rooms/${childSnapshot.key}/chats/`),
            async (resp) => {
              this.chats = [];
              this.chats = snapshotToArray(resp).filter(
                (chat) => chat.roomname == this.roomname
              );
              setTimeout(
                () =>
                  (this.scrolltop =
                    this.chatcontent.nativeElement.scrollHeight),
                500
              );
              this.PersonOnPage = await this.chatroomService.getPersonOnPage(
                db,
                user
              );
            }
          );
        });
      }
    });
    this.getCreater(db);
  }

  /**
   * Retrieves information about the room creator from the database.
   * @param {Database} db - The Firebase Database instance.
   * @memberof ChatroomComponent
   * @method
   */
  async getCreater(db: Database) {
    const dbRef = query(
      ref(db, 'rooms/'),
      orderByChild('roomname'),
      equalTo(this.roomname)
    );
    get(dbRef).then(async (snapshot) => {
      if (snapshot.exists()) {
        const room: { [key: string]: { creater: string } } = snapshot.val();
        const createrValue = Object.values(room)[0].creater;
        const userRef = query(ref(db, 'individual/' + createrValue));
        await get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            this.creater = snapshot.val();
            if (snapshot.val().Authority == 'Company') {
              this.CompanyName = snapshot.val().CompanyName;
            }
          }
        });
        const companyRef = query(ref(db, 'company/' + createrValue));
        await get(companyRef).then((snapshot) => {
          if (snapshot.exists()) {
            this.creater = snapshot.val();
            this.CompanyName = snapshot.val().CompanyName;
          }
        });
      }
    });
  }

  /**

Lifecycle hook called after the component has been initialized.
Initializes the chat form.
@memberof ChatroomComponent
@method
*/
  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      message: [null, Validators.required],
    });
  }
  /**

Handles form submission for sending a message in the chat.
Adds the message to the chatroom and resets the form.
@param {any} form - The form data containing the message.
@memberof ChatroomComponent
@method
*/
  onFormSubmit(form: any) {
    this.chatroomService.addChat(
      this.roomname,
      this.PersonOnPage,
      this.datepipe,
      'message',
      form
    );
    this.chatForm = this.formBuilder.group({
      message: [null, Validators.required],
    });
  }
  /**

Handles the user's request to exit the chat.
Adds an exit message to the chatroom and emits an event to inform the parent component.
@memberof ChatroomComponent
@method
*/
  exitChat() {
    this.chatroomService.addChat(
      this.roomname,
      this.PersonOnPage,
      this.datepipe,
      'exit'
    );
    const pageInfo: PageInfo = {
      pageNumber: 1,
      roomName: '',
    };
    this.dataFromChild.emit(pageInfo);
  }
}

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

export class MyErrorStateMatcher implements ErrorStateMatcher {
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

export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit, AfterViewInit {
  @Input() dataFromParent: any;
  @Output() dataFromChild = new EventEmitter<any>();

  @ViewChild('leftDrawer') leftDrawer!: ElementRef;
  @ViewChild('chatcontent') chatcontent!: ElementRef;
  scrolltop!: number;
  creater!: UserDTO;
  PersonOnPage!: UserDTO;
  chatForm!: FormGroup;
  roomname = '';
  message = '';

  chats: any[] = [];
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private authService: AuthService,
    private chatroomService: ChatroomService
  ) {}

  ngAfterViewInit() {
    const user: User = this.authService.getUser();

    console.log('this.dataFromParent', this.dataFromParent);
    
    this.roomname = this.dataFromParent.roomName

    const db = getDatabase();
    onValue(ref(db, 'chats/'), async (resp) => {
      this.chats = [];
      this.chats = snapshotToArray(resp).filter(
        (chat) => chat.roomname == this.roomname
      );
      setTimeout(
        () => (this.scrolltop = this.chatcontent.nativeElement.scrollHeight),
        500
      );
      this.PersonOnPage = await this.chatroomService.getPersonOnPage(db, user);
    });
    this.getCreater(db);

    this.scrollToBottom();
  }

  scrollToBottom() {
    this.chatcontent.nativeElement.scrollTop =
      this.chatcontent.nativeElement.scrollHeight;
  }

  async getCreater(db: Database) {
    const dbRef = query(
      ref(db, 'rooms/'),
      orderByChild('roomname'),
      equalTo(this.roomname)
    );
    get(dbRef).then(async (snapshot) => {
      if (snapshot.exists()) {
        const room: { [key: string]: { creater: string } } = snapshot.val(); // cast to expected type
        const createrValue = Object.values(room)[0].creater;
        const userRef = query(ref(db, 'individual/' + createrValue));
        await get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            this.creater = snapshot.val();
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      message: [null, Validators.required],
    });
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.name = this.PersonOnPage.FirstName;
    chat.date = new Date().toISOString();
    chat.date = chat.date.replace(' ', 'T');
    chat.date = this.datepipe.transform(chat.date, 'yyyy-MM-ddTHH:mm');
    chat.type = 'message';
    const db = getDatabase();
    const newMessageRef = push(ref(db, 'chats/'));
    set(newMessageRef, chat);
    this.chatForm = this.formBuilder.group({
      message: [null, Validators.required],
    });
  }

  exitChat() {
    const chat = {
      roomname: '',
      name: '',
      message: '',
      date: '',
      type: '',
    };
    chat.roomname = this.roomname;
    chat.name = this.PersonOnPage.FirstName;
    chat.date = new Date().toISOString();
    chat.date = chat.date.replace(' ', 'T');
    chat.date = this.datepipe.transform(chat.date, 'yyyy-MM-ddTHH:mm')!;
    chat.message = ` ${this.PersonOnPage.FirstName} leave the room`;
    chat.type = 'exit';
    const db = getDatabase();
    const newMessageRef = push(ref(db, 'chats/'));
    set(newMessageRef, chat);

    const pageInfo: PageInfo = {
      pageNumber: 1,
      roomName: '',
    };
    this.dataFromChild.emit(pageInfo);
  }
}

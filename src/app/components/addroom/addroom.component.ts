import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  push,
  set,
} from 'firebase/database';

import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
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
@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.scss'],
})
export class AddroomComponent implements OnInit {
  @Output() dataFromChild = new EventEmitter<any>();

  roomForm!: FormGroup;
  email = '';
  roomname = '';
  db = getDatabase();
  dbRef = ref(this.db, 'rooms/');
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    this.roomForm = this.formBuilder.group({
      roomname: [null, Validators.required],
      creater: [user?.uid || ''],
    });
  }

  onFormSubmit(form: any) {
    const room = form;
    const roomRef = query(
      this.dbRef,
      orderByChild('roomname'),
      equalTo(room.roomname)
    );
    get(roomRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.snackBar.open('Room name already exist!');
      } else {
        const newRoomRef = push(this.dbRef);
        set(newRoomRef, room);
        const pageInfo: PageInfo = {
          pageNumber: 1,
          roomName: '',
        };
        this.dataFromChild.emit(pageInfo);
      }
    });
  }

  exitPage() {
    const pageInfo: PageInfo = {
      pageNumber: 1,
      roomName: '',
    };
    this.dataFromChild.emit(pageInfo);
  }
}

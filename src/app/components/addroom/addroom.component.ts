import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  roomForm!: FormGroup;
  email = '';
  roomname = '';
  db = getDatabase();
  dbRef = ref(this.db, 'rooms/');
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    
    const user = this.authService.getUser();
    this.roomForm = this.formBuilder.group({
      roomname: [null, Validators.required],
      creater: [user.uid]
    });
  }
  //TODO only a client should be able to create a room
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
      this.router.navigate(['/roomlist']);
    }
  });
  }
}

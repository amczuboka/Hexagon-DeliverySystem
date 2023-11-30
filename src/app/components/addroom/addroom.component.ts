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

/**
 * Custom ErrorStateMatcher implementation for form validation.
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  /**
   * Checks whether the control is in an error state.
   * @param control - The form control being checked.
   * @param form - The form to which the control belongs.
   * @returns A boolean indicating whether the control is in an error state.
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
 * Component for adding a new chat room.
 */
@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.scss'],
})
export class AddroomComponent implements OnInit {
  /** Event emitter to send data to the parent component. */
  @Output() dataFromChild = new EventEmitter<any>();

  /** Form group for the room creation form. */
  roomForm!: FormGroup;

  /** Email of the current user. */
  email = '';

  /** Name of the chat room. */
  roomname = '';

  /** Reference to the Firebase database. */
  db = getDatabase();

  /** Reference to the 'rooms' node in the Firebase database. */
  dbRef = ref(this.db, 'rooms/');

  /** Custom error state matcher instance. */
  matcher = new MyErrorStateMatcher();

  /**
   * Constructor of the AddroomComponent.
   * @param formBuilder - The FormBuilder for creating form controls.
   * @param snackBar - The MatSnackBar for displaying notifications.
   * @param authService - The AuthService for user authentication.
   */
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  /** Lifecycle hook called after the component is initialized. */
  ngOnInit(): void {
    const user = this.authService.getUser();

    // Initialize the room creation form
    this.roomForm = this.formBuilder.group({
      roomname: [null, Validators.required],
      creater: [user?.uid || ''],
    });
  }

  /**
   * Handles form submission for creating a new chat room.
   * @param form - The form data containing the room information.
   */
  onFormSubmit(form: any) {
    const room = form;

    // Check if the room name already exists
    const roomRef = query(
      this.dbRef,
      orderByChild('roomname'),
      equalTo(room.roomname)
    );
    get(roomRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.snackBar.open('Room name already exists!');
      } else {
        // Create a new room in the database
        const newRoomRef = push(this.dbRef);
        set(newRoomRef, room);

        // Emit event to inform the parent component about the page change
        const pageInfo: PageInfo = {
          pageNumber: 1,
          roomName: '',
        };
        this.dataFromChild.emit(pageInfo);
      }
    });
  }

  /**
   * Handles the user's request to exit the current page.
   */
  exitPage() {
    const pageInfo: PageInfo = {
      pageNumber: 1,
      roomName: '',
    };

    // Emit event to inform the parent component about the page change
    this.dataFromChild.emit(pageInfo);
  }
}

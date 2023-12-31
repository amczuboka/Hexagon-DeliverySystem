import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Database, set, ref } from '@angular/fire/database';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  [x: string]: any;
  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;
  Uploading = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private database: Database,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      ConfirmEmail: ['', [Validators.required, Validators.email]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      Authority: ['', [Validators.required]],
      CompanyName: [''],
    });

    // Subscribe to Authority field changes
    this.registerForm.get('Authority')!.valueChanges.subscribe((value) => {
      // Trigger validation for CompanyName
      this.registerForm.get('CompanyName')!.updateValueAndValidity();

      // If the selected authority is not 'Company', clear the validation error for CompanyName
      if (value !== 'Company') {
        this.registerForm.get('CompanyName')!.setErrors(null);
      }
    });
  }

  passwordConfirmationValidator(form: FormGroup) {
    const password = form.get('Password')!.value;
    const confirm = form.get('ConfirmPassword')!.value;

    if (password !== confirm) {
      form.controls['ConfirmPassword'].setErrors({ incorrect: true });
    } else {
      form.controls['ConfirmPassword'].setErrors(null);
    }
    return password === confirm ? null : 'The passwords are not the same';
  }

  emailConfirmationValidator(form: FormGroup) {
    const email = form.get('Email')!.value;
    const confirm = form.get('ConfirmEmail')!.value;

    if (email !== confirm) {
      form.controls['ConfirmEmail'].setErrors({ incorrect: true });
    } else {
      form.controls['ConfirmEmail'].setErrors(null);
    }
    return email === confirm ? null : 'The emails are not the same';
  }

  async onSubmit() {
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
      this.storageService.sendNotification(
        'make sure to answer all required fields'
      );

      return;
    }
    this.Uploading = true;
    let authority = this.registerForm.value.Authority;
    let path = '';
    if (authority == 'Individual') {
      path = 'individual/';
    } else if (authority == 'Company') {
      path = 'company/';
    } else if (authority == 'Staff') {
      path = 'staff/';
    }
    let rid: string = '';

    rid = await this.authService.SignUp(
      this.registerForm.value.Email,
      this.registerForm.value.Password,
      authority
    );
    if (rid == '') {
      this.Uploading = false;
      return;
    }
    await this.registerUser(this.registerForm.value, rid, path);
    this.Uploading = false;
  }

  async registerUser(value: any, id: string, path: string) {
    if (path == 'individual/') {
      set(ref(this.database, path + id), {
        ID: id,
        FirstName: value.FirstName,
        LastName: value.LastName,
        Email: value.Email,
        Authority: value.Authority,
        DeliveryIDs: '',
      });
    } else if (path == 'company/') {
      set(ref(this.database, path + id), {
        ID: id,
        CompanyName: value.CompanyName,
        FirstName: value.FirstName,
        LastName: value.LastName,
        Email: value.Email,
        Authority: value.Authority,
        DeliveryIDs: '',
      });
    } else if (path == 'staff/') {
      set(ref(this.database, path + id), {
        ID: id,
        FirstName: value.FirstName,
        LastName: value.LastName,
        Email: value.Email,
        Authority: value.Authority,
      });
    }

    this.storageService.sendNotification(
      'User created! Make sure to confirm your email'
    );
  }
}

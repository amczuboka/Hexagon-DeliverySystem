import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  child,
  Database,
  onValue,
  ref as ref_data,
} from '@angular/fire/database';
import {
  Storage,
  ref as ref_storage,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /**
   * Displays a notification using the MatSnackBar.
   * @param text - The text to display in the notification.
   */
  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['kawaiicolors-snackbar'],
    });
  }

  /**
   * Uploads a file to Firebase Storage and returns the download URL and a temporary name.
   * @param file - The file to upload.
   * @param path - The path in Firebase Storage where the file should be stored.
   * @param storage - The Firebase Storage instance to use.
   * @returns A Promise that resolves to a string containing the download URL and temporary name.
   */
  async uploadToFirestore(file: any, path: string, storage: Storage): Promise<string> {
    let url = '';
    let tempName = '';
    let storageRef = ref_storage(storage, path + file.name);

    try {
      url = await getDownloadURL(storageRef);
    } catch (err) {
      url = '';
    }
    console.log(url);

    while (url != '' || url == undefined) {
      try {
        tempName = Math.random().toString(36).substring(2);
        storageRef = ref_storage(storage, path + tempName + file.name);
        url = await getDownloadURL(storageRef);
      } catch (err) {
        break;
      }
    }
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    });
    const snapshot = await uploadTask;
    let downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL + ',' + tempName;
  }

  /**
   * Generates a unique ID for storing data in the Firebase Realtime Database.
   * @param path - The path in the database where the ID will be used.
   * @param database - The Firebase Database instance to use.
   * @returns A unique ID as a string.
   */
  async IDgenerator(path: string, database: Database) {
    let id = '';
    let isGood = false;
    let data: never[] | null | undefined = [];
    const dbRef = ref_data(database);
    while (!isGood) {
      try {
        id = Math.random().toString(36).substring(2);
        let databaseRef = child(dbRef, path + id);
        onValue(databaseRef, (snapshot) => {
          data = snapshot.val();
        });
        if (data == null || data == undefined || data.length == 0) {
          isGood = true;
        }
      } catch (err) {
        break;
      }
    }

    return id;
  }
}


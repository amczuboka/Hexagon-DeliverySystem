export interface User {
    uid: string;
    email: string;
    photoURL: string;
  }
export interface Staff extends User {}
export interface Client extends User {}
export interface Individual extends Client {}
export interface Company extends Client {}



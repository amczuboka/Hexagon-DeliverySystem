export interface User {
  uid: string;
  email: string;
  photoURL: string;

}
export interface UserDTO extends User {
  FirstName: string;
  LastName:string ;
  ID: User["uid"];
  Authority:User["photoURL"];
}

export interface Staff extends UserDTO {}
export interface Client extends UserDTO {
  DeliveryIDs:any;
}
export interface Individual extends Client {}
export interface Company extends Client {
  CompanyName: string;
}



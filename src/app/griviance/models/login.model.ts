export class Token {
    api_key: string;
}
export class UserDetails {
    userName: string;
    role: string;
    api_key: Token;
    emailId: string;
    id: any;
    firstName: string;
    middleName: string | null;
    lastName: string;
    gender: string;
    address1: string;
    address2: string | null;
    state: string;
    pinCode: string;
    city: string;
    mobileNumber: string;
    userRegistered: Date;
    isDetails: boolean;
}
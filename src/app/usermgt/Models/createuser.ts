
export class createUser {
    designation:    Designation;
    userId:String
    emailId:        string;
    entityMaster:   EntityMaster;
    firstName:      string;
    gender:         boolean;
    lastName:       string;
    middleName:     string;
    phoneNumber:    string;
    password:       string;
    section:        Section;
    userTypeMaster: UserTypeMaster;
    userAddress:    UserAddress;
    active:boolean
    constructor(){
        this.designation =new Designation();
        this.entityMaster =new EntityMaster();
        this.section =new Section();
        this.userTypeMaster=new UserTypeMaster();
        this.userAddress =new UserAddress();
    }
}

export class Designation {
    designationId: any;
}

export class EntityMaster {
    entityMasterId: any;
}

export class Section {
    sectionId: any;
}

export class UserAddress {
    addressId:String;
    city:     string;
    country:  string;
    landmark: string;
    line1:    string;
    line2:    string;
    state:    string;
    zipCode:  string;
}

export class UserTypeMaster {
    userTypeId: number;
}

    
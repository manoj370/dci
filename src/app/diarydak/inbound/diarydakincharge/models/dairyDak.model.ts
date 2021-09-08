import { Input } from '@angular/core';

export class CreatedairyDakInput {

    receiptDairyDate: string;
    receiptType: ReceiptType;
    categoryCode: CategoryCode;
    receiptLanguageId: ReceiptLanguageId;

    dairyReceivedDate: string;
    dakAddressCategories: DakAddressCategories;
    designation: Designation;

    receiptVia: ReceiptVia


    senderName: string;
    entityMaster: EntityMaster;
    senderAddress: SenderAddress;

    receiptToAddress: string;
    receiptSubject: string;
    enclosureDetails: string;
    recipientUserId: number;
    toEmail: string;
    contactNumber: string;
    usermaster: UserMaster;
}

export class ReceiptType {

    receiptTypeId: number;

}
export class CategoryCode {

    receiptCategoryId: string;

}
export class ReceiptLanguageId {
    receiptLanguageId: string;
}
export class ReceiptVia {
    receiptViaId: any;
}


export class DakAddressCategories {
    addressCategoryId: number;

}
export class Designation {

    designationId: number;
}
export class EntityMaster {
    entityMasterId: number;
}

export class SenderAddress {
    addressId: number;
}
export class UserMaster {
    userId: number;
}

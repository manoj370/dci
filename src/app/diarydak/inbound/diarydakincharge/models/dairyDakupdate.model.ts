import { CategoryCode, DakAddressCategories, Designation, EntityMaster, ReceiptLanguageId, ReceiptType, ReceiptVia, UserMaster } from './dairyDak.model';

export class UpdatedairyDakInput {


    receiptId: number;
    receiptType: ReceiptType;
    categoryCode: CategoryCode;
    receiptLanguageId: ReceiptLanguageId;
    receiptDairyDate: string;
    senderName: string;
    toEmail: string;
    contactNumber: string;
    senderAddress: UpdateSenderAddress;
    dairyReceivedDate: string;
    receiptSubject: string;
    enclosureDetails: string;
    receiptToAddress: string;
    receiptVia: ReceiptVia
    recipientUserId: number;
    dakAddressCategories: DakAddressCategories;
    designation: Designation;
    entityMaster: EntityMaster;
    userMaster:UserMaster;

}
export class UpdateSenderAddress {
    addressId: number;
}


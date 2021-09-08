import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class encryptionService {
    conversionEncryptOutputforKey: any;
    encrpyttobase64: any;
    conversionDecryptOutputForValue: any;
    valueOfSession: string;
    base64ForKey: string;
    DecryptedKey: any;
    Key: any;
    Value: any;
    encryptedKeyOutput: any;
    DecryptedValue: any;
    keyData: any;

    //method is used to encrypt Text 
    public encryptingProcess(key, value) {
        //Assigning key and value to variable
        this.Key = key;
        this.Value = value;

        //Encrypting the  key 
        this.encryptedKeyOutput = CryptoJS.AES.encrypt(this.Key, this.Value).toString();

        //Encrypting the above encryptedKeyOutput  using base64
        this.encrpyttobase64 = btoa(this.encryptedKeyOutput);

        //Encrypting the  Value 
        this.conversionDecryptOutputForValue = CryptoJS.AES.encrypt(this.Value, this.encrpyttobase64).toString();

        //Storing the output after encrypting key and value in local Storage
        localStorage.setItem(this.encryptedKeyOutput, this.conversionDecryptOutputForValue);

    }

    public decryptingProcess(params: any) {
        const keys = Object.keys(localStorage),
            i = keys.length;
        var rtnValue = "";
        keys.forEach(element => {
            var id = element;
            var arr = id.split("-");
           
            if ( arr[1] !== "usec") {
              
  // tslint:disable-next-line: no-debugger
                //Encrypting the key using base 64
                this.base64ForKey = btoa(element);

                // Getting the value with the help of key
                this.valueOfSession = localStorage.getItem(element);

                //Decrypting the value 
                this.DecryptedValue = CryptoJS.AES.decrypt(this.valueOfSession, this.base64ForKey).toString(CryptoJS.enc.Utf8);

                //  Decrypting the  Key
                this.DecryptedKey = CryptoJS.AES.decrypt(element, this.DecryptedValue).toString(CryptoJS.enc.Utf8);
                if (params === this.DecryptedKey) {
                    rtnValue = this.DecryptedValue;
                }
              
            }

        });

        return rtnValue;
    }

    /**
     * getDecryptedValue
     */
    public getDecryptedValue() {
        switch (this.keyData) {
            case this.DecryptedKey: {
                //statements; 
                return this.DecryptedValue;
                break;
            }
            default: {
                //statements; 
                return this.DecryptedValue;
                break;
            }
        }
        // if (this.DecryptedKey === this.keyData) {

        //     // return this.DecryptedValue;
        //     return this.DecryptedValue;

        // }
        // else {
        //     return ' Invalid key, Please check the key ';
        // }

    }
}
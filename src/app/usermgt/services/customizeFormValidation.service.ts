import { Injectable } from '@angular/core';

@Injectable(    {
    providedIn: 'root'
})
// tslint:disable-next-line: class-name
export class customizeformValidation {
    /**
     * allowingToPressOnlyNumbers
     * 
     */
    public allowingToPressOnlyNumbers(event: any) {
        const pattern = /[0-9\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    public allowingToPressOnlyAlphabates(event: any) {
        const pattern = /[a-z\A-Z]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    public allowingToPressOnlyNumbersWithDot(event: any) {
        const pattern = /[0-9\.\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}

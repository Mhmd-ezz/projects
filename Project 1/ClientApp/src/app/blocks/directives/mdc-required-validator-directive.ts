import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[mdcRequiredValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: mdcRequiredValidatorDirective,
        multi: true
    }]
})

/*
*   @REMARK required attribute is must in order to validate
*   required="{{isRequired}}" or simply add required
*
*   @ mdcRequiredValidator can validate either string or one property in an object
*   @ to validate property in any [object object] provide property name  
*   @ within html tag like this:  (mdcRequiredValidator="id")
*   @ then, mdcRequiredValidator will check if the object contains a valid "id" property
*
*/
export class mdcRequiredValidatorDirective implements Validator {

    @Input() mdcRequiredValidator: string;
    @Input('required') required: any;

    validate(control: AbstractControl): { [key: string]: any } | null {


        if (this.required === 'false'  || this.required === false || typeof this.required == 'undefined')
            return null

        if (!control.value) {
            return { 'mdcRequired': true };
        }
        else {
            // @ Validate value if object 
            if (typeof control.value === 'object')

                // @ The Required property is not found or null or undefined
                if (!control.value[this.mdcRequiredValidator]) {
                    return { 'mdcRequired': true };
                }
                // @ Property is valid
                else if (control.value[this.mdcRequiredValidator]) {
                    return null;
                }
                // @ String is Found 
                else
                    return null
        }

        return { 'mdcRequired': true }
    }
}
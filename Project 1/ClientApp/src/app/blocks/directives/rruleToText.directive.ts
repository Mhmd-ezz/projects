import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { RRule, RRuleSet, rrulestr } from 'rrule'

@Directive({
    selector: '[rruleToText]',
})
export class RruleToTextDirective {

    @Input('rruleToText') set rruleToText(value: string) {
        
        if (typeof value === 'undefined') return

        if (value)
            this.parseRule(value)
        else
            this.el.nativeElement.innerText = 'Never'
    };

    constructor(private el: ElementRef) { }

    //---------------------------------------------------------------
    // Private methods
    //---------------------------------------------------------------

    private parseRule(value: string) {

        const rrule = this.cleanRule(value);
        const rule = RRule.fromString(rrule);
        const text = rule.toText();

        if (text)
            this.el.nativeElement.innerText = text
    }

    private cleanRule(rule): string {
        let lastChar = rule[rule.length - 1];
        return lastChar == ';' ? rule.substring(0, rule.length - 1) : rule;
    }

}

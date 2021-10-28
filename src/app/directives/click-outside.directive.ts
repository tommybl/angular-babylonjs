import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Directive for detecting when the user clicks outside an element.
 */
@Directive({
    selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

    @Output() clickOutside = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    onClick(targetElement: HTMLElement): void {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit();
        }
    }
}

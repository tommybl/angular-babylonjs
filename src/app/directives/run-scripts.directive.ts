import { AfterContentInit, Directive, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[appRunScripts]'
})
export class RunScriptsDirective implements AfterContentInit, OnDestroy {

    private readonly destroy$ = new Subject<boolean>();

    @Input() runTrigger: Observable<boolean> = new Observable<boolean>();

    constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: string) {
    }

    ngAfterContentInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.runTrigger
                .pipe(takeUntil(this.destroy$))
                .subscribe((value: boolean) => {
                    if (value) {
                        timer(0)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(() => this.reinsertScripts());
                    }
                });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

    reinsertScripts(): void {
        const scripts = this.elementRef.nativeElement.getElementsByTagName('script') as HTMLScriptElement[];
        const scriptsInitialLength = scripts.length;
        for (let i = 0; i < scriptsInitialLength; i++) {
            const script = scripts[i];
            const scriptCopy = document.createElement('script') as HTMLScriptElement;
            scriptCopy.type = script.type ? script.type : 'text/javascript';
            if (script.innerHTML) {
                scriptCopy.innerHTML = script.innerHTML;
            } else if (script.src) {
                scriptCopy.src = script.src;
            }
            scriptCopy.async = false;
            if (script.parentNode) {
                script.parentNode.replaceChild(scriptCopy, script);
            }
        }
    }
}

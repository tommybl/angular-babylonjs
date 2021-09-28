// Core
import { Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators';
import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy {

    loading = false;
    private readonly destroy$ = new Subject<boolean>();

    constructor(loaderService: LoaderService) {
        loaderService.loading$
            .pipe(takeUntil(this.destroy$))
            .subscribe(loading => this.loading = loading);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}

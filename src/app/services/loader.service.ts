import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private loading = new BehaviorSubject<boolean>(false);
    loading$ = this.loading.asObservable();

    start(): void {
        this.loading.next(true);
    }

    stop(): void {
        this.loading.next(false);
    }

    isLoading(): boolean {
        return this.loading.getValue();
    }
}

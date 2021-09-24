import { Component, OnDestroy, OnInit } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-hotspot-drawer',
    templateUrl: './hotspot-drawer.component.html',
    styleUrls: ['./hotspot-drawer.component.scss']
})
export class HotspotDrawerComponent implements OnInit, OnDestroy {

    data: any = null;

    private readonly destroy$ = new Subject<boolean>();

    constructor(private sceneService: SceneService) {
        this.sceneService.hotspotData$
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                this.data = data;
            });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}

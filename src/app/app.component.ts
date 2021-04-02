import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SceneService } from './babylon/scene.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'angular-babylonjs';

    hotspotKey!: string;
    private readonly destroy = new Subject<boolean>();

    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

    constructor(private sceneService: SceneService) {
    }

    ngOnInit(): void {
        this.sceneService.hotspotClicked$
            .pipe(takeUntil(this.destroy))
            .subscribe((hotspotKey: string|null) => {
                if (hotspotKey) {
                    this.hotspotKey = hotspotKey;
                    this.drawer.open();
                }
            });
    }

    playAnimation(): void {
        this.sceneService.playSphereAnimations();
    }

    pauseAnimation(): void {
        this.sceneService.pauseSphereAnimations();
    }

    resetAnimation(): void {
        this.sceneService.resetSphereAnimations();
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
    }
}

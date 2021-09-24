import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { SceneService } from './services/scene.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    private readonly destroy$ = new Subject<boolean>();

    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

    constructor(private sceneService: SceneService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.sceneService.setDrawer(this.drawer);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}

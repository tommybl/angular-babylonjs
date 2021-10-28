import {
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { SceneService } from './services/scene.service';
import { HotspotDrawerComponent } from './components/hotspot-drawer/hotspot-drawer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    private readonly destroy$ = new Subject<boolean>();

    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
    @ViewChild(HotspotDrawerComponent, { static: true, read: ElementRef }) drawerInner!: ElementRef;

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

    closeDrawer(): void {
        // Reset inner scroll on drawer close event.
        if (this.drawerInner) {
            this.drawerInner.nativeElement.scrollTop = 0;
        }
    }
}

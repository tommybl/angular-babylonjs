import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as menuData from '../../../assets/menu.json';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

    menu!: any;
    opened = false;
    sector!: string|null;
    private readonly destroy$ = new Subject<boolean>();

    constructor(private sceneService: SceneService) {
        this.menu = (menuData as any).default;
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.sceneService.sectorListener$
            .pipe(takeUntil(this.destroy$))
            .subscribe( sector => {
                this.sector = sector;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

    open(): void {
        this.opened = true;
    }

    close(): void {
        this.opened = false;
    }
}

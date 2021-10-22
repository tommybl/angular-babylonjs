import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SceneService } from '../../services/scene.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as menuData from '../../../assets/menu.json';

@Component({
    selector: 'app-sector',
    templateUrl: './sector.component.html',
    styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit, OnDestroy {

    menu!: any;
    sector!: string|null;

    private readonly destroy$ = new Subject<boolean>();

    constructor(private route: ActivatedRoute, private sceneService: SceneService) {
        this.menu = (menuData as any).default;
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe( paramMap => {
                // Set up new sector data.
                this.sector = paramMap.get('sector');
                this.sceneService.setSector(this.sector);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}

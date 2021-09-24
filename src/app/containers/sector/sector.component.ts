import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SceneService } from '../../services/scene.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-sector',
    templateUrl: './sector.component.html',
    styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit, OnDestroy {

    sector!: string|null;

    private readonly destroy$ = new Subject<boolean>();

    constructor(private route: ActivatedRoute, private sceneService: SceneService) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe( paramMap => {
                // Set up new sector data.
                this.sector = paramMap.get('sector');
                console.log('route change sector room', this.sector);
                this.sceneService.setSector(this.sector);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}

import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SceneService } from '../../services/scene.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-scene',
    templateUrl: './scene.component.html',
    styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, AfterViewInit, OnDestroy {

    scriptMarkup = '';
    runScripts$: Subject<boolean> = new Subject<boolean>();

    private readonly destroy$ = new Subject<boolean>();

    @ViewChild('renderCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

    constructor(
        private route: ActivatedRoute,
        private sceneService: SceneService,
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any
    ) {}

    ngOnInit(): void {
        this.sceneService.loading();
    }

    ngAfterViewInit(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe( paramMap => {
                // Show loader.
                this.sceneService.loading();
                // Clear previous scene from memory.
                this.sceneService.stop();

                // Set up new sector data.
                const sector = paramMap.get('sector');
                const scene = paramMap.get('scene');
                this.sceneService.setSector(sector);
                this.sceneService.setScene(scene);

                // Run babylon script for this sector scene.
                if (isPlatformBrowser(this.platformId)) {
                    this.http
                        .get('assets/sectors/' + sector + '/' + scene + '/scene.js', { responseType: 'text' })
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(data => {
                            this.scriptMarkup = '<script>' + data + '</script>';
                            this.runScripts$.next(true);
                        });
                }
            });
    }

    ngOnDestroy(): void {
        this.sceneService.stop();
        this.destroy$.next(true);
    }
}

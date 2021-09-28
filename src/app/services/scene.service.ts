import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDrawer } from '@angular/material/sidenav';
import { LoaderService } from './loader.service';

@Injectable({
    providedIn: 'root'
})
export class SceneService {

    private sector!: string|null;
    private scene!: string|null;
    private sceneData!: any;
    private hotspotDrawer!: MatDrawer;
    private hotspotData: Subject<any> = new Subject<any>();
    public hotspotData$: Observable<any> = this.hotspotData.asObservable();
    private sectorListener: Subject<string|null> = new Subject<string|null>();
    public sectorListener$: Observable<string|null> = this.sectorListener.asObservable();

    constructor(
        private http: HttpClient,
        private loaderService: LoaderService,
        @Inject(DOCUMENT) private doc: Document,
        @Inject(PLATFORM_ID) private platformId: string)
    {
        this.doc.body.addEventListener('sceneLoaded', (e: any) => {
            this.loaded();
        }, false);

        this.doc.body.addEventListener('hotspotAction', (e: any) => {
            if (e.detail && this.sceneData && this.sceneData[e.detail]) {
                this.hotspotData.next(this.sceneData[e.detail]);
                if (this.hotspotDrawer) {
                    this.hotspotDrawer.open();
                }
            }
        }, false);

        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('resize', () => {
                const engine: any = (window as any).engine;
                if (engine) {
                    engine.resize();
                }
            });
        }
    }

    getSectorName(): string|null {
        return this.sector;
    }

    setSector(sector: string|null): void {
        this.sector = sector;
        this.sectorListener.next(sector);
    }

    getSceneData(): any {
        return this.sceneData;
    }

    setScene(scene: string|null): void {
        this.scene = scene;

        this.http
            .get('assets/sectors/' + this.sector + '/' + scene + '/data.json')
            .subscribe(data => {
                this.sceneData = data;
            });
    }

    getDrawer(): MatDrawer {
        return this.hotspotDrawer;
    }

    setDrawer(hotspotDrawer: MatDrawer): void {
        this.hotspotDrawer = hotspotDrawer;
    }

    stop(): void {
        if (isPlatformBrowser(this.platformId)) {
            const scene: any = (window as any).sceneToRender;
            if (scene && typeof scene.dispose === 'function') {
                scene.dispose();
            }

            const engine: any = (window as any).engine;
            if (engine && typeof engine.dispose === 'function') {
                engine.dispose();
                engine.stopRenderLoop();
            }

            const camera: any = (window as any).camera;
            if (camera && typeof camera.dispose === 'function') {
                camera.dispose();
            }
        }
    }

    loading(): void {
        this.loaderService.start();
    }

    loaded(): void {
        this.loaderService.stop();
    }
}

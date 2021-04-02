import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SceneService } from '../scene.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-scene',
    templateUrl: './scene.component.html',
    styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, AfterViewInit, OnDestroy {

    private readonly destroy = new Subject<boolean>();

    @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

    constructor(private sceneService: SceneService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.sceneService.createScene(this.canvasRef);
        this.sceneService.startEngine();
    }

    ngOnDestroy(): void {
        this.sceneService.stop();
        this.destroy.next(true);
    }
}

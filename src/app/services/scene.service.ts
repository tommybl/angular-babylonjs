import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class SceneService {

    private sector!: string|null;
    private scene!: string|null;
    private sectorData!: any;
    private sceneData!: any;
    private hotspotDrawer!: MatDrawer;
    private hotspotData: Subject<any> = new Subject<any>();
    public hotspotData$: Observable<any> = this.hotspotData.asObservable();
    private sectorListener: Subject<string|null> = new Subject<string|null>();
    public sectorListener$: Observable<any> = this.sectorListener.asObservable();

    constructor(private http: HttpClient, @Inject(DOCUMENT) private doc: Document) {
        this.doc.body.addEventListener('hotspotAction', (e: any) => {
            console.log('hotspotAction', e);
            if (e.detail && this.sceneData && this.sceneData[e.detail]) {
                this.hotspotData.next({
                    sector: this.sectorData,
                    scene: this.sceneData[e.detail]
                });
                if (this.hotspotDrawer) {
                    this.hotspotDrawer.open();
                }
            }
        }, false);
    }

    getSectorName(): string|null {
        return this.sector;
    }

    getSectorData(): any {
        return this.sectorData;
    }

    setSector(sector: string|null): void {
        this.sector = sector;
        this.sectorListener.next(sector);

        this.http
            .get('assets/sectors/' + sector + '/data.json')
            .subscribe(data => {
                console.log('sector', sector, data);
                this.sectorData = data;
            });
    }

    getSceneData(): any {
        return this.sceneData;
    }

    setScene(scene: string|null): void {
        this.scene = scene;

        this.http
            .get('assets/sectors/' + this.sector + '/' + scene + '/data.json')
            .subscribe(data => {
                console.log('scene', scene, data);
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
        // this.scene.dispose();
        // this.engine.stopRenderLoop();
        // this.engine.dispose();
        // this.camera.dispose();
        // window.removeEventListener('resize', () => {});
    }

    // private engine!: Engine;
    // private scene!: Scene;
    // private sphere!: Mesh;
    // private shpereMaterial!: GradientMaterial;
    // private camera!: FreeCamera;
    // private canvas!: HTMLCanvasElement;
    // private sphereAnimations!: AnimationGroup;
    //
    // private hotspotClicked = new BehaviorSubject<string|null>(null);
    // readonly hotspotClicked$ = this.hotspotClicked.asObservable();
    //
    // constructor(private readonly ngZone: NgZone, @Inject(DOCUMENT) private document: Document) {
    // }
    //
    // createScene(canvasRef: ElementRef<HTMLCanvasElement>): Scene {
    //     this.canvas = canvasRef.nativeElement;
    //     this.canvas.style.height = '100%';
    //     this.canvas.style.width = '100%';
    //     this.engine = new Engine(this.canvas, true);
    //
    //     // This creates a basic Babylon Scene object (non-mesh).
    //     this.scene = new Scene(this.engine);
    //
    //     // This creates and positions a free camera (non-mesh).
    //     this.camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this.scene);
    //
    //     // This targets the camera to scene origin.
    //     this.camera.setTarget(Vector3.Zero());
    //
    //     // This attaches the camera to the canvas.
    //     this.camera.attachControl(this.canvas, true);
    //
    //     // This creates a light, aiming 0,1,0 - to the sky (non-mesh).
    //     const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
    //
    //     // Default intensity is 1. Let's dim the light a small amount.
    //     light.intensity = 0.7;
    //
    //     // Our built-in 'sphere' shape. Params: name, subdivs, size, scene.
    //     this.sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene);
    //
    //     this.shpereMaterial = new GradientMaterial('grad', this.scene);
    //     this.shpereMaterial.topColor = Color3.Random();
    //     this.shpereMaterial.bottomColor = Color3.Random();
    //     this.shpereMaterial.offset = 0.25;
    //     this.shpereMaterial.smoothness = 1;
    //     this.sphere.material = this.shpereMaterial;
    //     this.sphere.position.y = 0;
    //
    //     this.sphere.actionManager = new ActionManager(this.scene);
    //     this.sphere.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
    //         this.resetSphereColor();
    //     }));
    //
    //     const animationSphereTranslate = new Animation(
    //         'animationSphereTranslate',
    //         'position.y',
    //         30,
    //         Animation.ANIMATIONTYPE_FLOAT,
    //         Animation.ANIMATIONLOOPMODE_CYCLE
    //     );
    //     const animationSphereRotateX = new Animation(
    //         'animationSphereRotateX',
    //         'rotation.x',
    //         30,
    //         Animation.ANIMATIONTYPE_FLOAT,
    //         Animation.ANIMATIONLOOPMODE_CYCLE
    //     );
    //     const animationSphereRotateY = new Animation(
    //         'animationSphereRotateY',
    //         'rotation.y',
    //         10,
    //         Animation.ANIMATIONTYPE_FLOAT,
    //         Animation.ANIMATIONLOOPMODE_CYCLE
    //     );
    //     const animationSphereRotateZ = new Animation(
    //         'animationSphereRotateZ',
    //         'rotation.z',
    //         20,
    //         Animation.ANIMATIONTYPE_FLOAT,
    //         Animation.ANIMATIONLOOPMODE_CYCLE
    //     );
    //
    //     // An array with all animation keys.
    //     const keysTranslate = [
    //         {
    //             frame: 0,
    //             value: 0
    //         },
    //         {
    //             frame: 25,
    //             value: 3
    //         },
    //         {
    //             frame: 50,
    //             value: 0
    //         },
    //         {
    //             frame: 75,
    //             value: -3
    //         },
    //         {
    //             frame: 100,
    //             value: 0
    //         }
    //     ];
    //
    //     const keysRotate = [
    //         {
    //             frame: 0,
    //             value: 0
    //         },
    //         {
    //             frame: 100,
    //             value: Math.PI * 2
    //         }
    //     ];
    //
    //     animationSphereTranslate.setKeys(keysTranslate);
    //     animationSphereRotateX.setKeys(keysRotate);
    //     animationSphereRotateY.setKeys(keysRotate);
    //     animationSphereRotateZ.setKeys(keysRotate);
    //
    //     this.sphereAnimations = new AnimationGroup('sphereAnimations');
    //     this.sphereAnimations.addTargetedAnimation(animationSphereTranslate, this.sphere);
    //     this.sphereAnimations.addTargetedAnimation(animationSphereRotateX, this.sphere);
    //     this.sphereAnimations.addTargetedAnimation(animationSphereRotateY, this.sphere);
    //     this.sphereAnimations.addTargetedAnimation(animationSphereRotateZ, this.sphere);
    //     this.sphereAnimations.normalize(0, 100);
    //
    //     this.sphereAnimations.start(true);
    //
    //     // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene.
    //     const ground = Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
    //
    //     // GUI.
    //     const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
    //     const panel = new GUI.StackPanel();
    //     panel.isVertical = false;
    //     panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    //     panel.paddingTop = '75px';
    //     advancedTexture.addControl(panel);
    //
    //     const addButton = (text: string, hotspotKey: string, color: string) => {
    //         const button = GUI.Button.CreateSimpleButton('button', text);
    //         button.width = '140px';
    //         button.height = '40px';
    //         button.color = 'white';
    //         button.background = color;
    //         button.paddingLeft = '10px';
    //         button.paddingRight = '10px';
    //         button.fontWeight = 'bold';
    //         button.onPointerUpObservable.add(() => {
    //             this.hotspotClicked.next(hotspotKey);
    //         });
    //         panel.addControl(button);
    //     };
    //
    //     addButton('Hotspot 1', 'hotspot_1', '#3f51b5');
    //     addButton('Hotspot 2', 'hotspot_2', '#9c27b0');
    //     addButton('Hotspot 3', 'hotspot_3', '#f44336');
    //
    //     return this.scene;
    // }
    //
    // startEngine(): void {
    //     if (this.engine && this.scene) {
    //         this.ngZone.runOutsideAngular( () => {
    //             // Start the render loop and therefore start the Engine.
    //             this.engine.runRenderLoop(() => this.scene.render());
    //             window.addEventListener('resize', () => this.engine.resize());
    //         });
    //     }
    // }
    //
    // stop(): void {
    //     this.scene.dispose();
    //     this.engine.stopRenderLoop();
    //     this.engine.dispose();
    //     this.camera.dispose();
    //     window.removeEventListener('resize', () => {});
    // }
    //
    // playSphereAnimations(): void {
    //     this.sphereAnimations.restart();
    // }
    //
    // pauseSphereAnimations(): void {
    //     this.sphereAnimations.pause();
    // }
    //
    // resetSphereAnimations(): void {
    //     this.sphereAnimations.reset();
    //     this.resetSphereColor();
    // }
    //
    // resetSphereColor(): void {
    //     this.shpereMaterial.topColor = Color3.Random();
    //     this.shpereMaterial.bottomColor = Color3.Random();
    // }
}

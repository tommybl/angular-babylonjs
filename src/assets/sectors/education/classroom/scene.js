var canvas = document.getElementById("renderCanvas");
var engine = null;
var scene = null;
var sceneToRender = null;
var camera = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

var createScene = async function () {

    var assetsDir = 'assets/sectors/education/classroom/assets/';


    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.98, 0.98, 0.98);
    scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    scene.collisionsEnabled = true;

    // This creates and positions an arc rotate camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("Camera", 7.4, 1.39, 16, new BABYLON.Vector3(-0.81, 1.4, -0.5), scene);
    //camera.setPosition(new BABYLON.Vector3(5.79, 1.62, 5.76));
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 30;
    camera.wheelDeltaPercentage = 0.1;
    camera.pinchDeltaPercentage = 0.0005;
    camera.maxCameraSpeed = 10;
    camera.minZ = 0.1;
    camera.maxZ =80;
    camera.attachControl(canvas, true);
    scene.activeCamera.alpha += Math.PI;
    camera.checkCollisions = true;


    var cameraPosition = new BABYLON.ArcRotateCamera("cameraPosition", 0, 0, 3, new BABYLON.Vector3(0, 2.12, 4.3), scene);
    cameraPosition.setPosition(new BABYLON.Vector3(0, 3, 5));
    cameraPosition.lowerBetaLimit = 0.1;
    cameraPosition.upperBetaLimit = (Math.PI / 2) * 0.9;
    cameraPosition.lowerRadiusLimit = 5;
    cameraPosition.upperRadiusLimit = 30;
    cameraPosition.wheelDeltaPercentage = 0.1;
    cameraPosition.pinchDeltaPercentage = 0.0005;
    cameraPosition.maxCameraSpeed = 10;
    cameraPosition.minZ = 0.1;
    cameraPosition.maxZ =80;
    cameraPosition.attachControl(canvas, true);
    scene.activeCamera.alpha += Math.PI;
    cameraPosition.checkCollisions = true;


    // light for shadows
    const light = new BABYLON.DirectionalLight(
        'light',
        new BABYLON.Vector3(-0.6, -0.91, -0.45),
        scene
    )
    light.intensity = 1
    const lightDistance = 1
    light.position = new BABYLON.Vector3(3, 8, -10)

    // White material
    var newWhiteMaterial = new BABYLON.PBRMetallicRoughnessMaterial('clay', scene);
    newWhiteMaterial.baseColor = BABYLON.Color3.FromHexString('#e2dfd7');
    newWhiteMaterial.emissiveColor = BABYLON.Color3.FromHexString('#a0a0a0');
    newWhiteMaterial.metallic = 0;
    newWhiteMaterial.roughness = 1;
    newWhiteMaterial.alpha = 1;

    //Creates a new standard material
    var newBlueMaterial = new BABYLON.PBRMetallicRoughnessMaterial('newBlueMaterial', scene);
    newBlueMaterial.baseColor = BABYLON.Color3.FromHexString('#3e6acc');
    newBlueMaterial.emissiveColor = BABYLON.Color3.FromHexString('#162033');
    newBlueMaterial.metallic = 0;
    newBlueMaterial.roughness = 1;
    newBlueMaterial.alpha = 1;

    //screen material
    var newScreenMaterial = new BABYLON.PBRMetallicRoughnessMaterial('newScreenMaterial', scene);
    newScreenMaterial.baseColor = new BABYLON.Color3(0.49, 0.60, 0.89);
    newScreenMaterial.emissiveColor = new BABYLON.Color3(0.49, 0.60, 0.89);
    newScreenMaterial.metallic = 1;
    newScreenMaterial.roughness = 0;
    newScreenMaterial.alpha = 1;

    //Async load, dealys ataching materials
    var cubeLoaded = await BABYLON.SceneLoader.ImportMeshAsync("", assetsDir, "classroomv2.babylon", scene, function(progress) {
        if (progress.loaded === progress.total) {
            const event = new CustomEvent('sceneLoaded');
            document.body.dispatchEvent(event);
        }
    });

    laptopLoaded = scene.getMeshByName("TOUGHBOOK");
    tvStandLoaded = scene.getMeshByName("TVStand");
    tvBlueLoaded = scene.getMeshByName("TVBlue");
    screenLoaded = scene.getMeshByName("Screen");
    projectorLoaded = scene.getMeshByName("Projector");
    mountLoaded = scene.getMeshByName("Mount");
    plant1Loaded = scene.getMeshByName("Plant1");
    plant2Loaded = scene.getMeshByName("Plant2");
    plant3Loaded = scene.getMeshByName("Plant3");
    deskLoaded = scene.getMeshByName("desk");
    wallLoaded = scene.getMeshByName("Walls_2");
    planeLoaded = scene.getMeshByName("Plane");
    pressLoaded = scene.getMeshByName("pressIT");
    clockLoaded = scene.getMeshByName("clock");
    projectorScreenLoaded = scene.getMeshByName("ProjectorScreen");
    tableLoaded = scene.getMeshByName("Table");
    binLoaded = scene.getMeshByName("Bin");
    outletLoaded = scene.getMeshByName("Outlet");
    booksLoaded = scene.getMeshByName("Books");
    books2Loaded = scene.getMeshByName("Books_2");
    booksShelfLoaded = scene.getMeshByName("books");
    schoolTableLoaded = scene.getMeshByName("SchoolTable");
    shelfLoaded = scene.getMeshByName("shelf");
    laptopAltLoaded = scene.getMeshByName("Laptop");
    spiralLoaded = scene.getMeshByName("spiral_notebook");
    bookcaseLoaded = scene.getMeshByName("BookCase");

    //Attach white material

    mountLoaded.material = newWhiteMaterial;
    plant2Loaded.material = newWhiteMaterial;
    plant1Loaded.material = newWhiteMaterial;
    plant3Loaded.material = newWhiteMaterial;
    wallLoaded.material = newWhiteMaterial;
    planeLoaded.material = newWhiteMaterial;
    tvStandLoaded.material = newWhiteMaterial;
    clockLoaded.material = newWhiteMaterial;
    tableLoaded.material = newWhiteMaterial;
    binLoaded.material = newWhiteMaterial;
    outletLoaded.material = newWhiteMaterial;
    booksLoaded.material = newWhiteMaterial;
    books2Loaded.material = newWhiteMaterial;
    booksShelfLoaded.material = newWhiteMaterial;
    schoolTableLoaded.material = newWhiteMaterial;
    shelfLoaded.material = newWhiteMaterial;
    laptopAltLoaded.material = newWhiteMaterial;
    spiralLoaded.material = newWhiteMaterial;
    bookcaseLoaded.material = newWhiteMaterial;

    //Attach blue material
    laptopLoaded.material = newBlueMaterial;
    projectorLoaded.material = newBlueMaterial;
    tvBlueLoaded.material = newBlueMaterial;
    pressLoaded.material = newBlueMaterial;
    projectorScreenLoaded.material = newBlueMaterial;

    //Attach screen material
    screenLoaded.material = newScreenMaterial;

    ///SHADOWS + COLLISIONS

    //Generate shadows
    var shadowGenerator =  new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.getShadowMap().renderList = scene.meshes;
    shadowGenerator.useBlurCloseExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    light.shadowMinZ = 0;
    light.shadowMaxZ = 31;

    laptopLoaded.receiveShadows = true;
    mountLoaded.receiveShadows = true;
    plant1Loaded.receiveShadows = true;
    plant2Loaded.receiveShadows = true;
    plant3Loaded.receiveShadows = true;
    wallLoaded.receiveShadows = true;
    planeLoaded.receiveShadows = true;
    screenLoaded.receiveShadows = true;
    projectorLoaded.receiveShadows = true;
    tvStandLoaded.receiveShadows = true;
    tvBlueLoaded.receiveShadows = true;
    pressLoaded.receiveShadows = true;
    clockLoaded.receiveShadows = true;
    projectorScreenLoaded.receiveShadows = true;
    tableLoaded.receiveShadows = true;
    outletLoaded.receiveShadows = true;
    binLoaded.receiveShadows = true;
    booksLoaded.receiveShadows = true;
    books2Loaded.receiveShadows = true;
    booksShelfLoaded.receiveShadows = true;
    schoolTableLoaded.receiveShadows = true;
    shelfLoaded.receiveShadows = true;
    laptopAltLoaded.receiveShadows = true;
    spiralLoaded.receiveShadows = true;
    bookcaseLoaded.receiveShadows = true;

    //Camera Collisions

    laptopLoaded.checkCollisions = true;
    mountLoaded.checkCollisions = true;
    plant1Loaded.checkCollisions = true;
    plant2Loaded.checkCollisions = true;
    plant3Loaded.checkCollisions = true;
    wallLoaded.checkCollisions = true;
    planeLoaded.checkCollisions = true;
    screenLoaded.checkCollisions = true;
    projectorLoaded.checkCollisions = true;
    tvStandLoaded.checkCollisions = true;
    tvBlueLoaded.checkCollisions = true;
    pressLoaded.checkCollisions = true;
    clockLoaded.checkCollisions = true;
    projectorScreenLoaded.checkCollisions = true;
    tableLoaded.checkCollisions = true;
    binLoaded.checkCollisions = true;
    outletLoaded.checkCollisions = true;
    booksLoaded.checkCollisions = true;
    books2Loaded.checkCollisions = true;
    booksShelfLoaded.checkCollisions = true;
    schoolTableLoaded.checkCollisions = true;
    shelfLoaded.checkCollisions = true;
    laptopAltLoaded.checkCollisions = true;
    spiralLoaded.checkCollisions = true;
    bookcaseLoaded.checkCollisions = true;

    //Position Table
    tableLoaded.setPosition = new BABYLON.Vector3(-8.437,-243.556,57.118);

    //Instances

    //Instance schoolTable1
    let schoolTableInstance1 = schoolTableLoaded.createInstance("schoolTableInstance_clone1");
    schoolTableInstance1.position = new BABYLON.Vector3(-1.465,0.593,-1.723);
    schoolTableInstance1.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    schoolTableInstance1.rotation = new BABYLON.Vector3(Math.PI*1.5,0,Math.PI*1.3);

    //Instance schoolTable2
    let schoolTableInstance2 = schoolTableLoaded.createInstance("schoolTableInstance_clone2");
    schoolTableInstance2.position = new BABYLON.Vector3(2.430,0.593,-0.364);
    schoolTableInstance2.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    schoolTableInstance2.rotation = new BABYLON.Vector3(Math.PI*1.5,0,Math.PI*2.75);

    //Laptop Tooltip
    let actionManager = new BABYLON.ActionManager(scene);
    laptopLoaded.actionManager = actionManager;

    actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load TOUGHBOOK info");
        const event = new CustomEvent('hotspotAction', { detail: 'toughbook' });
        document.body.dispatchEvent(event);
    }));

    //PressIT Tooltip
    let actionManagerPress = new BABYLON.ActionManager(scene);
    pressLoaded.actionManager = actionManagerPress;

    actionManagerPress.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load PressIT info");
        const event = new CustomEvent('hotspotAction', { detail: 'pressIt' });
        document.body.dispatchEvent(event);
    }));

    //Screen Tooltip
    let actionManagerScreen = new BABYLON.ActionManager(scene);
    screenLoaded.actionManager = actionManagerScreen;

    actionManagerScreen.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Scren info");
        const event = new CustomEvent('hotspotAction', { detail: 'screen' });
        document.body.dispatchEvent(event);
    }));

    //Projector Tooltip
    let actionManagerProjector = new BABYLON.ActionManager(scene);
    projectorLoaded.actionManager = actionManagerProjector;

    actionManagerProjector.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Short Throw Projetor info");
        const event = new CustomEvent('hotspotAction', { detail: 'projector' });
        document.body.dispatchEvent(event);
    }));

    //Projector Tooltip 2
    let actionManagerProjector2 = new BABYLON.ActionManager(scene);
    projectorScreenLoaded.actionManager = actionManagerProjector2;

    actionManagerProjector2.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Short Throw Projetor info");
        const event = new CustomEvent('hotspotAction', { detail: 'projector' });
        document.body.dispatchEvent(event);
    }));
    
    engine.hideLoadingUI();
    window.camera = camera;

    //Add SSAO2
    var ssao = new BABYLON.SSAO2RenderingPipeline("ssao", scene, {
        ssaoRatio: 0.5, // Ratio of the SSAO post-process, in a lower resolution
        blurRatio: 1 // Ratio of the combine post-process (combines the SSAO and the scene)
    });
    ssao.radius = 0.65;
    ssao.totalStrength = 0.75;
    ssao.expensiveBlur = true;
    ssao.samples = 32;
    ssao.minZ = 5  ;
    ssao.maxZ = 40;
    scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", camera)

    //Anti-alisaing
    var defaultpipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [camera]);
    defaultpipeline.samples = 4;
    defaultpipeline.fxaaEnabled = true;

    return scene;
};

initFunction = async function() {
    var asyncEngineCreation = async function() {
        try {
            return createDefaultEngine();
        } catch(e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    scene = createScene();};
initFunction().then(() => {scene.then(returnedScene => { sceneToRender = returnedScene; });

    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

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
    scene.clearColor = new BABYLON.Color3(0.82, 0.83, 0.88);
    scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    scene.collisionsEnabled = true;

    // This creates and positions an arc rotate camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 2.12, 4.3), scene);
    camera.setPosition(new BABYLON.Vector3(0, 3, 5));
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

    //Sun
    var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-0.715, -0.615, -0.332), scene);
    light.shadowMinZ = -25;
    light.shadowMaxZ = 75;
    light.diffuse = new BABYLON.Color3(1, .98, .8);
    light.intensity = 0.75;

    //GI bounce
    var GILight = new BABYLON.DirectionalLight("GILight", new BABYLON.Vector3(0.49,-0.45,-0.75), scene);
    GILight.diffuse = new BABYLON.Color3(.8, .94, 1);
    GILight.intensity = 0.35;

    //HemiLight
    var hemiLight = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.45;
    hemiLight.diffuse = new BABYLON.Color3(0.7, 0.7, 1);

    //Creates a new standard material
    var newWhiteMaterial = new BABYLON.StandardMaterial;
    newWhiteMaterial.diffuseColor = new BABYLON.Color3(0.9,0.9,0.9);
    newWhiteMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    newWhiteMaterial.reflectionFresnelParameters.leftColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    newWhiteMaterial.reflectionFresnelParameters.rightColor = BABYLON.Color3.Black();

    //Creates a new standard material
    var newBlueMaterial = new BABYLON.StandardMaterial;
    newBlueMaterial.diffuseColor = new BABYLON.Color3(0.37, 0.51, 0.89);
    newBlueMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    newBlueMaterial.reflectionFresnelParameters.leftColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    newBlueMaterial.reflectionFresnelParameters.rightColor = BABYLON.Color3.Black();

    //Creates a new standard material
    var newScreenMaterial = new BABYLON.StandardMaterial;
    newScreenMaterial.diffuseColor = new BABYLON.Color3(0.49, 0.60, 0.89);
    newScreenMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    newScreenMaterial.reflectionFresnelParameters.leftColor = BABYLON.Color3.White();
    newScreenMaterial.reflectionFresnelParameters.rightColor = BABYLON.Color3.White();
    newScreenMaterial.emissiveColor = new BABYLON.Color3(0.49, 0.60, 0.89);

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
    shadowGenerator.blurKernel = 15;
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

    engine.hideLoadingUI();
    window.camera = camera;
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

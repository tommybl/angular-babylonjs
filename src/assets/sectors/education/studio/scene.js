var canvas = document.getElementById("renderCanvas");
var engine = null;
var scene = null;
var sceneToRender = null;
var camera = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

var createScene = async function () {

    var assetsDir = 'assets/sectors/education/studio/assets/';

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.98, 0.98, 0.98);
    scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    scene.collisionsEnabled = true;

    // This creates and positions an arc rotate camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 3, new BABYLON.Vector3(-3, 0.6, 4.3), scene);
    camera.setPosition(new BABYLON.Vector3(10, 1.5, -10));
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
        new BABYLON.Vector3(-0.35, -0.91, 0.23),
        scene
    )
    light.intensity = 1
    const lightDistance = 1
    light.position = new BABYLON.Vector3(10, 8, -10)

    // White material
    var clay = new BABYLON.PBRMetallicRoughnessMaterial('clay', scene);
    clay.baseColor = BABYLON.Color3.FromHexString('#e2dfd7');
    clay.emissiveColor = BABYLON.Color3.FromHexString('#a0a0a0');
    clay.metallic = 0;
    clay.roughness = 1;
    clay.alpha = 1;

    //Blue material
    var clayBlue = new BABYLON.PBRMetallicRoughnessMaterial('clayBlue', scene);
    clayBlue.baseColor = BABYLON.Color3.FromHexString('#3e6acc');
    clayBlue.emissiveColor = BABYLON.Color3.FromHexString('#162033');
    clayBlue.metallic = 0;
    clayBlue.roughness = 1;
    clayBlue.alpha = 1;

    //Window material
    var windowMaterial = new BABYLON.PBRMetallicRoughnessMaterial('windowMaterial', scene);
    windowMaterial.indexOfRefraction = 1.52;
    windowMaterial.alpha = 0.33;
    windowMaterial.cameraExposure = 0.66;
    windowMaterial.cameraContrast = 1.66;
    windowMaterial.microSurface = 1;

    //Screen material
    var newScreenMaterial = new BABYLON.PBRMetallicRoughnessMaterial('newScreenMaterial', scene);
    newScreenMaterial.baseColor = new BABYLON.Color3(0.49, 0.60, 0.89);
    newScreenMaterial.emissiveColor = new BABYLON.Color3(0.49, 0.60, 0.89);
    newScreenMaterial.metallic = 1;
    newScreenMaterial.roughness = 0;
    newScreenMaterial.alpha = 1;

    // New softbox material
    var softboxMaterial = new BABYLON.PBRMetallicRoughnessMaterial('softboxMaterial', scene);
    softboxMaterial.baseTexture = new BABYLON.Texture(assetsDir + "softbox.jpg", scene);
    softboxMaterial.emissiveTexture = new BABYLON.Texture(assetsDir + "softbox.jpg", scene);
    softboxMaterial.emissiveColor = new BABYLON.Color3(0.9, 0.9, 0.9);

    //Async load, dealys ataching materials
    var cubeLoaded = await BABYLON.SceneLoader.ImportMeshAsync("", assetsDir, "studio.babylon", scene, function(progress) {
        if (progress.loaded === progress.total) {
            const event = new CustomEvent('sceneLoaded');
            document.body.dispatchEvent(event);
        }
    });

    screenLoaded = scene.getMeshByName("Screen");
    speakerLoaded = scene.getMeshByName("speaker");
    deskLoaded = scene.getMeshByName("Desk");
    wallLoaded = scene.getMeshByName("Wall");
    binLoaded = scene.getMeshByName("Bin");
    groundLoaded = scene.getMeshByName("Ground");
    chairLoaded = scene.getMeshByName("Chair");
    tvStandLoaded = scene.getMeshByName("TVStand");
    tvBlueLoaded = scene.getMeshByName("TVBlue");
    computerLoaded = scene.getMeshByName("Computer");
    tvBlueAltLoaded = scene.getMeshByName("TVBlue_2");
    tvScreenLoaded = scene.getMeshByName("Screen_2");
    screenStandLoaded = scene.getMeshByName("ScreenStand");
    screenScreenLoaded = scene.getMeshByName("Screen_4");
    softboxLoaded = scene.getMeshByName("Softbox");
    softboxLightLoaded = scene.getMeshByName("SoftboxLight");
    tripodLoaded = scene.getMeshByName("Tripod");
    computerMonitorLoaded = scene.getMeshByName("ComputerMonitor_2");
    computerScreenLoaded = scene.getMeshByName("ComputerScreen");
    serverCaseLoaded = scene.getMeshByName("ServerCase");
    server1Loaded = scene.getMeshByName("Server1");
    keyboardLoaded = scene.getMeshByName("Keyboard");
    keyboard2Loaded = scene.getMeshByName("Keyboard_2");
    windowLoaded = scene.getMeshByName("Window");
    visionMixerLoaded = scene.getMeshByName("VisionMixer");
    cameraLoaded = scene.getMeshByName("Camera_2");

    //Instance Chair
    let chairInstance = chairLoaded.createInstance("chair1Loaded_clone1");
    chairInstance.position = new BABYLON.Vector3(-1.223,0.094,-3.180);
    chairInstance.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance.rotation = new BABYLON.Vector3(-1.57,3.9814,0);

    //Instance Servers
    let serverInstanceB = server1Loaded.createInstance("server1Loaded_clone");
    serverInstanceB.position = new BABYLON.Vector3(-2.797,0.463,-2.141);
    serverInstanceB.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    serverInstanceB.rotation = new BABYLON.Vector3(Math.PI*3/2,0,0);

    let serverInstanceM = server1Loaded.createInstance("server2Loaded_clone");
    serverInstanceM.position = new BABYLON.Vector3(-2.797,0.666,-2.141);
    serverInstanceM.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    serverInstanceM.rotation = new BABYLON.Vector3(Math.PI*3/2,0,0);

    let serverInstanceT = server1Loaded.createInstance("server3Loaded_clone");
    serverInstanceT.position = new BABYLON.Vector3(-2.797,0.869,-2.141);
    serverInstanceT.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    serverInstanceT.rotation = new BABYLON.Vector3(Math.PI*3/2,0,0);

    let softboxInstance = softboxLoaded.createInstance("softbox2Loaded_clone");
    softboxInstance.position = new BABYLON.Vector3(2.434,0.008,1.879);
    softboxInstance.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    softboxInstance.rotation = new BABYLON.Vector3(Math.PI*3/2,Math.PI*3/2,0);

    let softboxLightInstance = softboxLightLoaded.createInstance("softboxLight2Loaded_clone");
    softboxLightInstance.position = new BABYLON.Vector3(2.197,1.796,2.096);
    softboxLightInstance.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    softboxLightInstance.rotation = new BABYLON.Vector3(Math.PI*3/2,Math.PI*3/2,0);

    let cameraInstance = cameraLoaded.createInstance("cameraLoaded_clone");
    cameraInstance.position = new BABYLON.Vector3(1.345,1.043,1.366);
    cameraInstance.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    cameraInstance.rotation = new BABYLON.Vector3(Math.PI*3/2,-0.6971,0);

    let tripodInstance = tripodLoaded.createInstance("tripodLoaded_clone");
    tripodInstance.position = new BABYLON.Vector3(1.345,0.481,1.366);
    tripodInstance.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    tripodInstance.rotation = new BABYLON.Vector3(Math.PI*3/2,-0.6971,0);

    let computerMonitorInstance = computerMonitorLoaded.createInstance("computerMonitorLoaded_clone");
    computerMonitorInstance.position = new BABYLON.Vector3(1.07,1.01,-2.00);
    computerMonitorInstance.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    computerMonitorInstance.rotation = new BABYLON.Vector3(Math.PI*3/2,Math.PI,Math.PI*3/2);

    let computerScreenInstance = computerScreenLoaded.createInstance("computerScreenLoaded_clone");
    computerScreenInstance.position = new BABYLON.Vector3(1.07,1.084,-2.00);
    computerScreenInstance.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    computerScreenInstance.rotation = new BABYLON.Vector3(Math.PI*3/2,2.356,Math.PI*3/2);

    // //Attach white material
    speakerLoaded.material = clay;
    deskLoaded.material = clay;
    wallLoaded.material = clay;
    binLoaded.material = clay;
    groundLoaded.material = clay;
    chairLoaded.material = clay;
    tvStandLoaded.material = clay;
    screenStandLoaded.material = clay;
    screenScreenLoaded.material = clay;
    softboxLoaded.material = clay;
    tripodLoaded.material = clay;

    // //Attach blue material
    tvBlueLoaded.material = clayBlue;
    computerLoaded.material = clayBlue;
    computerMonitorLoaded.material = clayBlue;
    tvBlueAltLoaded.material = clayBlue;
    serverCaseLoaded.material = clayBlue;
    server1Loaded.material = clayBlue;
    keyboardLoaded.material = clayBlue;
    keyboard2Loaded.material = clayBlue;
    visionMixerLoaded.material = clayBlue;
    cameraLoaded.material = clayBlue;

    // //Attach screen material
    screenLoaded.material = newScreenMaterial;
    tvScreenLoaded.material = newScreenMaterial;
    computerScreenLoaded.material = newScreenMaterial;

    // //Attach softbox material
    softboxLightLoaded.material = softboxMaterial;


    // //Attach Window material
    windowLoaded.material = windowMaterial;

    ///SHADOWS + COLLISIONS
    //Generate shadows
    var shadowGenerator =  new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.getShadowMap().renderList = scene.meshes;
    shadowGenerator.useBlurCloseExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    light.shadowMinZ = 0;
    light.shadowMaxZ = 31;

    screenLoaded.receiveShadows = true;
    speakerLoaded.receiveShadows = true;
    deskLoaded.receiveShadows = true;
    wallLoaded.receiveShadows = true;
    binLoaded.receiveShadows = true;
    groundLoaded.receiveShadows = true;
    chairLoaded.receiveShadows = true;
    tvStandLoaded.receiveShadows = true;
    tvBlueLoaded.receiveShadows = true;
    computerLoaded.receiveShadows = true;
    tvBlueAltLoaded.receiveShadows = true;
    tvScreenLoaded.receiveShadows = true;
    screenStandLoaded.receiveShadows = true;
    screenScreenLoaded.receiveShadows = true;
    softboxLoaded.receiveShadows = true;
    softboxLightLoaded.receiveShadows = true;
    tripodLoaded.receiveShadows = true;
    computerMonitorLoaded.receiveShadows = true;
    computerScreenLoaded.receiveShadows = true;
    serverCaseLoaded.receiveShadows = true;
    server1Loaded.receiveShadows = true;
    keyboardLoaded.receiveShadows = true;
    keyboard2Loaded.receiveShadows = true;
    windowLoaded.receiveShadows = true;
    visionMixerLoaded.receiveShadows = true;
    cameraLoaded.receiveShadows = true;

    // //Camera Collisions
    screenLoaded.checkCollisions = true;
    speakerLoaded.checkCollisions = true;
    deskLoaded.checkCollisions = true;
    wallLoaded.checkCollisions = true;
    binLoaded.checkCollisions = true;
    groundLoaded.checkCollisions = true;
    chairLoaded.checkCollisions = true;
    tvStandLoaded.checkCollisions = true;
    tvBlueLoaded.checkCollisions = true;
    computerLoaded.checkCollisions = true;
    tvBlueAltLoaded.checkCollisions = true;
    tvScreenLoaded.checkCollisions = true;
    screenStandLoaded.checkCollisions = true;
    screenScreenLoaded.checkCollisions = true;
    softboxLoaded.checkCollisions = true;
    softboxLightLoaded.checkCollisions = true;
    tripodLoaded.checkCollisions = true;
    computerMonitorLoaded.checkCollisions = true;
    computerScreenLoaded.checkCollisions = true;
    serverCaseLoaded.checkCollisions = true;
    server1Loaded.checkCollisions = true;
    keyboardLoaded.checkCollisions = true;
    keyboard2Loaded.checkCollisions = true;
    windowLoaded.checkCollisions = true;
    visionMixerLoaded.checkCollisions = true;
    cameraLoaded.checkCollisions = true;

    //Control Tooltip
    let actionManagerControl = new BABYLON.ActionManager(scene);
    visionMixerLoaded.actionManager = actionManagerControl;

    actionManagerControl.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'control' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerControlComputer = new BABYLON.ActionManager(scene);
    computerLoaded.actionManager = actionManagerControlComputer;

    actionManagerControlComputer.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'control' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerKeyboard = new BABYLON.ActionManager(scene);
    keyboardLoaded.actionManager = actionManagerKeyboard;

    actionManagerKeyboard.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'control' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerKeyboardALT = new BABYLON.ActionManager(scene);
    keyboard2Loaded.actionManager = actionManagerKeyboardALT;

    actionManagerKeyboardALT.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'control' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerStudioComputer = new BABYLON.ActionManager(scene);
    computerMonitorLoaded.actionManager = actionManagerStudioComputer;

    actionManagerStudioComputer.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'control' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerStudioComputerScreen = new BABYLON.ActionManager(scene);
    computerScreenLoaded.actionManager = actionManagerStudioComputerScreen;

    actionManagerStudioComputerScreen.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'control' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerStudioComputerInstance = new BABYLON.ActionManager(scene);
    computerMonitorInstance.actionManager = actionManagerStudioComputerInstance;

    actionManagerStudioComputerInstance.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'control' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerStudioComputerScreenInstance = new BABYLON.ActionManager(scene);
    computerScreenInstance.actionManager = actionManagerStudioComputerScreenInstance;

    actionManagerStudioComputerScreenInstance.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'control' });
        document.body.dispatchEvent(event);
    }));

    //Camera Tooltip
    let actionManagerCamera = new BABYLON.ActionManager(scene);
    cameraLoaded.actionManager = actionManagerCamera;

    actionManagerCamera.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'camera' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerCameraAlt = new BABYLON.ActionManager(scene);
    cameraInstance.actionManager = actionManagerCameraAlt;

    actionManagerCameraAlt.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'camera' });
        document.body.dispatchEvent(event);
    }));

    //Screen Tooltip
    let actionManagerScreen = new BABYLON.ActionManager(scene);
    tvBlueLoaded.actionManager = actionManagerScreen;

    actionManagerScreen.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'screen' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerScreenAlt = new BABYLON.ActionManager(scene);
    screenLoaded.actionManager = actionManagerScreenAlt;

    actionManagerScreenAlt.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'screen' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerStudioScreen = new BABYLON.ActionManager(scene);
    tvBlueAltLoaded.actionManager = actionManagerStudioScreen;

    actionManagerStudioScreen.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'screen' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerStudioScreenAlt = new BABYLON.ActionManager(scene);
    tvScreenLoaded.actionManager = actionManagerStudioScreenAlt;

    actionManagerStudioScreenAlt.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'screen' });
        document.body.dispatchEvent(event);
    }));

    //Kairos Tooltip
    let actionManagerServerCase = new BABYLON.ActionManager(scene);
    serverCaseLoaded.actionManager = actionManagerServerCase;

    actionManagerServerCase.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'kairos' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerServer = new BABYLON.ActionManager(scene);
    server1Loaded.actionManager = actionManagerServer;

    actionManagerServer.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'kairos' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerServerB = new BABYLON.ActionManager(scene);
    serverInstanceB.actionManager = actionManagerServerB;

    actionManagerServerB.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'kairos' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerServerM = new BABYLON.ActionManager(scene);
    serverInstanceM.actionManager = actionManagerServerM;

    actionManagerServerM.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'kairos' });
        document.body.dispatchEvent(event);
    }));

    let actionManagerServerT = new BABYLON.ActionManager(scene);
    serverInstanceT.actionManager = actionManagerServerT;

    actionManagerServerT.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Control info");
        const event = new CustomEvent('hotspotAction', { detail: 'kairos' });
        document.body.dispatchEvent(event);
    }));

    engine.hideLoadingUI();
    window.camera = camera;

    //Add SSAO2
    var ssao = new BABYLON.SSAO2RenderingPipeline("ssao", scene, {
        ssaoRatio: 0.5, // Ratio of the SSAO post-process, in a lower resolution
        blurRatio: 1 // Ratio of the combine post-process (combines the SSAO and the scene)
    });
    ssao.radius = 0.5;
    ssao.totalStrength = 1.30;
    ssao.expensiveBlur = true;
    ssao.samples = 32;
    ssao.minZ = 0.01  ;
    ssao.maxZ = 30;
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

var canvas = document.getElementById("renderCanvas");
var engine = null;
var scene = null;
var sceneToRender = null;
var camera = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

var createScene = async function () {

    var assetsDir = 'assets/sectors/education/auditorium/assets/';

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    console.log(scene);
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
    var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-0.42, -0.64, 0.65), scene);
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

    //Creates a new standard material
    var newFloorMaterial = new BABYLON.StandardMaterial;
    newFloorMaterial.diffuseTexture = new BABYLON.Texture(assetsDir + "planks.jpg", scene);
    newFloorMaterial.bumpTexture = new BABYLON.Texture(assetsDir + "planks.jpg", scene);
    newFloorMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    newFloorMaterial.reflectionFresnelParameters.leftColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    newFloorMaterial.reflectionFresnelParameters.rightColor = BABYLON.Color3.Black();

    //Creates a new standard material
    var newCurtainMaterial = new BABYLON.StandardMaterial;
    newCurtainMaterial.diffuseTexture = new BABYLON.Texture(assetsDir + "fabric.jpg", scene);
    newCurtainMaterial.bumpTexture = new BABYLON.Texture(assetsDir + "fabric.jpg", scene);
    newCurtainMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    newCurtainMaterial.reflectionFresnelParameters.leftColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    newCurtainMaterial.reflectionFresnelParameters.rightColor = BABYLON.Color3.Black();
    newCurtainMaterial.diffuseTexture.uScale = 8;
    newCurtainMaterial.diffuseTexture.vScale = 8;
    newCurtainMaterial.bumpTexture.uScale = 8;
    newCurtainMaterial.bumpTexture.vScale = 8;

    //Creates a new standard material
    var newGrillMaterial = new BABYLON.StandardMaterial;
    newGrillMaterial.diffuseTexture = new BABYLON.Texture(assetsDir + "tex_structure_speaker_1.jpg", scene);
    newGrillMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    newGrillMaterial.reflectionFresnelParameters.leftColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    newGrillMaterial.reflectionFresnelParameters.rightColor = BABYLON.Color3.Black();
    newGrillMaterial.diffuseTexture.uScale = 2;
    newGrillMaterial.diffuseTexture.vScale = 6;

    //Async load, dealys ataching materials
    var cubeLoaded = await BABYLON.SceneLoader.ImportMeshAsync("", assetsDir, "auditoriumv3.babylon", scene, function(progress) {
        if (progress.loaded === progress.total) {
            const event = new CustomEvent('sceneLoaded');
            document.body.dispatchEvent(event);
        }
    });

    bordWhiteLoaded = scene.getMeshByName("ProjectorScreenWhite");
    bordBlueLoaded = scene.getMeshByName("ProjectorScreenBlue");
    laptopLoaded = scene.getMeshByName("TOUGHBOOK");
    stageLoaded = scene.getMeshByName("stage");
    stageWoodLoaded = scene.getMeshByName("stageWood");
    seat1Loaded = scene.getMeshByName("seat1");
    projectorLoaded = scene.getMeshByName("Projector");
    mountLoaded = scene.getMeshByName("Mount");
    chairLoaded = scene.getMeshByName("Chair");
    plant2Loaded = scene.getMeshByName("Plant_2");
    plant1Loaded = scene.getMeshByName("Plant");
    deskLoaded = scene.getMeshByName("desk");
    wallLoaded = scene.getMeshByName("Wall");
    planeLoaded = scene.getMeshByName("Plane_1");
    controlLoaded = scene.getMeshByName("ControlSurface");
    screenLoaded = scene.getMeshByName("Screen");
    tribuneLoaded = scene.getMeshByName("tribune1");
    stairsLoaded = scene.getMeshByName("stairs1");
    curtainLoaded = scene.getMeshByName("Curtain");
    stageSpeakerLoaded = scene.getMeshByName("StageSpeaker");
    topSpeakerLoaded = scene.getMeshByName("TopSpeaker");
    stageSpeakerGrillLoaded = scene.getMeshByName("TopSpeakerGrill");
    topSpeakerGrillLoaded = scene.getMeshByName("TopSpeakerGrill");
    ptzLoaded = scene.getMeshByName("PanasonicAW_HE120_2");
    ptzMountLoaded = scene.getMeshByName("BackCameraWall_2");
    lecternLoaded = scene.getMeshByName("Lectern_2");
    ptz2Loaded = scene.getMeshByName("PTZ_2");
    micLoaded = scene.getMeshByName("Mic");
    tvStandLoaded = scene.getMeshByName("TVStand");
    tvBlueLoaded = scene.getMeshByName("TVBlue");

    //Instance ChairInstance1L
    let chairInstance1L = seat1Loaded.createInstance("chair1Loaded_clone1L");
    chairInstance1L.position = new BABYLON.Vector3(7.60,1.748,-1.392);
    chairInstance1L.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance1L.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance2L
    let chairInstance2L = seat1Loaded.createInstance("chair1Loaded_clone2L");
    chairInstance2L.position = new BABYLON.Vector3(7.60,2.35,-3.16);
    chairInstance2L.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance2L.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance3L
    let chairInstance3L = seat1Loaded.createInstance("chair1Loaded_clone3L");
    chairInstance3L.position = new BABYLON.Vector3(7.60,2.95,-5.12);
    chairInstance3L.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance3L.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance4L
    let chairInstance4L = seat1Loaded.createInstance("chair1Loaded_clone4L");
    chairInstance4L.position = new BABYLON.Vector3(7.60,1.067,0.681);
    chairInstance4L.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance4L.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance1M
    let chairInstance1M = seat1Loaded.createInstance("chair1Loaded_clone1M");
    chairInstance1M.position = new BABYLON.Vector3(0,1.748,-1.392);
    chairInstance1M.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance1M.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance2M
    let chairInstance2M = seat1Loaded.createInstance("chair1Loaded_clone2M");
    chairInstance2M.position = new BABYLON.Vector3(0,2.35,-3.16);
    chairInstance2M.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance2M.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance3M
    let chairInstance3M = seat1Loaded.createInstance("chair1Loaded_clone3M");
    chairInstance3M.position = new BABYLON.Vector3(0,2.95,-5.12);
    chairInstance3M.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance3M.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance4M
    let chairInstance4M = seat1Loaded.createInstance("chair1Loaded_clone4M");
    chairInstance4M.position = new BABYLON.Vector3(0,1.067,0.681);
    chairInstance4M.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance4M.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance TribuneMiddle
    let tribuneInstanceM = tribuneLoaded.createInstance("tribuneLoaded_clone1M");
    tribuneInstanceM.position = new BABYLON.Vector3(0.017,1.471,-2.256);
    tribuneInstanceM.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    tribuneInstanceM.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance Stairs Middle Left
    let stairsInstanceML = stairsLoaded.createInstance("stairsLoaded_cloneML");
    stairsInstanceML.position = new BABYLON.Vector3(-3.277,1.647,-6.788);
    stairsInstanceML.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    stairsInstanceML.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance1R
    let chairInstance1R = seat1Loaded.createInstance("chair1Loaded_clone1R");
    chairInstance1R.position = new BABYLON.Vector3(-7.6,1.748,-1.392);
    chairInstance1R.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance1R.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance2R
    let chairInstance2R = seat1Loaded.createInstance("chair1Loaded_clone2R");
    chairInstance2R.position = new BABYLON.Vector3(-7.6,2.35,-3.16);
    chairInstance2R.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance2R.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance ChairInstance3R
    let chairInstance3R = seat1Loaded.createInstance("chair1Loaded_clone3R");
    chairInstance3R.position = new BABYLON.Vector3(-7.6,2.95,-5.12);
    chairInstance3R.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    chairInstance3R.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance TribuneRight
    let tribuneInstanceR = tribuneLoaded.createInstance("tribuneLoaded_clone1R");
    tribuneInstanceR.position = new BABYLON.Vector3(7.613,1.471,-2.256);
    tribuneInstanceR.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    tribuneInstanceR.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance Stairs Middle Right
    let stairsInstanceMR = stairsLoaded.createInstance("stairsLoaded_cloneMR");
    stairsInstanceMR.position = new BABYLON.Vector3(4.312,1.647,-6.788);
    stairsInstanceMR.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    stairsInstanceMR.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Instance Stairs Right
    let stairsInstanceR = stairsLoaded.createInstance("stairsLoaded_cloneR");
    stairsInstanceR.position = new BABYLON.Vector3(11.918,1.647,-6.788);
    stairsInstanceR.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
    stairsInstanceR.rotation = new BABYLON.Vector3(Math.PI*1.5,0,0);

    //Attach white material
    bordWhiteLoaded.material = newWhiteMaterial;
    stageLoaded.material = newWhiteMaterial;
    mountLoaded.material = newWhiteMaterial;
    chairLoaded.material = newWhiteMaterial;
    plant2Loaded.material = newWhiteMaterial;
    plant1Loaded.material = newWhiteMaterial;
    deskLoaded.material = newWhiteMaterial;
    wallLoaded.material = newWhiteMaterial;
    planeLoaded.material = newWhiteMaterial;
    tribuneLoaded.material = newWhiteMaterial;
    tribuneInstanceM.material = newWhiteMaterial;
    tribuneInstanceR.material = newWhiteMaterial;
    stageSpeakerLoaded.material = newWhiteMaterial;
    topSpeakerLoaded.material = newWhiteMaterial;
    seat1Loaded.material = newWhiteMaterial;
    stairsLoaded.material = newWhiteMaterial;
    ptzMountLoaded.material = newWhiteMaterial;
    lecternLoaded.material = newWhiteMaterial;
    micLoaded.material = newWhiteMaterial;
    tvStandLoaded.material = newWhiteMaterial;

    //Attach blue material
    laptopLoaded.material = newBlueMaterial;
    bordBlueLoaded.material = newBlueMaterial;
    controlLoaded.material = newBlueMaterial;
    ptzLoaded.material = newBlueMaterial;
    ptz2Loaded.material = newBlueMaterial;
    projectorLoaded.material = newBlueMaterial;
    tvBlueLoaded.material = newBlueMaterial;

    //Attach screen material
    screenLoaded.material = newScreenMaterial;

    //Attach Stage Wood material
    stageWoodLoaded.material = newFloorMaterial;

    //Attach Stage Wood material
    curtainLoaded.material = newCurtainMaterial;

    //Attach Stage Wood material
    stageSpeakerGrillLoaded.material = newGrillMaterial;
    topSpeakerGrillLoaded.material = newGrillMaterial;

    ///SHADOWS + COLLISIONS

    //Generate shadows
    var shadowGenerator =  new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.getShadowMap().renderList = scene.meshes;
    shadowGenerator.useBlurCloseExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 15;
    bordWhiteLoaded.receiveShadows = true;
    bordBlueLoaded.receiveShadows = true;
    laptopLoaded.receiveShadows = true;
    stageLoaded.receiveShadows = true;
    mountLoaded.receiveShadows = true;
    chairLoaded.receiveShadows = true;
    plant1Loaded.receiveShadows = true;
    plant2Loaded.receiveShadows = true;
    deskLoaded.receiveShadows = true;
    wallLoaded.receiveShadows = true;
    planeLoaded.receiveShadows = true;
    controlLoaded.receiveShadows = true;
    screenLoaded.receiveShadows = true;
    tribuneLoaded.receiveShadows = true;
    stageWoodLoaded.receiveShadows = true;
    curtainLoaded.receiveShadows = true;
    stageSpeakerLoaded.receiveShadows = true;
    topSpeakerLoaded.receiveShadows = true;
    stageSpeakerGrillLoaded.receiveShadows = true;
    topSpeakerGrillLoaded.receiveShadows = true;
    ptzLoaded.receiveShadows = true;
    ptzMountLoaded.receiveShadows = true;
    seat1Loaded.receiveShadows = true;
    stairsLoaded.receiveShadows = true;
    lecternLoaded.receiveShadows = true;
    micLoaded.receiveShadows = true;
    ptz2Loaded.receiveShadows = true;
    projectorLoaded.receiveShadows = true;
    tvStandLoaded.receiveShadows = true;
    tvBlueLoaded.receiveShadows = true;


    //Camera Collisions
    bordWhiteLoaded.checkCollisions = true;
    bordBlueLoaded.checkCollisions = true;
    laptopLoaded.checkCollisions = true;
    stageLoaded.checkCollisions = true;
    mountLoaded.checkCollisions = true;
    chairLoaded.checkCollisions = true;
    plant1Loaded.checkCollisions = true;
    plant2Loaded.checkCollisions = true;
    deskLoaded.checkCollisions = true;
    wallLoaded.checkCollisions = true;
    planeLoaded.checkCollisions = true;
    controlLoaded.checkCollisions = true;
    screenLoaded.checkCollisions = true;
    tribuneLoaded.checkCollisions = true;
    stageWoodLoaded.checkCollisions = true;
    curtainLoaded.checkCollisions = true;
    stageSpeakerLoaded.checkCollisions = true;
    topSpeakerLoaded.checkCollisions = true;
    stageSpeakerGrillLoaded.checkCollisions = true;
    topSpeakerGrillLoaded.checkCollisions = true;
    ptzLoaded.checkCollisions = true;
    ptzMountLoaded.checkCollisions = true;
    seat1Loaded.checkCollisions = true;
    stairsLoaded.checkCollisions = true;
    lecternLoaded.checkCollisions = true;
    micLoaded.checkCollisions = true;
    ptz2Loaded.checkCollisions = true;
    projectorLoaded.checkCollisions = true;
    tvStandLoaded.checkCollisions = true;
    tvBlueLoaded.checkCollisions = true;

    //Laptop Tooltip
    let actionManager = new BABYLON.ActionManager(scene);
    laptopLoaded.actionManager = actionManager;

    actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load TOUGHBOOK info");
        const event = new CustomEvent('hotspotAction', { detail: 'toughbook' });
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

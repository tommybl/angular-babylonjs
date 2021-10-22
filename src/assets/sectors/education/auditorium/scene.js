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
    scene.clearColor = new BABYLON.Color3(0.98, 0.98, 0.98);
    scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    scene.collisionsEnabled = true;

    // This creates and positions an arc rotate camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 2.12, 4.3), scene);
    camera.setPosition(new BABYLON.Vector3(25.196, 7.170, -15.469));
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


    var cameraPosition = new BABYLON.ArcRotateCamera("cameraPosition", 0, 0, 10, new BABYLON.Vector3(0, 2.12, 4.3), scene);
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

    //Creates a new standard material
    var clayBlue = new BABYLON.PBRMetallicRoughnessMaterial('clayBlue', scene);
    clayBlue.baseColor = BABYLON.Color3.FromHexString('#3e6acc');
    clayBlue.emissiveColor = BABYLON.Color3.FromHexString('#162033');
    clayBlue.metallic = 0;
    clayBlue.roughness = 1;
    clayBlue.alpha = 1;

    //screen material
    var newScreenMaterial = new BABYLON.PBRMetallicRoughnessMaterial('newScreenMaterial', scene);
    newScreenMaterial.baseColor = new BABYLON.Color3(0.49, 0.60, 0.89);
    newScreenMaterial.emissiveColor = new BABYLON.Color3(0.49, 0.60, 0.89);
    newScreenMaterial.metallic = 1;
    newScreenMaterial.roughness = 0;
    newScreenMaterial.alpha = 1;

    // New floor material
    var newFloorMaterial = new BABYLON.PBRMetallicRoughnessMaterial('newFloorMaterial', scene);
    newFloorMaterial.baseTexture = new BABYLON.Texture(assetsDir + "planksColour.jpg", scene);
    newFloorMaterial.emissiveTexture = new BABYLON.Texture(assetsDir + "planksColour.jpg", scene);
    newFloorMaterial.emissiveColor = new BABYLON.Color3(0.9, 0.9, 0.9);
    newFloorMaterial.metallic = 1;
    newFloorMaterial.roughness = 0;
    newFloorMaterial.alpha = 1;
    newFloorMaterial.baseTexture.uScale = 2;
    newFloorMaterial.baseTexture.vScale = 2;
    newFloorMaterial.emissiveTexture.uScale = 2;
    newFloorMaterial.emissiveTexture.vScale = 2;

    // New Curtain material
    var newCurtainMaterial = new BABYLON.PBRMetallicRoughnessMaterial('newCurtainMaterial', scene);
    newCurtainMaterial.baseTexture = new BABYLON.Texture(assetsDir + "fabric_2.jpg", scene);
    newCurtainMaterial.emissiveTexture = new BABYLON.Texture(assetsDir + "fabric_emissive.jpg", scene);
    newCurtainMaterial.emissiveColor = new BABYLON.Color3(0.9, 0.9, 0.9);
    newCurtainMaterial.metallic = 1;
    newCurtainMaterial.roughness = 0;
    newCurtainMaterial.alpha = 1;
    newCurtainMaterial.baseTexture.uScale = 8;
    newCurtainMaterial.baseTexture.vScale = 8;
    newCurtainMaterial.emissiveTexture.uScale = 8;
    newCurtainMaterial.emissiveTexture.vScale = 8; 
    
    // New Paper material
    var paper = new BABYLON.PBRMetallicRoughnessMaterial('paper', scene);
    paper.baseTexture = new BABYLON.Texture(assetsDir + "paper2.jpg", scene);
    paper.emissiveTexture = new BABYLON.Texture(assetsDir + "paper2.jpg", scene);
    paper.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    paper.metallic = 1;
    paper.roughness = 0;
    paper.alpha = 1;

    // New Grill material
    var newGrillMaterial = new BABYLON.PBRMetallicRoughnessMaterial('newGrillMaterial', scene);
    newGrillMaterial.baseTexture = new BABYLON.Texture(assetsDir + "tex_structure_speaker_1.jpg", scene);
    newGrillMaterial.emissiveTexture = new BABYLON.Texture(assetsDir + "tex_structure_speaker_1.jpg", scene);
    newGrillMaterial.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    newGrillMaterial.metallic = 1;
    newGrillMaterial.roughness = 0;
    newGrillMaterial.alpha = 1;
    newGrillMaterial.baseTexture.uScale = 2;
    newGrillMaterial.baseTexture.vScale = 6;
    newGrillMaterial.emissiveTexture.uScale = 2;
    newGrillMaterial.emissiveTexture.vScale = 6;

    //Async load, dealys ataching materials
    var cubeLoaded = await BABYLON.SceneLoader.ImportMeshAsync("", assetsDir, "auditoriumv4.babylon", scene, function(progress) {
        if (progress.loaded === progress.total) {
            const event = new CustomEvent('sceneLoaded');
            document.body.dispatchEvent(event);
        }
    });

    bordWhiteLoaded = scene.getMeshByName("ProjectorScreenWhite_2");
    bordBlueLoaded = scene.getMeshByName("ProjectorScreenBlue");
    laptopLoaded = scene.getMeshByName("TOUGHBOOK");
    stageLoaded = scene.getMeshByName("stage");
    stageWoodLoaded = scene.getMeshByName("stageWood");
    seat1Loaded = scene.getMeshByName("seat1");
    projectorLoaded = scene.getMeshByName("Projector");
    mountLoaded = scene.getMeshByName("Mount");
    chairLoaded = scene.getMeshByName("Chair_2");
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
    stageSpeakerMidLoaded = scene.getMeshByName("StageMidSpeaker");
    stageSpeakerMid2Loaded = scene.getMeshByName("StageMidSpeaker_2");
    stageSpeakerMid3Loaded = scene.getMeshByName("StageMidSpeaker_3");
    stageSpeakerMidGrillLoaded = scene.getMeshByName("StageMidSpeakerGrill");
    stageSpeakerMidGrill2Loaded = scene.getMeshByName("StageMidSpeakerGrill_2");
    stageSpeakerMidGrill3Loaded = scene.getMeshByName("StageMidSpeakerGrill_3");
    frontFrameLoaded = scene.getMeshByName("FrontFrame");
    frontScreenLoaded = scene.getMeshByName("FrontScreen");
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
    paper1Loaded = scene.getMeshByName("Paper_2");
    paper2Loaded = scene.getMeshByName("Paper_3");
    paper3Loaded = scene.getMeshByName("Paper_4");
    paper4Loaded = scene.getMeshByName("Paper_5");
    paper5Loaded = scene.getMeshByName("Paper_6");
    paper6Loaded = scene.getMeshByName("Paper_7");
    paper7Loaded = scene.getMeshByName("Paper_8");
    paper8Loaded = scene.getMeshByName("Paper_9");
    paper9Loaded = scene.getMeshByName("Paper_10");
    paper10Loaded = scene.getMeshByName("Paper_11");
    paper11Loaded = scene.getMeshByName("Paper_12");
    paper12Loaded = scene.getMeshByName("Paper_13");
    paper13Loaded = scene.getMeshByName("Paper_14");
    paper14Loaded = scene.getMeshByName("Paper_15");
    paper15Loaded = scene.getMeshByName("Paper_16");
    paper16Loaded = scene.getMeshByName("Paper_17");
    paper17Loaded = scene.getMeshByName("Paper_18");
    paper18Loaded = scene.getMeshByName("Paper_19");
    paper19Loaded = scene.getMeshByName("Paper_20");
    paper20Loaded = scene.getMeshByName("Paper_21");

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
    bordWhiteLoaded.material = clay;
    stageLoaded.material = clay;
    mountLoaded.material = clay;
    chairLoaded.material = clay;
    plant2Loaded.material = clay;
    plant1Loaded.material = clay;
    deskLoaded.material = clay;
    wallLoaded.material = clay;
    planeLoaded.material = clay;
    tribuneLoaded.material = clay;
    tribuneInstanceM.material = clay;
    tribuneInstanceR.material = clay;
    stageSpeakerMidLoaded.material = clay;
    stageSpeakerMid2Loaded.material = clay;
    stageSpeakerMid3Loaded.material = clay;
    topSpeakerLoaded.material = clay;
    seat1Loaded.material = clay;
    stairsLoaded.material = clay;
    ptzMountLoaded.material = clay;
    lecternLoaded.material = clay;
    micLoaded.material = clay;
    tvStandLoaded.material = clay;
    bordWhiteLoaded.material = clay;

    //PaperMaterial
    paper1Loaded.material = paper;
    paper2Loaded.material = paper;
    paper3Loaded.material = paper;
    paper4Loaded.material = paper;
    paper5Loaded.material = paper;
    paper6Loaded.material = paper;
    paper7Loaded.material = paper;
    paper8Loaded.material = paper;
    paper9Loaded.material = paper;
    paper10Loaded.material = paper;
    paper11Loaded.material = paper;
    paper12Loaded.material = paper;
    paper13Loaded.material = paper;
    paper14Loaded.material = paper;
    paper15Loaded.material = paper;
    paper16Loaded.material = paper;
    paper17Loaded.material = paper;
    paper18Loaded.material = paper;
    paper19Loaded.material = paper;
    paper20Loaded.material = paper;

    //Attach blue material
    laptopLoaded.material = clayBlue;
    bordBlueLoaded.material = clayBlue;
    controlLoaded.material = clayBlue;
    ptzLoaded.material = clayBlue;
    ptz2Loaded.material = clayBlue;
    projectorLoaded.material = clayBlue;
    tvBlueLoaded.material = clayBlue;
    frontFrameLoaded.material = clayBlue;

    //Attach screen material
    screenLoaded.material = newScreenMaterial;
    frontScreenLoaded.material = newScreenMaterial;

    //Attach Stage Wood material
    stageWoodLoaded.material = newFloorMaterial;

    //Attach Curtain material
    curtainLoaded.material = newCurtainMaterial;

    //Attach Speaker Grill material
    stageSpeakerGrillLoaded.material = newGrillMaterial;
    topSpeakerGrillLoaded.material = newGrillMaterial;
    stageSpeakerMidGrillLoaded.material = newGrillMaterial;
    stageSpeakerMidGrill2Loaded.material = newGrillMaterial;
    stageSpeakerMidGrill3Loaded.material = newGrillMaterial;

    ///SHADOWS + COLLISIONS

    //Generate shadows
    var shadowGenerator =  new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.getShadowMap().renderList = scene.meshes;
    shadowGenerator.useBlurCloseExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    light.shadowMinZ = 0;
    light.shadowMaxZ = 31;

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
    stageSpeakerMidLoaded.receiveShadows = true;
    stageSpeakerMid2Loaded.receiveShadows = true;
    stageSpeakerMid3Loaded.receiveShadows = true;
    stageSpeakerMidGrillLoaded.receiveShadows = true;
    stageSpeakerMidGrill2Loaded.receiveShadows = true;
    stageSpeakerMidGrill3Loaded.receiveShadows = true;
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
    frontFrameLoaded.receiveShadows = true;
    frontScreenLoaded.receiveShadows = true;

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
    stageSpeakerMidLoaded.checkCollisions = true;
    stageSpeakerMid2Loaded.checkCollisions = true;
    stageSpeakerMid3Loaded.checkCollisions = true;
    stageSpeakerMidGrillLoaded.checkCollisions = true;
    stageSpeakerMidGrill2Loaded.checkCollisions = true;
    stageSpeakerMidGrill3Loaded.checkCollisions = true;
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
    frontFrameLoaded.checkCollisions = true;
    frontScreenLoaded.checkCollisions = true;

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

    //Projector Tooltip 2
    let actionManagerProjectorAlt = new BABYLON.ActionManager(scene);
    bordBlueLoaded.actionManager = actionManagerProjectorAlt;

    actionManagerProjectorAlt.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Short Throw Projetor info");
        const event = new CustomEvent('hotspotAction', { detail: 'projector' });
        document.body.dispatchEvent(event);
    }));

    //Screen Tooltip
    let actionManagerTouch = new BABYLON.ActionManager(scene);
    screenLoaded.actionManager = actionManagerTouch;

    actionManagerTouch.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Screen info");
        const event = new CustomEvent('hotspotAction', { detail: 'touch' });
        document.body.dispatchEvent(event);
    }));

    //Screen Tooltip 2
    let actionManagerScreenAlt = new BABYLON.ActionManager(scene);
    frontFrameLoaded.actionManager = actionManagerScreenAlt;

    actionManagerScreenAlt.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Screen info");
        const event = new CustomEvent('hotspotAction', { detail: 'screen' });
        document.body.dispatchEvent(event);
    }));

    //Control Tooltip
    let actionManagerControl = new BABYLON.ActionManager(scene);
    controlLoaded.actionManager = actionManagerControl;

    actionManagerControl.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Controller info");
        const event = new CustomEvent('hotspotAction', { detail: 'ptz'});
        document.body.dispatchEvent(event);
    }));

    //PTZ Tooltip
    let actionManagerPtz = new BABYLON.ActionManager(scene);
    ptzLoaded.actionManager = actionManagerPtz;

    actionManagerPtz.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Controller info");
        const event = new CustomEvent('hotspotAction', { detail: 'ptz' });
        document.body.dispatchEvent(event);
    }));

    //PTZ Tooltip Alt
    let actionManagerPtzalt = new BABYLON.ActionManager(scene);
    ptz2Loaded.actionManager = actionManagerPtzalt;

    actionManagerPtzalt.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function(ev){
        // alert("Load Controller info");
        const event = new CustomEvent('hotspotAction', { detail: 'ptz' });
        document.body.dispatchEvent(event);
    }));
    
    engine.hideLoadingUI();
    window.camera = camera;

    //Add SSAO2
    var ssao = new BABYLON.SSAO2RenderingPipeline("ssao", scene, {
        ssaoRatio: 0.5, // Ratio of the SSAO post-process, in a lower resolution
        blurRatio: 1 // Ratio of the combine post-process (combines the SSAO and the scene)
    });
    ssao.radius = 2.95;
    ssao.totalStrength = 1.25;
    ssao.expensiveBlur = true;
    ssao.samples = 32;
    ssao.minZ = 5  ;
    ssao.maxZ = 60;
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

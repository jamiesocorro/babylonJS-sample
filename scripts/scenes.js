window.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("render-canvas");
    var engine = new BABYLON.Engine(canvas, true);
    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White;

        //create a box
        var box = BABYLON.Mesh.CreateBox("Box", 4.0, scene);

        //create a camera angle
        var camera = new BABYLON.ArcRotateCamera("arcCamera",
            BABYLON.Tools.ToRadians(45),
            BABYLON.Tools.ToRadians(45),
            10.0, box.position, scene);
        camera.attachControl(canvas, true);

        //add light
        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-5, 10, 5), scene);
        light.diffuse = new BABYLON.Color3(1, 0, 0);

        // add a function set light off spacebar
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: " " },
                function () {
                    light.setEnabled(!light.isEnabled());
                })
        );

        return scene;
    }

    var scene = createScene();
    var renderLoop = function () {
        scene.render();
    };
    engine.runRenderLoop(renderLoop);
});

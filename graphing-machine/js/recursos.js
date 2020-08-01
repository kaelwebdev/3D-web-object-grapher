/**
 * @author kaelwebdev / https://github.com/kaelwebdev
 */
var xposicion, yposicion, zposicion;
var xgiro, ygiro, zgiro;
var xescala, yescala, zescala;
var iLuz = 0

function textTure(ts, fw, fs, ff, c, t, x, y) {

    var canvas = document.createElement('canvas');
    canvas.width = ts; canvas.height = ts;
    var context = canvas.getContext('2d');
    context.font = fw + " " + fs + " " + ff;
    context.fillStyle = "rgba(" + c + ")";
    context.fillText(t, x, y);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
}

function twoPointsDistance(a, b) {//d = b-a
    return new THREE.Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
}
function modulo(a) {
    return Math.sqrt((a.x * a.x) + (a.y * a.y) + (a.z * a.z));
}
function unitario(a) {
    var m = modulo(a);
    return new THREE.Vector3((a.x / m), (a.y / m), (a.z / m));
}
function randomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
function parsePromtParams(string, flag) {
    value = string.split(flag);
    for (var i = 0; i < value.length; i++) {
        if (i != value.length - 1) value[i] = parseFloat(value[i]);
    };
    return value;
}
function imprimirObjetoJson(geometria) {
    var se = new THREE.GeometryExporter();
    var v = se.parse(geometria);
    console.log(JSON.stringify(v));
}

function crearCuboInterface() {

    var message = "ingrese datos Cubo:\n width,height,depth,widthSegments,heightSegments,depthSegments,color(HEX)";
    //var params = prompt(message,"w,h,d,ws,hs,ds,color");
    var params = prompt(message, "10,10,10,1,1,1,#FFFFFF");

    if (params) {

        var values = parsePromtParams(params, ",");
        var wCubo = values[0] || 10,
            hCubo = values[1] || 10,
            dCubo = values[2] || 10,
            wsCubo = values[3] || 1,
            hsCubo = values[4] || 1,
            dsCubo = values[5] || 1;
        var color = values[6] || randomHexColor();

        return crearCubo(wCubo, hCubo, dCubo, wsCubo, hsCubo, dsCubo, color);
    }
    return false;
}
function crearTexturaInicial() {
    THREE.ImageUtils.crossOrigin = '';
    inicialTextura = THREE.ImageUtils.loadTexture('img/rock.jpg');
    inicialTextura.minFilter = THREE.LinearMipMapNearestFilter;
    inicialTextura.magFilter = THREE.LinearFilter;
}
function crearCubo(a, b, c, d, e, f, color) {
    var geometria = new THREE.CubeGeometry(a, b, c, d, e, f);
    /*var material = new THREE.MeshBasicMaterial({
        color: color, wireframe: false
    });*/

    crearTexturaInicial();

    var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xFFFFFF,
        shininess: 20,
        emissive: color,
        map: inicialTextura, side: THREE.DoubleSide
        //shading: THREE.FlatShading 
    });
    var cubo = new THREE.Mesh(geometria, material);

    objetos.push(cubo);
    scene.add(cubo);

    var obj = {
        id: objetos.length - 1,
        name: "Cube | Obj " + objetos.length
    };

    console.log("Cubo " + obj.id);
    imprimirObjetoJson(geometria);

    return obj;
}
function crearCilindroInterface() {

    var message = "ingrese datos Cilindro:\n radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength,color(HEX)";
    var params = prompt(message, "5, 5, 20, 32");

    if (params) {

        var values = parsePromtParams(params, ",");
        var radTopCilindro = values[0] || 5,
            radBotCilindro = values[1] || 5,
            hCilindro = values[2] || 20,
            radSegCilindro = values[3] || 32,
            hSegCilindro = values[4] || 1,
            openEndedCilindro = values[5] || false,
            thetaStartCilindro = values[6] || 0,
            thetaLengthCilindro = values[7] || (2 * Math.PI);
        var color = values[8] || randomHexColor();

        return crearCilindro(radTopCilindro, radBotCilindro, hCilindro, radSegCilindro, hSegCilindro, openEndedCilindro, thetaStartCilindro,
            thetaLengthCilindro, color);
    }
    return false;
}

function crearCilindro(a, b, c, d, e, f, g, h, color) {
    var geometria = new THREE.CylinderGeometry(a, b, c, d, e, f, g, h);
    crearTexturaInicial();
    var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xFFFFFF,
        shininess: 20,
        emissive: color,
        map: inicialTextura, side: THREE.DoubleSide
    });
    var cilindro = new THREE.Mesh(geometria, material);
    objetos.push(cilindro);
    scene.add(cilindro);



    var obj = {
        id: objetos.length - 1,
        name: "Cilinder | Obj " + objetos.length
    };

    console.log("Cilindro " + obj.id);
    imprimirObjetoJson(geometria);

    return obj;
}
function crearEsferaInterface() {

    var message = "ingrese datos Esfera:\n radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength,color(HEX)";
    var params = prompt(message, "5, 32, 32");

    if (params) {

        var values = parsePromtParams(params, ",");
        var radEsfera = values[0] || 5,
            wSegEsfera = values[1] || 5,
            hSegmentsEsfera = values[2] || 32,
            phiStartEsfera = values[3] || 0,
            phiLengthEsfera = values[4] || (Math.PI * 2),
            thetaStartEsfera = values[5] || 0,
            thetaLengthEsfera = values[6] || (Math.PI * 2);
        var color = values[7] || randomHexColor();

        return crearEsfera(radEsfera, wSegEsfera, hSegmentsEsfera, phiStartEsfera, phiLengthEsfera, thetaStartEsfera,
            thetaLengthEsfera, color);
    }
    return false;
}
function crearEsfera(a, b, c, d, e, f, g, color) {
    var geometria = new THREE.SphereGeometry(a, b, c, d, e, f, g);
    crearTexturaInicial();
    var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xFFFFFF,
        shininess: 20,
        emissive: color,
        map: inicialTextura, side: THREE.DoubleSide
    });
    var esfera = new THREE.Mesh(geometria, material);
    objetos.push(esfera);
    scene.add(esfera);

    var obj = {
        id: objetos.length - 1,
        name: "Esfera | Obj " + objetos.length
    };

    console.log("esfera" + obj.id);
    imprimirObjetoJson(geometria);

    return obj;
}
function crearIcosaedroInterface() {

    var message = "ingrese datos Icosaedro:\n radius, detail,color(HEX)";
    //var params = prompt(message,"w,h,d,ws,hs,ds,color");
    var params = prompt(message, "1, 0");

    if (params) {

        var values = parsePromtParams(params, ",");
        var radiusIcosaedro = values[0] || 1,
            detailIcosaedro = values[1] || 0;
        var color = values[2] || randomHexColor();

        return crearIcosaedro(radiusIcosaedro, detailIcosaedro, color);
    }
    return false;
}
function crearIcosaedro(a, b, color) {
    var geometria = new THREE.IcosahedronGeometry(a, b);
    crearTexturaInicial();
    var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xFFFFFF,
        shininess: 20,
        emissive: color,
        map: inicialTextura, side: THREE.DoubleSide
    });
    var icosaedro = new THREE.Mesh(geometria, material);
    objetos.push(icosaedro);
    scene.add(icosaedro);

    var obj = {
        id: objetos.length - 1,
        name: "icosaedro | Obj " + objetos.length
    };

    console.log("icosaedro " + obj.id);
    imprimirObjetoJson(geometria);

    return obj;
}
function crearTorusInterface() {

    var message = "ingrese datos Torus:\n radius, tube, radialSegments, tubularSegments, arc,color(HEX)";
    //var params = prompt(message,"w,h,d,ws,hs,ds,color");
    var params = prompt(message, "10, 3, 16, 100,100");

    if (params) {

        var values = parsePromtParams(params, ",");
        var radiusTorus = values[0] || 10,
            tubeTorus = values[1] || 40,
            radialSegmentsTorus = values[2] || 8,
            tubularSegmentsTorus = values[3] || 6,
            arcTorus = values[4] || (Math.PI * 2);
        var color = values[5] || randomHexColor();

        return crearTorus(radiusTorus, tubeTorus, radialSegmentsTorus, tubularSegmentsTorus,
            arcTorus, color);
    }
    return false;
}
function crearTorus(a, b, c, d, e, color) {
    var geometria = new THREE.TorusGeometry(a, b, c, d, e);
    crearTexturaInicial();
    var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xFFFFFF,
        shininess: 20,
        emissive: color,
        map: inicialTextura, side: THREE.DoubleSide
        //shading: THREE.FlatShading 
    });
    var torus = new THREE.Mesh(geometria, material);
    objetos.push(torus);
    scene.add(torus);

    var obj = {
        id: objetos.length - 1,
        name: "Torus | Obj " + objetos.length
    };

    console.log("torus " + obj.id);
    imprimirObjetoJson(geometria);

    return obj;
}

function crearPlanoInterface() {

    var message = "ingrese datos Plano:\n width, height, widthSegments, heightSegments,color(HEX)";
    //var params = prompt(message,"w,h,d,ws,hs,ds,color");
    var params = prompt(message, "5, 20, 32 ");

    if (params) {

        var values = parsePromtParams(params, ",");
        var widthPlano = values[0] || 100,
            heightPlano = values[1] || 100,
            widthSegmentsPlano = values[2] || 1,
            heightSegmentsPlano = values[3] || 1;
        var color = values[4] || randomHexColor();

        return crearPlano(widthPlano, heightPlano, widthSegmentsPlano, heightSegmentsPlano, color);
    }
    return false;
}
function crearPlano(a, b, c, d, color) {
    var geometria = new THREE.PlaneGeometry(a, b);
    crearTexturaInicial();
    var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xFFFFFF,
        shininess: 20,
        emissive: color,
        map: inicialTextura, side: THREE.DoubleSide
        //shading: THREE.FlatShading 
    });
    var plano = new THREE.Mesh(geometria, material);
    objetos.push(plano);
    scene.add(plano);

    var obj = {
        id: objetos.length - 1,
        name: "Plano | Obj " + objetos.length
    };

    console.log("Plano " + obj.id);
    imprimirObjetoJson(geometria);

    return obj;
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function cambiarColor(red, green, blue) {
    var rgbconvertido = rgbToHex(red, green, blue);

    objetos[seleccionado].material.color.set(rgbconvertido);
    objetos[seleccionado].material.emissive.set(rgbconvertido);
    window.alert("cambiarcolor1");
}

function cambiarColor2(red, green, blue, red2, green2, blue2) {

    var rM = 0.5 * red + (1 - 0.5) * red2;
    rM = parseInt(rM);
    var gM = 0.5 * green + (1 - 0.5) * green2;
    gM = parseInt(gM);
    var bM = 0.5 * blue + (1 - 0.5) * blue2;
    bM = parseInt(bM);

    window.alert("nuevo color: " + rM + "," + gM + "," + bM);
    var rgbconvertido2 = rgbToHex(rM, gM, bM);

    objetos[seleccionado].material.color.set(rgbconvertido2);
    objetos[seleccionado].material.emissive.set(rgbconvertido2);

}

function cambiarTextura() {
    var figuraTextura;
    var figurarTT;
    if (selectTextura == 1) {
        figuraTextura = new THREE.ImageUtils.loadTexture('img/Chess.jpg');
        window.alert("ajedrez");
    } else if (selectTextura == 2) {
        figuraTextura = new THREE.ImageUtils.loadTexture('img/crate.gif');
        window.alert("madera");
    } else if (selectTextura == 3) {
        figuraTextura = new THREE.ImageUtils.loadTexture('img/rock.jpg');
        window.alert("roca");
    }
    console.log("funcion" + rXbox + "," + rYbox);
    if (selectTT == 1) {
        figuraTextura.wrapS = THREE.ClampToEdgeWrapping;
        window.alert("clamp");
        //  cuboTextura.wrapT= THREE.ClampToEdgeWrapping;

    } else if (selectTT == 2) {
        figuraTextura.wrapS = THREE.RepeatsWrapping;
        window.alert("repeat");
        // cuboTextura.wrapT= THREE.RepeatWrapping;
        figuraTextura.repeat.set(rX, rY);
    } else if (selectTT == 3) {
        figuraTextura.wrapS = THREE.MirroredRepeatWrapping;
        figuraTextura.repeat.set(rX, rY);
        window.alert("MirrorRepeat");
        // cuboTextura.wrapT= THREE.MirroredRepeatWrapping;
    }
    //console.debug("Seleccionado: "+seleccionado);
    objetos[seleccionado].material.map = figuraTextura;

}

function mover() {

    objetos[seleccionado].position.x = xposicion || 0;
    objetos[seleccionado].position.y = yposicion || 0;
    objetos[seleccionado].position.z = zposicion || 0;

}
function girar() {
    objetos[seleccionado].rotation.x = degToRad(xgiro) || 0;
    objetos[seleccionado].rotation.y = degToRad(ygiro) || 0;
    objetos[seleccionado].rotation.z = degToRad(zgiro) || 0;
}
function escalar() {
    objetos[seleccionado].scale.x = xescala || 1;
    objetos[seleccionado].scale.y = yescala || 1;
    objetos[seleccionado].scale.z = zescala || 1;
}
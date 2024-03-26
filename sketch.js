
var vida = 1;
var balas = 0;
var game_status = 0;
var enemigos_lista = ["geometry_rob", "calcuROB"];
function preload() {
    bob_caminando = loadAnimation("./sprites/sprite_00.png", "./sprites/sprite_01.png", "./sprites/sprite_02.png", "./sprites/sprite_03.png", "./sprites/sprite_04.png", "./sprites/sprite_05.png", "./sprites/sprite_06.png", "./sprites/sprite_07.png", "./sprites/sprite_08.png", "./sprites/sprite_09.png", "./sprites/sprite_10.png", "./sprites/sprite_11.png", "./sprites/sprite_12.png", "./sprites/sprite_13.png", "./sprites/sprite_14.png", "./sprites/sprite_15.png", "./sprites/sprite_16.png", "./sprites/sprite_17.png", "./sprites/sprite_18.png", "./sprites/sprite_19.png");
    bob_quieto = loadAnimation("./sprites/sprite_00.png", "./sprites/sprite_01.png", "./sprites/sprite_02.png", "./sprites/sprite_03.png", "./sprites/sprite_04.png", "./sprites/sprite_05.png");
    bob_corre = loadAnimation("./sprites/sprite_18.png", "./sprites/sprite_19.png")
    bob_salta = loadAnimation("./sprites/BOB saltando 0.png", "./sprites/BOB saltando 1.png", "sprites/BOB saltando 2.png", "./sprites/BOB saltando 3.png", "./sprites/BOB saltando 4.png")
    bob_atacando = loadAnimation("./sprites/BOB ATACANDO00.png","./sprites/BOB ATACANDO01.png","./sprites/BOB ATACANDO02.png","./sprites/BOB ATACANDO03.png","./sprites/BOB ATACANDO04.png","./sprites/BOB ATACANDO05.png","./sprites/BOB ATACANDO05.png","./sprites/BOB ATACANDO06.png","./sprites/BOB ATACANDO06.png","./sprites/BOB ATACANDO06.png","./sprites/BOB ATACANDO06.png","./sprites/BOB ATACANDO07.png","./sprites/BOB ATACANDO08.png","./sprites/BOB ATACANDO08.png","./sprites/BOB ATACANDO08.png","./sprites/BOB ATACANDO09.png","./sprites/BOB ATACANDO10.png","./sprites/BOB ATACANDO11.png","./sprites/BOB ATACANDO12.png");
    fondo = loadImage("backgroundforest.jpg");
    bosstierra_caminando = loadAnimation("./sprites/boss de tierra0.png", "./sprites/boss de tierra1.png")
    bosstierra_paracaidas = loadAnimation("./sprites/boss de tierra 3.00.png", "./sprites/boss de tierra 3.01.png", "./sprites/boss de tierra 3.02.png", "./sprites/boss de tierra 3.03.png", "./sprites/boss de tierra 3.04.png", "./sprites/boss de tierra 3.05.png", "./sprites/boss de tierra 3.06.png")
    geometry_rob_img = loadAnimation("./sprites/geometry_rob.png");
    rob_morir_img = loadAnimation("./sprites/muerte de un enemigo0.png", "./sprites/muerte de un enemigo1.png");
    calcuROB_IMG = loadAnimation("./sprites/calcuROB0.png", "./sprites/calcuROB1.png");
    islas_img = loadAnimation("./sprites/isla-1.png","./sprites/isla-1copia.png")
}
function setup() {
    createCanvas(windowWidth, windowHeight)
    fondo.resize(width, height);
    escena1 = createSprite(width * 0.5, height / 2, width, height);
    escena2 = createSprite(width * 1.5, height / 2, width, height);
    escena1.addImage(fondo);
    escena2.addImage(fondo);
    escena2.mirrorX(-1);
    bordes = createEdgeSprites();
    bob = createSprite(400, height * 0.80);
    bob.saltando = false;
    bob.addAnimation("caminar", bob_caminando);
    bob.addAnimation("correr", bob_corre);
    bob.addAnimation("quieto", bob_quieto);
    bob.addAnimation("saltar", bob_salta);
    bob.addAnimation("atacar", bob_atacando);
    suelo = createSprite(width * 0.5, height * 0.9, width, 10);
    suelo.visible = false;
    bob.debug = false;
    crearMenuPrincipal();
    boss_tierra_grupo = new Group()
    enemigos_grupo = new Group()
    /*for (let num_boss = 0; num_boss <= 4; num_boss++) {
        crearBoss("tierra")
    }*/
}
function draw() {
    drawSprites()
    bob.collide(suelo, dejardesaltar);
    bob.collide(bordes);
    bob.overlap(enemigos_grupo,destruir)
    bob.velocityY = 5;
    createEnemies()
    if (keyDown(LEFT_ARROW)) {
        bob.x = bob.x - 5;
        if (!bob.saltando) {
            bob.changeAnimation("correr");
            bob.mirrorX(-1);
        }
    }
    if (keyDown(RIGHT_ARROW)) {
        if (game_status == 1 && bob.x > width * 0.55) {
            moverEscena(escena1)
            moverEscena(escena2)
        } else {
            bob.x = bob.x + 5.5;
        }
        if (!bob.saltando) {
            bob.changeAnimation("correr");
            bob.mirrorX(1);
        }
    }
    if (keyWentDown(32) && !bob.saltando) {
        bob.changeAnimation("saltar");
        bob.velocityY = -100
        bob.saltando = true;
    }
    if (bob.getAnimationLabel() == "atacar" && bob.animation.getFrame() == bob.animation.getLastFrame()) {
        bob.changeAnimation("quieto")
        //bob.animation.frameDelay = 4
        //bob.animation.looping = true
    }
    if (!keyDown(LEFT_ARROW) && !keyDown(RIGHT_ARROW) && !bob.saltando) {
        bob.changeAnimation("quieto");
        escena1.velocityX = 0;
        escena2.velocityX = 0;
    }
    if(keyDown(90) || keyDown("z")){
        bob.changeAnimation("atacar");
        bob.animation.changeFrame(0)
        //bob.animation.frameDelay = 1
        //bob.animation.looping = false
    }
}
function moverEscena(imagen) {
    imagen.velocityX = -5;
    if (imagen.x <= -width * 0.5) {
        imagen.x = width * 1.5;
    }
}
function perderVida() {

}
function dejardesaltar(bob, suelo) {
    bob.saltando = false;
    bob.changeAnimation("quieto");
}
function crearMenuPrincipal() {
    menu = createDiv();
    menu.center()
    menu.id("menu");
    botones = createDiv();
    botones.id("botones");
    title = createImg("./sprites/title.png");
    btnStart = createImg("./sprites/btnStart.png");
    btnStart.parent("botones");
    btnStart.mouseClicked(start);
    btnSkins = createImg("./sprites/btnSkins.png");
    btnSkins.parent("botones");
    btnSponsor = createImg("./sprites/btnSponsor.png");
    btnSponsor.parent("botones");
    title.parent("menu");
    botones.parent("menu");
}
function start() {
    menu.hide();
    game_status = 1;
}
function crearBoss(tipo) {
    switch (tipo) {
        case "tierra":
            boss = createSprite(random(width * 0.4, -100))
            boss.addAnimation("paracaidas", bosstierra_paracaidas)
            boss.addAnimation("caminar", bosstierra_caminando)
            boss.velocityY = 2;
            boss.cayendo = true;
            boss_tierra_grupo.add(boss);
            break;

        default:
            break;
    }
}
function aterrizar_boss() {
    boss_tierra_grupo.forEach(element => {
        if (element.cayendo == true && element.isTouching(suelo)) {
            element.cayendo = false;
            element.changeAnimation()
        }
    });
}
function createEnemies() {
    if (game_status ===1 && frameCount % 55 == 0) {
        enemigo = createSprite(random(width * 0.85, width * 2.5), height * 0.85, 50, 50)
        tipo = random(enemigos_lista)
        enemigo.scale=2
        switch (tipo) {
            case "geometry_rob":
                enemigo.addAnimation("caminar", geometry_rob_img)
                enemigo.addAnimation("morir", rob_morir_img)
                break;
            case "among_us":

                break;
            case "calcuROB":
                enemigo.addAnimation("caminar", calcuROB_IMG)
                break;

            default:
                break;
        }
        enemigo.velocityX = random(-5, -10);
        enemigos_grupo.add(enemigo)
    }
}
function destruir(bob,enemigo){
    if (bob.getAnimationLabel() != "quieto"){
        enemigo.destroy()
    }
}
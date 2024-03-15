
var vida = 1;
var balas = 0;
var game_status = 0;
function preload() {
    bob_caminando = loadAnimation("./sprites/sprite_00.png", "./sprites/sprite_01.png", "./sprites/sprite_02.png", "./sprites/sprite_03.png", "./sprites/sprite_04.png", "./sprites/sprite_05.png", "./sprites/sprite_06.png", "./sprites/sprite_07.png", "./sprites/sprite_08.png", "./sprites/sprite_09.png", "./sprites/sprite_10.png", "./sprites/sprite_11.png", "./sprites/sprite_12.png", "./sprites/sprite_13.png", "./sprites/sprite_14.png", "./sprites/sprite_15.png", "./sprites/sprite_16.png", "./sprites/sprite_17.png", "./sprites/sprite_18.png", "./sprites/sprite_19.png");
    bob_quieto = loadAnimation("./sprites/sprite_00.png", "./sprites/sprite_01.png", "./sprites/sprite_02.png", "./sprites/sprite_03.png", "./sprites/sprite_04.png", "./sprites/sprite_05.png");
    bob_corre = loadAnimation("./sprites/sprite_18.png", "./sprites/sprite_19.png")
    bob_salta = loadAnimation("./sprites/BOB saltando 0.png", "./sprites/BOB saltando 1.png", "sprites/BOB saltando 2.png", "./sprites/BOB saltando 3.png", "./sprites/BOB saltando 4.png")
    bob_aceituna = loadAnimation();
    fondo = loadImage("backgroundforest.jpg");
}
function setup() {
    createCanvas(windowWidth, windowHeight)
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
    bob.addAnimation("aceituna", bob_aceituna);
    suelo = createSprite(width * 0.5, height * 0.95, width, 10);
    suelo.visible = false;
    bob.debug = false;
    crearMenuPrincipal();
}
function draw() {
    drawSprites()
    bob.velocityY = 5;
    bob.collide(suelo, dejardesaltar);
    bob.collide(bordes);
    if (keyDown(LEFT_ARROW)) {
        bob.x = bob.x - 5;
        bob.changeAnimation("correr");
        bob.mirrorX(-1);
    }
    if (keyDown(RIGHT_ARROW)) {
        if (game_status == 1 && bob.x > width * 5.5) {
            moverEscena(escena1)
            moverEscena(escena2)
        } else {
            bob.x = bob.x + 5.5;
        }
        bob.changeAnimation("correr");
        bob.mirrorX(1);
    }
    if (keyWentDown(32) && !bob.saltando) {
        bob.changeAnimation("saltar");
        bob.velocityY = -100
        bob.saltando = true;
    }
    if (!keyDown(LEFT_ARROW) && !keyDown(RIGHT_ARROW)) {
        bob.changeAnimation("quieto");
        escena1.velocityX = 0;
        escena2.velocityX = 0;
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
function crearMenuPrincipal(){
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
    game_status=1;
}
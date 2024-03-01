function preload() {
    bob_caminando = loadAnimation("./sprites/sprite_00.png", "./sprites/sprite_01.png", "./sprites/sprite_02.png", "./sprites/sprite_03.png", "./sprites/sprite_04.png", "./sprites/sprite_05.png", "./sprites/sprite_06.png", "./sprites/sprite_07.png", "./sprites/sprite_08.png", "./sprites/sprite_09.png", "./sprites/sprite_10.png", "./sprites/sprite_11.png", "./sprites/sprite_12.png", "./sprites/sprite_13.png", "./sprites/sprite_14.png", "./sprites/sprite_15.png", "./sprites/sprite_16.png", "./sprites/sprite_17.png", "./sprites/sprite_18.png", "./sprites/sprite_19.png");
    bob_quieto = loadAnimation("./sprites/sprite_00.png", "./sprites/sprite_01.png", "./sprites/sprite_02.png", "./sprites/sprite_03.png", "./sprites/sprite_04.png", "./sprites/sprite_05.png");
    bob_corre = loadAnimation("./sprites/sprite_18.png", "sprites/sprite_19.png")
    bob_salta = loadAnimation("sprites/BOB saltando 0.png", "sprites/BOB saltando 1.png", "sprites/BOB saltando 2.png", "sprites/BOB saltando 3.png", "sprites/BOB saltando 4.png")

    fondo = loadImage("backgroundforest.jpg");
}
function setup() {
    createCanvas(windowWidth, windowHeight)
    bob = createSprite(400, height * 0.80);
    bob.addAnimation("caminar", bob_caminando);
    bob.addAnimation("correr", bob_corre);
    bob.addAnimation("quieto", bob_quieto);
    bob.addAnimation("saltar", bob_salta);
}
function draw() {
    image(fondo, 0, 0, width, height);
    drawSprites()
    if (keyDown(LEFT_ARROW)) {
        bob.x = bob.x - 5;
        bob.changeAnimation("correr");
        bob.mirrorX(-1);
    }
    if (keyDown(RIGHT_ARROW)) {
        bob.x = bob.x + 10;
        bob.changeAnimation("correr");
        bob.mirrorX(1);
    }
    if (keyDown(32)) {
        bob.changeAnimation("saltar");
        bob.velocityY = -5
    }
    if (!keyDown(LEFT_ARROW) && !keyDown(RIGHT_ARROW)) {
        bob.changeAnimation("quieto");
    }
}
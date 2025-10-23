
var vida = 1;
var balas = 0;
var game_status = 0;
var enemigos_lista = ["geometry_rob", "calcuROB", "avion_rob"];
var corazones = 3;
var velocidades_avion = [-10, -7, -5, -3, 4, 6, 8, 10, 12]
var noMusic = false;
var perdiste = false;
var fondos = [];
var arbustos = [];
var scrollSpeed = 5;
function preload() {
    bob_caminando = loadAnimation("./sprites/sprite_00.png", "./sprites/sprite_01.png", "./sprites/sprite_02.png", "./sprites/sprite_03.png", "./sprites/sprite_04.png", "./sprites/sprite_05.png", "./sprites/sprite_06.png", "./sprites/sprite_07.png", "./sprites/sprite_08.png", "./sprites/sprite_09.png", "./sprites/sprite_10.png", "./sprites/sprite_11.png", "./sprites/sprite_12.png", "./sprites/sprite_13.png", "./sprites/sprite_14.png", "./sprites/sprite_15.png", "./sprites/sprite_16.png", "./sprites/sprite_17.png", "./sprites/sprite_18.png", "./sprites/sprite_19.png");
    bob_quieto = loadAnimation("./sprites/sprite_00.png", "./sprites/sprite_01.png", "./sprites/sprite_02.png", "./sprites/sprite_03.png", "./sprites/sprite_04.png", "./sprites/sprite_05.png");
    bob_corre = loadAnimation("./sprites/sprite_18.png", "./sprites/sprite_19.png")
    bob_salta = loadAnimation("./sprites/BOB saltando 0.png", "./sprites/BOB saltando 1.png", "sprites/BOB saltando 2.png", "./sprites/BOB saltando 3.png", "./sprites/BOB saltando 4.png")
    //bob_atacando = loadAnimation("./sprites/BOB ATACANDO00.png", "./sprites/BOB ATACANDO01.png", "./sprites/BOB ATACANDO02.png", "./sprites/BOB ATACANDO03.png", "./sprites/BOB ATACANDO04.png", "./sprites/BOB ATACANDO05.png", "./sprites/BOB ATACANDO05.png", "./sprites/BOB ATACANDO06.png", "./sprites/BOB ATACANDO06.png", "./sprites/BOB ATACANDO06.png", "./sprites/BOB ATACANDO06.png", "./sprites/BOB ATACANDO07.png", "./sprites/BOB ATACANDO08.png", "./sprites/BOB ATACANDO08.png", "./sprites/BOB ATACANDO08.png", "./sprites/BOB ATACANDO09.png", "./sprites/BOB ATACANDO10.png", "./sprites/BOB ATACANDO11.png", "./sprites/BOB ATACANDO12.png");
    bob_gameover = loadAnimation("./sprites/game oVer00.png", "./sprites/game oVer01.png", "./sprites/game oVer02.png", "./sprites/game oVer03.png", "./sprites/game oVer04.png", "./sprites/game oVer05.png", "./sprites/game oVer06.png", "./sprites/game oVer07.png", "./sprites/game oVer08.png", "./sprites/game oVer09.png", "./sprites/game oVer10.png", "./sprites/game oVer11.png");
    fondo = loadImage("backgroundforest.jpg");
    arbustosImg = loadImage("./sprites/backgroundarbustos.png");
    bosstierra_caminando = loadAnimation("./sprites/boss de tierra0.png", "./sprites/boss de tierra1.png")
    bosstierra_paracaidas = loadAnimation("./sprites/boss de tierra 3.00.png", "./sprites/boss de tierra 3.01.png", "./sprites/boss de tierra 3.02.png", "./sprites/boss de tierra 3.03.png", "./sprites/boss de tierra 3.04.png", "./sprites/boss de tierra 3.05.png", "./sprites/boss de tierra 3.06.png")
    geometry_rob_img = loadAnimation("./sprites/geometry_rob.png");
    avion_img = loadAnimation("./sprites/avion0.png", "./sprites/avion1.png", "./sprites/avion2.png", "./sprites/avion3.png");
    avion_explosion_img = loadAnimation("./sprites/avion4.png", "./sprites/avion5.png");
    rob_morir_img = loadAnimation("./sprites/muerte de un enemigo0.png", "./sprites/muerte de un enemigo1.png");
    calcuROB_IMG = loadAnimation("./sprites/calcuROB0.png", "./sprites/calcuROB1.png");
    islas_img = loadAnimation("./sprites/isla-1.png", "./sprites/isla-1copia.png")
    corazon_img = loadAnimation("./sprites/corazon0.png", "./sprites/corazon1.png");
    curacion_img = loadAnimation("./sprites/curacion_un_corazon.png");
    islas_img = loadAnimation("./sprites/isla-1.png", "./sprites/isla-1copia.png");
    btnStartImg = loadImage("./sprites/btnStart.png");
    btnSkinsImg = loadImage("./sprites/btnSkins.png");
    btnSponsorImg = loadImage("./sprites/btnSponsor.png");
    musica = loadSound("musica.mp3")

}
function setup() {
    createCanvas(windowWidth, windowHeight)
    fondo.resize(width, height);
    arbustosImg.resize(width, height);
    for (let i = 0; i < 2; i++) {
        const x = width * i + width / 2;
        const f = createSprite(x, height / 2);
        f.addImage(fondo);
        f.depth = 1;
        if (i === 1) {
            f.mirrorX(-1);
        }
        fondos.push(f);

        const a = createSprite(x, height / 2);
        a.addImage(arbustosImg);
        a.depth = 3;
        if (i === 1) {
            a.mirrorX(-1);
        }
        arbustos.push(a);
    }

    bordes = createEdgeSprites();
    bob = createSprite(400, height * 0.80);
    bob.saltando = false;
    bob.atacando = false;
    bob.addAnimation("caminar", bob_caminando);
    bob.addAnimation("correr", bob_corre);
    bob.addAnimation("quieto", bob_quieto);
    bob.addAnimation("saltar", bob_salta);
    //bob.addAnimation("atacar", bob_atacando);
    bob.addAnimation("gameover", bob_gameover);
    suelo = createSprite(width * 0.5, height * 0.9, width, 10);
    suelo.visible = false;
    bob.debug = 0;
    crearMenuPrincipal();
    boss_tierra_grupo = new Group()
    enemigos_grupo = new Group()
    vidas = new Group()
    for (let i = 0; i < corazones; i++) {
        crearCorazon(i)
    }
    islas_grupo = new Group()
    //curacionrandom = Math.round(random(0,3))
    for (let num_islas = 0; num_islas <= 4; num_islas++) {
        xrandom = random(width, width * 2)
        plataforma = createSprite(xrandom, random(height * 0.5, height * 0.75))
        //plataforma.distancia = escena2.x - xrandom;
        plataforma.addAnimation("isla", islas_img)
        plataforma.debug = 0
        plataforma.depth = 6
        plataforma.setCollider("rectangle", 0, 30, 100, 30)
        islas_grupo.add(plataforma)
        /*       if(num_islas == curacionrandom){
                   curacion = createSprite(plataforma.x,plataforma.y-20)
                   curacion.addImage(curacion_img)
               }*/
    }
    bob.depth=2;
}
function draw() {
    if (game_status == 1 && !musica.isPlaying() && noMusic == false) {
        musica.play()
        musica.setVolume(0.1)
    }
    drawSprites()
    createEnemies()
    enemigos_grupo.collide(suelo, explotar);
    bob.collide(suelo, dejardesaltar);
    bob.collide(bordes);
    bob.overlap(enemigos_grupo, destruir);
    bob.collide(islas_grupo, dejardesaltar);
    bob.overlap(btnStart, start);
    bob.overlap(btnSponsor, mostrarSponsors);
    if (perdiste == false) {
        bob.velocityY = 5;
        if (keyDown(LEFT_ARROW)) {
            bob.x = bob.x - 5;
            if (!bob.saltando) {
                bob.changeAnimation("correr");
                bob.mirrorX(-1);
            }
        }
        if (keyDown(RIGHT_ARROW)) {
            if (game_status == 1 && bob.x >= width * 0.5) {
                moverEscena(fondos)
                moverEscena(arbustos)
                //moverEscena(islas_grupo)
                enemigos_grupo.forEach(enemigo => {
                    if (!enemigo.tipo == "avion_rob" && enemigo.velocityX < 0) {
                        enemigo.velocityX = random(-10, -15)
                    }
                });
            } else {
                bob.x = bob.x + 5.5;
                enemigos_grupo.forEach(enemigo => {
                    if (!enemigo.tipo == "avion_rob" && enemigo.velocityX < 0) {
                        enemigo.velocityX = random(-5, -10)
                    }
                });
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
        if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !bob.saltando && !bob.atacando) {
            bob.changeAnimation("quieto");
        }
        /*if (keyWentDown("z") && !bob.atacando) {
            bob.atacando = true
            bob.changeAnimation("atacar");
            bob.animation.changeFrame(0)
        }*/
        if (bob.getAnimationLabel() == "atacar" && bob.animation.getFrame() == bob.animation.getLastFrame()) {
            bob.atacando = false
            bob.saltando = false;

        }
        moverIslas()
        aterrizar()
    }
    else {
        enemigos_grupo.setVelocityXEach = 0
    }
}
function moverEscena(objeto) {
    if (objeto.length < 2) return;
    objeto.forEach(f => (f.position.x -= scrollSpeed));
    primero = objeto[0];
    segundo = objeto[1];
    if(primero.position.x <= -width/2){
        primero.position.x = segundo.position.x + width;
        objeto.push(objeto.shift())
    }
    
}
function moverIslas() {
    islas_grupo.forEach(isla => {
        //isla.x = escena2.x - isla.distancia
    })
}
function perderVida() {
    corazones = corazones - 0.5
    if (vidas.length > 0) {
        if (corazones % 1 == 0) {
            vidas[corazones].destroy()
        } else if (vidas[corazones - 0.5]) {
            vidas[corazones - 0.5].animation.changeFrame(1)
        }
        if (vidas.length == 0) {
            bob.changeAnimation("gameover")
            bob.scale = 2
            bob.lifetime = 45
            musica.stop()
            noMusic = true
            perdiste = true
        }
    }
}
function dejardesaltar(bob, suelo) {
    if (!bob.atacando) {
        bob.changeAnimation("quieto");
    }
    bob.saltando = false;
}
function crearMenuPrincipal() {
    menu = createDiv();
    menu.center()
    menu.id("menu");
    title = createImg("./sprites/title.png");
    btnStart = createSprite(width * 0.3, height * 0.80 - 150);
    btnStart.addImage(btnStartImg)
    btnSponsor = createSprite(width * 0.7, height * 0.8 - 150);
    btnSponsor.addImage(btnSponsorImg)
    title.parent("menu");
}
function start() {
    menu.hide();
    btnStart.destroy()
    btnSponsor.destroy()
    game_status = 1;
}
function mostrarSponsors() {
    menu.hide();
    document.getElementById("info").style.display = "block"
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
function crearCorazon(i) {
    corazon = createSprite(width * 0.4 + (i * 50), 100)
    corazon.addAnimation("corazon", corazon_img)
    corazon.pause()
    vidas.add(corazon);
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
    if (game_status === 1 && frameCount % 55 == 0) {
        enemigo = createSprite(random(width * 0.85, width * 2.5), height * 0.85, 50, 50)
        enemigo.depth = 2
        tipo = random(enemigos_lista)
        enemigo.scale = 2
        enemigo.velocityX = random(-5, -10);
        enemigo.tipo = tipo
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
            case "avion_rob":
                enemigo.addAnimation("caminar", avion_img)
                enemigo.addAnimation("explotar", avion_explosion_img)
                enemigo.y = random(height * 0.4, height * 0.52)
                enemigo.scale = 0.6
                enemigo.scale = 0.5
                enemigo.tiempo = 0
                enemigo.aterrizando = false
                enemigo.velocityX = random(velocidades_avion);
                if (enemigo.velocityX > 0) {
                    enemigo.x = 0
                    enemigo.mirrorX(-1)
                }
                break;

            default:
                break;
        }
        enemigos_grupo.add(enemigo)
    }
}
function destruir(bob, enemigo) {
    if (enemigo.tipo == "avion_rob") {
        perderVida()
        explotar(enemigo, bob)
    }
    else if (bob.getAnimationLabel() != "quieto") {
        enemigo.destroy()
    } else {
        perderVida()
        enemigo.destroy()
    }
}
function aterrizar() {
    enemigos_grupo.forEach(enemigo => {
        if (enemigo.tipo == "avion_rob") {
            enemigo.tiempo = enemigo.tiempo + 1
            if (!enemigo.aterrizando && enemigo.tiempo >= 130) {
                enemigo.velocityY = random(2, 10)
                enemigo.aterrizando = true
            }
        }
    });
}
function explotar(enemigo, suelo) {
    if (enemigo.tipo == "avion_rob") {
        enemigo.changeAnimation("explotar")
        enemigo.velocityX = 0
        enemigo.lifetime = 40
        enemigo.depth = 10
    }
}
function cerrarCreditos() {
    menu.show();
    document.getElementById("info").style.display = "none"
}
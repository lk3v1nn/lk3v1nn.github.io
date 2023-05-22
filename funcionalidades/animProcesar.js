
function animEntrada(){
    let tl = gsap.timeline({
        // duration: 2,
        repeat: 0,
    });

    tl.from('header', {
        // opacity: 0,    
        duration: 5,
        // y: '-10%',
        ease: "elastic",
        rotate: -90,
    });

    gsap.from('.seccionBotones, .seccionTxt, .seccionRecursividadIzquierda', {
        duration: 3,
        x:  '-20vw',
        delay: 0,
        ease: "power4.out",
        rotate: 25,
    });

    gsap.from('.seccionTablas',{
    duration: 3,
    x:  '-20vw',
    delay: 0,
    ease: "power4.out",
    rotate: -25,
    });
   
}

function MostrarSecciones(){
    document.querySelector('.seccionTablas').style.display = "inline-block";
    document.querySelector('.seccionRecursividadIzquierda').style.display = 'inline-block';
}

function OcultarSecciones(){
    document.querySelector('.seccionTablas').style.display = "none";
    document.querySelector('.seccionRecursividadIzquierda').style.display = 'none';
}
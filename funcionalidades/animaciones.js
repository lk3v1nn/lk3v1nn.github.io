function animEntrada(){
    gsap.from('#tabla1, #tabla2',{
    duration: 1.6,
    x:  -1000,
    delay: 0,
    ease: "bounce.out",
    rotate: -45,
    });
    console.log('Animacion');

    gsap.from('#tabla3',{
    duration: 1.6,
    x:  1000,
    delay: 0,
    ease: "bounce.out",
    rotate: 45,
    });
    console.log('Animacion');

    gsap.from('img',{
        duration: 1.6,
        y:  -1000,
        ease: "bounce.out",
        rotate: 90,
        });
        console.log('Animacion');

}
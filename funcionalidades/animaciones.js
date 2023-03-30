function animEntrada(){
    gsap.from('#tabla1, #tabla2',{
    duration: 2.5,
    x:  '-20vw',
    delay: 0,
    ease: "power4.out",
    rotate: -45,
    });
    console.log('Animacion');

    gsap.from('#tabla3',{
    duration: 2.5,
    x:  '20vw',
    delay: 0,
    ease: "power4.out",
    rotate: 45,
    });
    console.log('Animacion');

    gsap.to('#img1',{
        yoyo: true,
        duration: 2,
        y:  '-50vw',
        ease: "bounce.out",
        rotate: 90,
        });
        console.log('Animacion');
    
    gsap.from('#img2',{
    duration: 2,
    y:  '-50vw',
    ease: "bounce.out",
    rotate: 90,
    });
    console.log('Animacion');
}
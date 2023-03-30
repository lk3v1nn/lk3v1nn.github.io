
function animEntrada(){
    let tl = gsap.timeline({
        repeat: 0,
    });

    tl.from('.areaParaArrastrar', {
    duration: 2,
    y: '-100%',
    ease: "elastic",
    rotate: -90,
    });

    gsap.from('#tabla1, #tabla2',{
    duration: 2.8,
    x:  '-20vw',
    delay: 0,
    ease: "power4.out",
    rotate: -45,
    });
    console.log('Animacion');

    gsap.from('#tabla3',{
    duration: 2.8,
    x:  '20vw',
    delay: 0,
    ease: "power4.out",
    rotate: 45,
    });
    console.log('Animacion');

    gsap.to('#img1',{
        duration: 2.5,
        y:  '-50vw',
        ease: "bounce.out",
        rotate: 90,
        });

    gsap.to('#img2',{
        display: 'block',
    });
    
    gsap.from('#img2',{
        display: 'block',
        duration: 2,
        y:  '-50vw',
        ease: "elastic",
        rotate: 90,
    });
}
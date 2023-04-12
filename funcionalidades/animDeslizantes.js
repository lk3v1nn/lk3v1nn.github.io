gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'none', duration: 2 });    

const tl = gsap.timeline();

    // tl.from('.seccion1',{ x: '-100%' });
    tl.from('.seccion2',{ x: '-100%' });
    tl.from('.seccion3',{ x: '100%' });
    tl.from('.seccion4',{ y: '-100%' });

// ScrollTrigger.create({
//     Animation: tl,
//     trigger: '.secciones',
//     markers: true,
//     start: 'top top',
//     end: '+=2000px',
//     // pin: true,
// });


//gsap.registerPlugin(ScrollTrigger);


gsap.defaults({ ease: 'none', duration: 2 });    

const tl = gsap.timeline();


    tl.from('.seccion1',{ x: '-100%' });
    tl.from('.seccion2',{ x: '100%' });
    tl.from('.seccion3',{ y: '-100%' });



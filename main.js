import './style.css'

import { startRender } from './render.js'


console.log('asdasfsaf')
function openStats(summoner){
    const start = document.getElementById('start')
    const stats = document.getElementById('stats')
    const summonerHello = document.createElement('h1')

    start.style.display = 'none'
    stats.style.display = 'flex'
    summonerHello.innerText = `Hello ${summoner}` 

    stats.prepend(summonerHello)
    loadStats(summoner.replaceAll(' ','').toLowerCase())
}


async function loadStats(summoner){
    await startRender(summoner)
    startListeners()
    
}

function startListeners(){


    //const highDamage = document.getElementById('highestDmgDealt')
    const statsDivs = document.getElementsByClassName('single-stat')
    
    
    for (const div of statsDivs){
        const carouselButtons = div.querySelectorAll(".carousel-button");
        const singleStatCarousel = div.querySelectorAll(".single-stat-carousel")[0];
        const allStatCarousels = div.querySelectorAll(".single-stat-carousel");
        carouselButtons.forEach((el, i) => {
            el.addEventListener("click", () => {
                if(el.classList.contains('carousel-before')){
                    const currentTranslate = singleStatCarousel.style.transform
                    if(currentTranslate == 'translateX(-33%)' || !currentTranslate){
                        singleStatCarousel.style.transform = "translateX(0px)"
                    }else if(currentTranslate == "translateX(0px)" ){
                        singleStatCarousel.style.transform = "translateX(33%)"
                    }
                    console.log('clicked before')
                    console.log( singleStatCarousel.style.transform)
                    
                }else{
                    console.log('clicked after')
                    const currentTranslate = singleStatCarousel.style.transform
                    if(currentTranslate == 'translateX(33%)' || !currentTranslate){
                        singleStatCarousel.style.transform = "translateX(0px)"
                    }else if(currentTranslate == "translateX(0px)" ){
                        singleStatCarousel.style.transform = "translateX(-33%)"
                    }
                }
            });
        });

        allStatCarousels.forEach((el) =>{
            const singleGamesList = el.querySelectorAll('.single-game')
            //console.log(singleGamesList)
            singleGamesList.forEach((el, i) => {
                el.addEventListener('mouseover', ()=>{
                    el.getElementsByClassName('single-game-info')[0].style.transform = 'translateY(0px)'
                })
                el.addEventListener('mouseout', ()=>{
                    el.getElementsByClassName('single-game-info')[0].style.transform = 'translateY(50rem)'
                })
            })
        })
    }
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            console.log(entry.target.id)
        } else {
        //entry.target.classList.remove('show')
        }
    })
    })

    const sections = document.querySelectorAll('.single-stat')
    sections.forEach((el)=> observer.observe(el))

}
const summonerSelects = document.querySelectorAll(".summoner-select");

summonerSelects.forEach((el) => {
    el.addEventListener("click", () => {
        openStats(el.innerText)
    });
});



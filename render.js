import {
  getAllChampsInfoDDragon,
  getChampName,
  getSpellImg,
  getChampImg,
  generateHistoryLink,
  generateStatText,
  getChampImgSmall,
  getSummonerSpellsDDragon,
  getSummonerSpellImage,
  gameModesTranslator
} from './utils'
import allStats from './all.json'

let  dDragon = {}
let  itemsDDragon = {}





function appendChampionStats(type, parent, stats){
  const container = document.createElement('div'); container.classList.add('stats-item-row')

  const containerTitle = document.createElement('div'); containerTitle.classList.add('stat-title')
  containerTitle.innerText = type == 'enemies' ? 'Best and worst enemies' : 'Best and worst allies'
  //container.appendChild(containerTitle)

  const one = document.createElement('div'); one.classList.add('champ-stats-container')
  const two = document.createElement('div'); two.classList.add('champ-stats-container')

  const oneTitle = document.createElement('div'); //winTitle.classList.add('champ-stats-container')
  const twoTitle = document.createElement('div'); //loseTitle.classList.add('champ-stats-container')

  oneTitle.innerText = type == 'enemies' ? 'Most wins vs' : 'Most wins with'
  twoTitle.innerText = type == 'enemies' ? 'Most losses vs' : 'Most losses with'
  one.appendChild(oneTitle)
  two.appendChild(twoTitle)


  for (const [key, value] of Object.entries(stats[type])){


    for (const [champ, info] of Object.entries(value)){
      const singleChampContainer = document.createElement('div'); singleChampContainer.classList.add('champ-stats-single-row')
      const singleChampText = document.createElement('div');
      const singleChampImage = document.createElement('img');
      singleChampImage.src = getChampImgSmall(dDragon, info.champ)


      if (key == 'good'){
        singleChampText.innerText = `Winrate: ${(info.winPer*100).toFixed()}% (Win:${info.win}/Lose:${info.lose})`
        singleChampContainer.append(singleChampImage, singleChampText)
        one.append(singleChampContainer)
      }else{
        singleChampText.innerText = `Winrate: ${(info.winPer*100).toFixed()}% (Win:${info.win}/Lose:${info.lose})`
        singleChampContainer.append(singleChampImage, singleChampText)
        two.append(singleChampContainer)
      }
    }
    container.append(one, two)
    parent.append(containerTitle, container)
    
  }
}


async function createGeneralStats(stats){
  console.log(stats)

  const generalStats = document.getElementById('general-stats')

  const summonerSpellStats = document.createElement('div'); summonerSpellStats.classList.add('general-stats-item')
  const champSpellStats = document.createElement('div'); champSpellStats.classList.add('general-stats-item')
  const gameModesCounterStats = document.createElement('div'); gameModesCounterStats.classList.add('general-stats-item')

  const enemyChampionStatsVs = document.createElement('div'); enemyChampionStatsVs.classList.add('general-stats-item')
  const enemyChampionStatsWith = document.createElement('div'); enemyChampionStatsWith.classList.add('general-stats-item')
  const allyChampionStatsVs = document.createElement('div'); allyChampionStatsVs.classList.add('general-stats-item')
  const allyChampionStatsWith = document.createElement('div'); allyChampionStatsWith.classList.add('general-stats-item')


  const summonerSpellStatsTitle = document.createElement('div'); summonerSpellStatsTitle.classList.add('game-mode-counter')
  summonerSpellStatsTitle.innerText = "Your most used summoner spells this year"
  summonerSpellStats.appendChild(summonerSpellStatsTitle)

  const champSpellStatsTitle = document.createElement('div'); champSpellStatsTitle.classList.add('game-mode-counter')
  champSpellStatsTitle.innerText = "Your most used champion spells this year"
  champSpellStats.appendChild(champSpellStatsTitle)

  const gameModesCounterStatsTitle = document.createElement('div'); gameModesCounterStatsTitle.classList.add('game-mode-counter')
  gameModesCounterStatsTitle.innerText = "Games played this year"
  gameModesCounterStats.appendChild(gameModesCounterStatsTitle)


  for (const stat of stats.summonerSpells){
    const summonerSpellSingleStat = document.createElement('div'); summonerSpellSingleStat.classList.add('summoner-spell-single-stat')
    

    const span1 = document.createElement('span');
    span1.innerText = "You have used "

    const summonerSpellSingleStatImg = document.createElement('img');
    summonerSpellSingleStatImg.src = getSummonerSpellImage(stat.spell, itemsDDragon)

    const span2 = document.createElement('span');
    span2.innerText = `${stat.count} times`

    summonerSpellSingleStat.append(span1, summonerSpellSingleStatImg, span2)
    summonerSpellStats.appendChild(summonerSpellSingleStat)
  }


  for (const [rank, info] of Object.entries(stats.spellsCounter)){

    const championSpellCounter =  document.createElement('div'); championSpellCounter.classList.add('champion-spell-single-stat')

    const number = document.createElement('span');
    number.innerText = `${rank}: ${info.champ}`

    const spellImageContainer = document.createElement('div'); spellImageContainer.classList.add('champion-spell-spell-image-container')

    const spellImage = document.createElement('img');
    spellImage.src = getSpellImg(info.champ+info.spell)
    const spellKey = document.createElement('span');
    spellKey.innerText = `${info.spell}`


    const span2 = document.createElement('span');
    span2.innerText = `${info.count} times`

    spellImageContainer.append(spellImage, spellKey)
    championSpellCounter.append(number, spellImageContainer, span2)
    champSpellStats.appendChild(championSpellCounter)

  }

  for (const [mode, counter] of  Object.entries(stats.gameModeWinCounter)){
    const gameModeCounter = document.createElement('div'); gameModeCounter.classList.add('game-mode-counter')
    gameModeCounter.innerText = `${gameModesTranslator[mode]} games total: ${counter.win + counter.lose}`

    const winLoseContainer = document.createElement('div'); winLoseContainer.classList.add('game-mode-counter-span-container')

    const winSpan = document.createElement('span'); winSpan.classList.add('game-mode-counter-span'); winSpan.classList.add('span-win')
    const loseSpan = document.createElement('span'); loseSpan.classList.add('game-mode-counter-span'); loseSpan.classList.add('span-lose')
    
    winSpan.innerText = `Wins: ${counter.win}`
    loseSpan.innerText = `Loses: ${counter.lose}`

    winLoseContainer.append(winSpan, loseSpan)

    gameModesCounterStats.append(gameModeCounter, winLoseContainer)
  }




  appendChampionStats('enemies', enemyChampionStatsVs, stats)

  appendChampionStats('teammates', allyChampionStatsVs, stats)



  generalStats.append(summonerSpellStats, champSpellStats, gameModesCounterStats, enemyChampionStatsVs,  allyChampionStatsVs)

}

function reRenderLargeStats(newGameMode, id, stats){
  console.log(newGameMode, id, stats)
  const carousel = document.getElementById(id)
  const games = carousel.querySelectorAll('.single-game')

  const newStats = stats[newGameMode][id]

  // console.log(carousel)
  // console.log(newStats)

  let indexForStats = 0
  for(const game of games){

    indexForStats++
    // console.log(indexForStats)
    game.getElementsByClassName('single-game-champ')[0].innerText =  getChampName(dDragon, newStats[indexForStats].championId)
    game.getElementsByClassName('single-game-stat')[0].innerText =  generateStatText(newStats[indexForStats].stat, newStats.statText) 
    game.getElementsByClassName('single-game-gameId')[0].setAttribute('data', newStats[indexForStats].gameID)

    
    const [score, duration, win] = game.getElementsByClassName('single-game-info-object')
    score.innerText = 'Score: ' + newStats[indexForStats].score
    duration.innerText = generateStatText(newStats[indexForStats].gameDuration, 'time') 

    win.className = "";
    if (newStats[indexForStats].win){
      win.innerText = 'Victory'
      win.classList.add('single-game-info-object')
      win.classList.add('span-win')
    }else{
      win.innerText = 'Defeat'
      win.classList.add('single-game-info-object')
      win.classList.add('span-lose')
    }



    game.getElementsByClassName('single-game-img')[0].src = getChampImg(dDragon, newStats[indexForStats].championId)
    //games[i].getElementsByClassName('single-game-info')[0].innerText = newStats[indexForStats].gameID
    // console.log(game.getElementsByClassName('single-game-champ')[0].innerText)
  }

}


async function createLargeStats(stat, allStats){
  console.log(stat)

  const statsDisplay = document.getElementById('stats-display')
  const statText = document.createElement('div'); statText.classList.add('stat-text')
  const singleStat = document.createElement('div'); singleStat.classList.add('single-stat'); singleStat.id = stat.statId



  const carButtonLeft = document.createElement('div'); carButtonLeft.classList.add('carousel-button', 'carousel-next')
  const carButtonRight = document.createElement('div'); carButtonRight.classList.add('carousel-button', 'carousel-before')
  // console.log(stat)
  // carButtonLeft.innerText = '>'//'Before'
  // carButtonRight.innerText = '<'//'After'
  statText.innerText = stat.statText

  const carousel = document.createElement('div'); carousel.classList.add('single-stat-carousel')
  
  for(const [key, value] of Object.entries(stat)){
    if(!['statId', 'statText'].includes(key)){
      // console.log(value)
      const game = document.createElement('div'); game.classList.add('single-game')
      const champ = document.createElement('div'); champ.classList.add('single-game-champ')
      const statMainText = document.createElement('div'); statMainText.classList.add('single-game-stat')
      const gameId = document.createElement('div'); gameId.classList.add('single-game-gameId')
      const img = document.createElement('img'); img.classList.add('single-game-img')
      const info = document.createElement('div'); info.classList.add('single-game-info')
      
      const infoKDA = document.createElement('div'); infoKDA.classList.add('single-game-info-object')
      const infoGameDuration = document.createElement('div'); infoGameDuration.classList.add('single-game-info-object')
      const infoWin = document.createElement('div'); infoWin.classList.add('single-game-info-object')


      infoKDA.innerText = 'Score: ' + value.score
      infoGameDuration.innerText = generateStatText(value.gameDuration, 'time')
      infoWin.className = "";
      if (value.win){
        infoWin.innerText = 'Victory'
        infoWin.classList.add('single-game-info-object')
        infoWin.classList.add('span-win')
      }else{
        infoWin.innerText = 'Defeat'
        infoWin.classList.add('single-game-info-object')
        infoWin.classList.add('span-lose')
      }

      champ.innerText = getChampName(dDragon, value.championId)
      statMainText.innerText = generateStatText(value.stat, stat.statText)// 
      gameId.innerText = 'More details'//value.gameID.replace('EUN1_', '')
      gameId.setAttribute('data', value.gameID)
      gameId.onclick = function (){
        window.open(generateHistoryLink(gameId.getAttribute('data').replace('EUN1_', '')), '_blank').focus();
      }
      img.src = getChampImg(dDragon, value.championId)
      // console.log(infoGameDuration.innerText)

      info.append(gameId, infoKDA, infoGameDuration, infoWin)

      game.append(champ, statMainText, img, info)
      carousel.append(game)
    }
  }


  const gameModes = ["Normal Draft", "Ranked Solo", "Ranked Flex", "ARAM"]
  const dropDownContainer = document.createElement('div'); dropDownContainer.classList.add('dropdown-container'); //dropDownContainer.id = stat.statId
  const dropDown = document.createElement('div'); dropDown.classList.add('dropdown');
  const dropDownMenu = document.createElement('div'); dropDownMenu.classList.add('dropdown-menu');

  dropDown.innerText = 'Normal Draft'
  for (const mode of gameModes){
    const item = document.createElement('div'); item.classList.add('dropdown-menu-item');
    item.innerText = mode

    item.addEventListener('click', ()=>{
      reRenderLargeStats(mode, stat.statId, allStats)
      dropDown.innerText = mode
      dropDownMenu.style.display = 'none'
      dropDown.style.boxShadow = 'none'
    })
    dropDownMenu.appendChild(item)
  }

  //dropDownContainer.forEach((el) => {
      //const dropDownmenu = el.getElementsByClassName('dropdown-menu')[0]
      dropDown.addEventListener('click', ()=>{
          if(dropDownMenu.style.display == 'none' || !dropDownMenu.style.display){
            dropDownMenu.style.display = 'flex'
            dropDown.style.boxShadow = '#ffffff30 0px 2px 3px 1px'
          }else{
            dropDownMenu.style.display = 'none'
            dropDown.style.boxShadow = 'none'
          }
      })
  //})

  carButtonRight.onclick = ()=>{
    carButtonRight.style.width = '6rem'
    setTimeout(()=>{
      carButtonRight.style.width = '5rem'
    },200)
  }

  carButtonLeft.onclick = ()=>{
    carButtonLeft.style.width = '6rem'
    setTimeout(()=>{
      carButtonLeft.style.width = '5rem'
    },200)
  }

  // console.log(stat.statId)
  dropDownContainer.append(dropDown, dropDownMenu)

  statText.appendChild(dropDownContainer)
  singleStat.append(carousel, carButtonLeft, carButtonRight)
  statsDisplay.append(statText, singleStat)

}
export async function startRender(stats){

  dDragon = await getAllChampsInfoDDragon()
  itemsDDragon = await getSummonerSpellsDDragon()
  createGeneralStats(allStats[stats])
  for (const stat of Object.values(allStats[stats].stats['Normal Draft'])){
    await createLargeStats(stat, allStats[stats].stats)
    
  }
}
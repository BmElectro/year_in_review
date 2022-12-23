
const gameModesTranslator = { "400": 'Normal',"420": 'Ranked Solo',"440": 'Ranked Flex',"450": 'ARAM'}

async function getAllChampsInfoDDragon(){
    const URL = 'https://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json'
    const request = await fetch(URL)
    const dDragon = await request.json()
    return dDragon
}
function getChampName(dDragon, id){
    for (const [key, value] of Object.entries(dDragon.data)){
        if(value.key == id){
        return value.name
        }
    }
}
function getChampImg(dDragon, id){
    for (const [key, value] of Object.entries(dDragon.data)){
        if(value.key == id){
            return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${value.id}_0.jpg`
            
        }
    }
}
function getChampImgSmall(dDragon, name){
    if(name == 'FiddleSticks'){
        name = 'Fiddlesticks'
    }
    return `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${name}.png`

    for (const [key, value] of Object.entries(dDragon.data)){
        if(value.name == name){
            
        }
    }
}

function getSpellImg(id){
    return `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${id}.png`
}
function getSummonerSpellImage(id, itemDDragon){
    for (const [key, value] of Object.entries(itemDDragon.data)){
        if(value.key == id){
            return getSpellImg(value.image.full.replace('.png',''))
        }
    }
}

function generateHistoryLink(id){
    const baseURL = 'https://www.leagueofgraphs.com/match/eune/'
    return baseURL + id
}

function generateStatText(stat, statText){
    console.log('stat text = ', statText)
    switch (statText) {
        case 'time':
        case 'Top 3 shortest games':
        case 'Top 3 longest games':
            const intStat = parseInt(stat)
            console.log(intStat, stat)
            const theReturn = intStat >= 3600 ? new Date(intStat * 1000).toISOString().slice(11, 19) : new Date(intStat * 1000).toISOString().slice(14, 19)
            return 'Game length: ' + theReturn
        case 'Top 3 highest total damage':
            return 'Total damage dealt: ' + stat
        case 'Top 3 highest damage per minute':
            return 'Damage dealt per minute: ' + stat
        case 'Top 3 most kills':
            return 'Kills: ' + stat
        case 'Top 3 most deaths':
            return 'Deaths: ' + stat
        case 'Top 3 most assists':
            return 'Assists: ' + stat
        default:
            return stat
    }
}
async function getSummonerSpellsDDragon(){
    const URL = 'https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/summoner.json'
    const request = await fetch(URL)
    const dDragon = await request.json()
    return dDragon
}

export {
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

}
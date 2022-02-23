

function pokeDetailsTemplate(pokemonId){
    let pokemon = currentPokemon.find(p => p.id === pokemonId);
    let result =`
    <div class="pokeStatsMain">
        <div class="pokeStatsChild" id="pokeStatsChild">
        <div class="goBack" onclick="goBack()">
            back
        </div>
            <h2 style="margin: 0;">${pokemon['name'].toUpperCase()}</h2>
            <span class="statsId"># <b>${pokemon['id']}</b></span>
            <span class="theType statsType">${pokemon['types'][0]['type']['name']}</span>
            <img class="pokeImgInStats" src="${pokemon['sprites']['other']['home']['front_default']}">
        </div>
    <div class="theStats">
    <div class="detailStats abilityBorder">
        <span class="abilityTitle">abilities:</span>
        <span id="abilities${pokemonId}"></span>
    </div>
    `;
    for (let i = 0; i < 6 ; i++) {
        result += `
        <div class="detailBorder">
            <div class="detailStats">
                <span>${pokemon['stats'][i]['stat']['name']}</span>
                <span>${pokemon['stats'][i]['base_stat']}</span>
            </div>
            </div>    
            `
        }

        return result;
}
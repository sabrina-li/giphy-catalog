var pokeBaseURL = "https://pokeapi.co/api/v2/pokemon-species/";//pikachu
var evoURL = "";

function loadPokemons(data){
    let searchstr = $(data).attr("data");//onclick
    if(typeof data == "string"){//calling via string
        searchstr = data;
    }

    $.ajax({
        url:pokeBaseURL+searchstr,
        method:"GET",
        success:loadSpecies
    })
}

function loadSpecies(r){
    evoURL = r.evolution_chain.url;
    $.ajax({
        url:evoURL,
        method:"GET",
        success:loadEvolution
    })
}

function loadEvolution(r){
    var namearr = [];
    var chain = r.chain;

    do{
        namearr.push(chain.species.name);
        chain = chain.evolves_to[0];
    }while(typeof chain !== 'undefined')
    loadGiphy()

}

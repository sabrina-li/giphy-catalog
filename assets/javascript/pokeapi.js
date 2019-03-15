

function loadPokemons( data){
    //TODO:add loading wheel
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
    namearr.forEach(function(val,idx){
        var newDiv = $("<div>").attr("id",val);
        $("#catalog").append(newDiv)
        loadGiphy(val,0).then(function(d){
            $('#'+d[0]).append(`<h4 class="collapsible"><b>Level ${idx}: ${d[0]}</b></h4> `);
            console.log(d[1]);
            d[1].addClass("content");
            $('#'+d[0]).append(d[1]);
            //arrange div in order

            // $("#catalog").append(d);
        });
    })
    

}
//loadPokemons("pikachu")
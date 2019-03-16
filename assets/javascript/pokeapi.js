
// localStorage.removeItem("fav");

function loadPokemons(data){

    //TODO:add loading wheel
    let searchstr = $(data).attr("data");//onclick
    if(typeof data == "string"){//calling via string
        searchstr = data;
    }
    if (searchstr == array[0]){
        loadGiphy(searchstr).then(function(d){
            $("#catalog").append(d[1]);
        });
    }else{    
        $.ajax({
        url:pokeBaseURL+searchstr,
        method:"GET",
        success:loadSpecies,
        error:showError
    })}


}

function loadSpecies(r){
    evoURL = r.evolution_chain.url;
    $.ajax({
        url:evoURL,
        method:"GET",
        success:loadEvolution,
        error:showError
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
            $('#'+d[0]).append(`<h4 class="collapsible"><i class="fas fa-caret-down"></i>     <b>Level ${idx}: ${d[0]}</b></h4> `);
            console.log(d[1]);
            d[1].addClass("content");
            $('#'+d[0]).append(d[1]);
            //arrange div in order

            // $("#catalog").append(d);
        });
    })
    

}

function showError(e){
    console.error(e.status,e.responseText);
    $("#catalog").append("Error loading Pokemon, make sure your pokemon exist and try again later!");
}

//loadPokemons("pikachu")
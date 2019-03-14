function loadGiphy(data,scrollOffset=0){
    let newDiv = $("<div>").addClass("container");
    let searchstr = $(data).attr("data");
    if(typeof data == "string"){
        searchstr = data;
    }else if (searchstr == array[0]){
        let favarr = localStorage.getItem("fav");
        showCatalog(JSON.parse(favarr),0);
        return null
    }
    
    $.ajax({
        url:giphyBaseURL+'&q='+searchstr+"&offset="+scrollOffset,
        method:"GET"
    }).then(function(response){
        newDiv.showCatalog(response.data,scrollOffset);
        appendtoCatalog(newDiv,scrollOffset);
    })
}

jQuery.fn.extend({
    showCatalog:function(arr,scrollOffset){
        
        thisDiv = this;
        arr.forEach(function(gifobj){
            
            let thisGif = $(`<div class="card">
                                <div class="carddiv" data-move="${gifobj.images.fixed_height.url}" data-still="${gifobj.images.fixed_height_still.url}" data-state="still" data-title="${gifobj.title}" data-rating="${gifobj.rating}">
                                    <img class="gifimg" src="${gifobj.images.fixed_height_still.url}" alt="${gifobj.title}" style="width:100%">
                                    <span class="heart"><i class="fas fa-heart" ></i></span>
                                    <span class="download"><i class="fas fa-download"></i></span>
                                </div>
                                <div>
                                    <h4><b>Title: ${gifobj.title.replace(/GIF+$/, "")}</b></h4> 
                                    <p>Rating: ${gifobj.rating.toUpperCase()}</p> 
                                </div>
                            </div>`);
            //gifobj.images.fixed_height.url
            //gifobj.images.fixed_height_still.url
            // thisGif.attr("src");
            thisDiv.append(thisGif);
        });
    }
})
    
function appendtoCatalog(newdiv,scrollOffset){
    if (typeof scrollOffset== 'undefined' || scrollOffset == 0){
        $("#catalog").empty();
    }
    $("#catalog").append(newdiv)
}
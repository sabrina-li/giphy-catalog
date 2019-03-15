
//load giphy takes input string or jquery obj with data attribute
//load giphies
//return a promise to load a div containing all gifs
var loadGiphy = function (data,scrollOffset=0){
    return new Promise(function(resolve,reject){
        let newDiv = $("<div>").addClass("container");
        let searchstr = $(data).attr("data");//onclick
        if(typeof data == "string"){
            searchstr = data;
        }
        if (searchstr == array[0]){
            let favarr = localStorage.getItem("fav");
            newDiv.showCatalog(JSON.parse(favarr),0);
            resolve([searchstr,newDiv]);
        }
        
        $.ajax({
            url:giphyBaseURL+'&q='+searchstr+"&offset="+scrollOffset,
            method:"GET"
        }).done(function(response){
            newDiv.showCatalog(response.data);
            // appendtoCatalog(targetDiv,newDiv,scrollOffset);
            resolve([searchstr,newDiv]);
        }).fail(function(e){
            reject("loadGiphy fialed with error: "+e);
        })
    });
}

jQuery.fn.extend({
    showCatalog:function(arr){
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
    
// function appendtoCatalog(targetDiv,newdiv,scrollOffset){
//     //console.log(scrollOffset);
//     if (typeof scrollOffset== 'undefined' || scrollOffset == 0){
//         targetDiv.empty();
//     }
//     targetDiv.append(newdiv)
// }


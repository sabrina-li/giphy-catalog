
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
        }else{
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
        }
        
        
    });
}

jQuery.fn.extend({
    showCatalog:function(arr){
        thisDiv = this;
        if(arr==null){
            thisDiv.append("Your Favorite is empty! Go add some!");
        }else{
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
                
                console.log("gifobj",gifobj.images.fixed_height.url)
                if (favorited(gifobj.images.fixed_height.url)){
                    $(thisGif.children()[0]).children(".heart").css("color","red");
                }
                                
                //gifobj.images.fixed_height.url
                //gifobj.images.fixed_height_still.url
                thisDiv.append(thisGif);
            });
        }
        
    }
})

function favorited(url){
    let faved = false;
    if (localStorage.getItem("fav") !== null ){
        favarr=JSON.parse(localStorage.getItem("fav"));
        favarr.forEach(function(val){
            console.log(val.images.fixed_height.url);
            if(val.images.fixed_height.url == url){
                console.log(true);
                faved = true;
            }
        })
    }
    return faved;
}

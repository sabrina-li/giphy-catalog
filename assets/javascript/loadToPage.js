const apiKey= "jIGF6tck67zDxSHcihSf1h7wfRbCITyb";
const giphyBaseURL="https://api.giphy.com/v1/gifs/search?api_key=iXVZjM3tIa7nDqSSdJVHp3N6Qg4ZhDXA&rating=PG-13&lang=en&limit=10"

function loadGiphy(data,scrollOffset=0,targetDiv=$("#catalog")){
    let newDiv = $("<div>").addClass("container");
    let searchstr = $(data).attr("data");
    if(typeof data == "string"){
        searchstr = data;
    }
    if (searchstr == array[0]){
        let favarr = localStorage.getItem("fav");
        showCatalog(JSON.parse(favarr),0);
        return null
    }
    
    $.ajax({
        url:giphyBaseURL+'&q='+searchstr+"&offset="+scrollOffset,
        method:"GET"
    }).then(function(response){
        newDiv.showCatalog(response.data);
        appendtoCatalog(targetDiv,newDiv,scrollOffset);
    })
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
    
function appendtoCatalog(targetDiv,newdiv,scrollOffset){
    //console.log(scrollOffset);
    if (typeof scrollOffset== 'undefined' || scrollOffset == 0){
        targetDiv.empty();
    }
    targetDiv.append(newdiv)
}


function checkScroll(){
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {//at bottom of page            
        //TODO: add botton to go back on top
        //dynamically add back to top button on top right coner of the page
        //when clicked, use jQuery to scroll to top
        let scrollOffset = $("#catalog").children().children().length;
        loadGiphy($(".active").text(),scrollOffset);
    }
}
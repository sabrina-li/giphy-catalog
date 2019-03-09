var sports = ["Ski", "Cliff Jumping", "Cat","Dog"];
const apiKey= "jIGF6tck67zDxSHcihSf1h7wfRbCITyb";
const baseURL="https://api.giphy.com/v1/gifs/search?api_key=iXVZjM3tIa7nDqSSdJVHp3N6Qg4ZhDXA&rating=G&lang=en&limit=10"
//&q=cat
//TODO: &offset=0

$(document).ready(function () {
    function initSideBar() {
        $(".sidenav").empty()
        sports.forEach(function (val) {
            let newItem = $("<a>");
            newItem.addClass("navItem");
            newItem.attr("data", val);
            newItem.text(val);
            $(".sidenav").append(newItem);
        })
    }
    $("#add-item").on("click", function (event) {
        event.preventDefault();
        // console.log($("#user-input").val());
        var newSport = $("#user-input").val().trim();
        //TODO error handling if val is empty
        sports.push(newSport);
        initSideBar();
    });

    function loadGiphy(){
        $.ajax({
            url:baseURL+'&q='+$(this).attr("data"),
            method:"GET"
        }).then(showCatalog)
    }
    function showCatalog(response){
        $("#Catalog").empty();
        const arr = response.data;
        arr.forEach(function(gifobj){

            let thisGif = $(`<div class="card">
                                <img src=${gifobj.images.fixed_height_still.url} alt=${gifobj.title} style="width:100%" data-move=${gifobj.images.fixed_height.url}>
                                <div>
                                <h4><b>${"Title: "+gifobj.title}</b></h4> 
                                <p>${"Rating: "+gifobj.rating}</p> 
                                </div>
                            </div>`);
            //gifobj.images.fixed_height.url
            //gifobj.images.fixed_height_still.url
            thisGif.attr("src",);
            $("#Catalog").append(thisGif);
        });
    }

    function makeMove(){
        let thisCard = $(this).children(":first-child")[0];
        const src = $(thisCard).attr("src");
        $(thisCard).attr("src",$(thisCard).attr("data-move"));
        $(thisCard).attr("data-move", src);
    }

    initSideBar();
    $(document).on("click", ".navItem", loadGiphy);
    $(document).on("click", ".card", makeMove);
});
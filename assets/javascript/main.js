var array = ["ski", "cliff jumping", "cat","dog"];
const apiKey= "jIGF6tck67zDxSHcihSf1h7wfRbCITyb";
const baseURL="https://api.giphy.com/v1/gifs/search?api_key=iXVZjM3tIa7nDqSSdJVHp3N6Qg4ZhDXA&rating=G&lang=en&limit=10"
//&q=cat
//TODO: &offset=0

$(document).ready(function () {
    function initSideBar() {
        $(".sidenav").empty()
        array.forEach(function (val) {
            let newItem = $("<a>");
            newItem.addClass("navItem");
            newItem.attr("data", val);
            newItem.text(val.toLowerCase().split(' ')
                            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' '));
            $(".sidenav").append(newItem);
        })
    }
    $("#add-item").on("click", function (event) {
        event.preventDefault();
        input = $("#user-input").val().trim().toLowerCase();
        if(input!== "" && array.indexOf(input) == -1){
            //TODO error handling if val is empty
            array.push(input);
            initSideBar();
            loadGiphy(input);
        }
        $("#user-input").val("");
    });

    function loadGiphy(data){
        if(typeof data == "string"){
            console.log(data);
            $(this).attr("data",data);
        }
        console.log($(this).attr("data"));
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
                                <p>${"Rating: "+gifobj.rating.toUpperCase()}</p> 
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
var array = ["running", "cat","dog","asdf","harry potter","cat wearing hat","friday"];
const apiKey= "jIGF6tck67zDxSHcihSf1h7wfRbCITyb";
const baseURL="https://api.giphy.com/v1/gifs/search?api_key=iXVZjM3tIa7nDqSSdJVHp3N6Qg4ZhDXA&rating=PG-13&lang=en&limit=10"
//&q=cat
//&offset=0

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

    function loadGiphy(data,scrollOffset=0){
        let searchstr = $(data).attr("data");
        if(typeof data == "string"){
            searchstr = data;
        }
        
        $.ajax({
            url:baseURL+'&q='+searchstr+"&offset="+scrollOffset,
            method:"GET"
        }).then(function(response){
            console.log(baseURL+'&q='+searchstr+"&offset="+scrollOffset);
            showCatalog(response,scrollOffset);
        })
    }
    function showCatalog(response,scrollOffset){
        if (scrollOffset==0){
            $("#Catalog").empty();
        }
        const arr = response.data;
        arr.forEach(function(gifobj){
            console.log(gifobj.images.fixed_height.url);
            let thisGif = $(`<div class="card">
                                <img class="gifimg" src=${gifobj.images.fixed_height_still.url} alt=${gifobj.title} style="width:100%" data-move=${gifobj.images.fixed_height.url}>
                                </img>
                                <div>
                                    <h4><b>Title: ${gifobj.title.replace(/GIF+$/, "")}</b>
                                        <span>    <i class="fas fa-download" data="${gifobj.images.fixed_height.url}"></i></span>
                                    </h4> 
                                    <p>Rating: ${gifobj.rating.toUpperCase()}</p> 
                                </div>
                            </div>`);
            //gifobj.images.fixed_height.url
            //gifobj.images.fixed_height_still.url
            thisGif.attr("src",);
            $("#Catalog").append(thisGif);
        });
    }

    function makeMove(){
        // let thisCard = $(this).children(":first-child")[0];
        const src = $(this).attr("src");
        $(this).attr("src",$(this).attr("data-move"));
        $(this).attr("data-move", src);
    }
    function checkScroll(){
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            //at bottom of page
            //TODO: add botto to go back on top
            let scrollOffset = $("#Catalog").children().length;
            loadGiphy($(".active").text(),scrollOffset);
	    }
    }

    initSideBar();
    $(document).on("click", ".navItem", function(){
        $(".navItem").removeClass("active");
        $(this).addClass("active");
        $(".sidenav").removeClass("sidenavunhide");
        loadGiphy(this);
    });
    $(document).on("click", ".gifimg", makeMove);
    $(document).on("scroll",function(){
        checkScroll();
    });
    $(".fa-bars").on("click",function(){
        $(".sidenav").addClass("sidenavunhide");
        //TODO: add x to exit the nav
    })
    $("main").on("click", function(){$(".sidenav").removeClass("sidenavunhide");});

    $(".fa-download").on("click",function(){
        downloadLink = $(this).attr("data");
        $.ajax({
            url:downloadLink,
            method:"GET",
            xhrFields: {
                responseType: 'blob'
            }
        }).then(function(r){
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(r);
            a.download = '';
            a.click();
            window.URL.revokeObjectURL(url);
        })
    });
});
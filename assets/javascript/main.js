var array = ["favorite","","running", "cat","dog","asdf","harry potter","cat wearing hat","friday"];
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
        }else if (searchstr == "favorite"){
            let favarr = localStorage.getItem("fav");
            console.log(favarr);
            return null
        }
        
        $.ajax({
            url:baseURL+'&q='+searchstr+"&offset="+scrollOffset,
            method:"GET"
        }).then(function(response){
            // console.log(baseURL+'&q='+searchstr+"&offset="+scrollOffset);
            showCatalog(response.data,scrollOffset);
        })
    }
    function showCatalog(data,scrollOffset){
        if (scrollOffset==0){
            $("#Catalog").empty();
        }
        const arr = data;
        arr.forEach(function(gifobj){
            // console.log(gifobj.images.fixed_height.url);
            let thisGif = $(`<div class="card">
                                <div class="carddiv" data-move="${gifobj.images.fixed_height.url}" data-still="${gifobj.images.fixed_height_still.url}" data-state="still">
                                    <img class="gifimg" src="${gifobj.images.fixed_height_still.url}" alt="${gifobj.title}" style="width:100%">
                                    <span class="heart"><i class="fas fa-heart" ></i></span>
                                    <span class="download"><i class="fas fa-download"></i></span>
                                </div>
                                <div>
                                    <h4><b>Title: ${gifobj.title.replace(/GIF+$/, "")}</b> </h4> 
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
        let parent =$(this).parent()
        if (parent.attr("data-state")=="still"){
            $(this).attr("src",parent.attr("data-move"));
            parent.attr("data-state","move");
        }else{
            $(this).attr("src",parent.attr("data-still"));
            parent.attr("data-state","still");
        }
       
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
    function downloadLink(){
        //TODO fix parent
        
        let parent =$(this).parent();
        downloadLink = parent.attr("data-move");
        console.log(downloadLink);
        $.ajax({
            url:downloadLink,
            method:"GET",
            xhrFields: {
                responseType: 'blob'
            }
        }).then(function(data){
            
            var binaryData = [];
            binaryData.push(data);
            var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/gif"}))
            //mobile support: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
            var a = document.createElement('a');
            a.href = url
            a.download = '';
            a.click();
            window.URL.revokeObjectURL(url);
        })
    }
    function addToFav(){
        //TODO 
        let favarr = [];
        favarr.push(localStorage.getItem("fav"));
        const thisgif = {
            // Title$($(this).children()[0]).attr("data")
        }
        favarr.push();
        localStorage.setItem("fav",favarr);
        console.log(localStorage.getItem("fav"));
    }

    initSideBar();
    $(document).on("click", ".navItem", function(){
        $(".navItem").removeClass("active");
        $(this).addClass("active");
        $(".sidenav").removeClass("sidenavunhide");
        loadGiphy(this);
    });
    $(document).on("click", ".gifimg", makeMove);
    $(document).on("click",".download",downloadLink);
    $(document).on("click",".heart",addToFav);


    $(document).on("scroll",function(){
        checkScroll();
    });

    $(".fa-bars").on("click",function(){
        $(".sidenav").addClass("sidenavunhide");
        //TODO: add x to exit the nav
    })
    $("main").on("click", function(){$(".sidenav").removeClass("sidenavunhide");});

    
});
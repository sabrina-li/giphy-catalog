$(document).ready(function () {
    function initSideBar(active) {
        $(".sidenav").empty()
        array.forEach(function (val) {
            let newItem = $("<a>");
            newItem.addClass("navItem");
            newItem.attr("data", val);
            newItem.text(val.toLowerCase().split(' ')
                            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' '));
            if (val == active){newItem.addClass("active");}
            $(".sidenav").append(newItem);
            
        })
        
        
    }

    function makeMove(){
        let parent =$(this).parent()
        if (parent.attr("data-state")=="still"){
            $(this).attr("src",parent.attr("data-move"));
            parent.attr("data-state","move");
        }else{
            $(this).attr("src",parent.attr("data-still"));
            parent.attr("data-state","still");
        }
       
    }
    
    function downloadLink(){  
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
        $(this).css("color","red");
        let parent =$(this).parent();
        let favarr = [];
        if (localStorage.getItem("fav") !==null){
            favarr=JSON.parse(localStorage.getItem("fav"));
        }
        const thisgif = {
            title:parent.attr("data-title"),
            rating: parent.attr("data-rating"),
            images: {
                fixed_height:{
                    url:parent.attr("data-move")
                },
                fixed_height_still:{
                    url:parent.attr("data-still")
                }
            }
        }

        if (favorited(thisgif.images.fixed_height.url)){
            //do nothing
        }else{
            favarr.push(thisgif);
            localStorage.setItem("fav",JSON.stringify(favarr));
        }
        
    }


    initSideBar();

    $("#add-item").on("click", function (event) {
        //TODO: check for illegal charactors
        event.preventDefault();
        $("#catalog").empty();
        input = $("#user-input").val().trim().toLowerCase();
        if(input!== "" && array.indexOf(input) == -1){
            loadPokemons(input).then(function(e){
                console.log("eeeee",e);
                array.push(input);
                initSideBar(input);
            })
            
            // loadGiphy(input);
        }
        $("#user-input").val("");
    });


    $(document).on("click", ".navItem", async function(){
        $("#catalog").empty();
        $(".navItem").removeClass("active");
        $(this).addClass("active");
        $(".sidenav").removeClass("sidenavunhide");
        // loadGiphy(this);
        loadPokemons(this);
    });

    $(document).on("click", ".gifimg", makeMove);
    $(document).on("click",".download",downloadLink);
    $(document).on("click",".heart",addToFav);


    $(document).on("scroll",function(){
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {//at bottom of page            
            //TODO: add botton to go back on top
            //dynamically add back to top button on top right coner of the page
            //when clicked, use jQuery to scroll to top
            
            let loadMoreDiv = $("#catalog").children(".active");
            let scrollOffset = loadMoreDiv.children(".container").children().length;
           
            loadGiphy(loadMoreDiv.attr("id"),scrollOffset).then(function(d){
                loadMoreDiv.children(".container").append(d[1].children());
            });
        }

    });

    $(".fa-bars").on("click",function(){
        $(".sidenav").addClass("sidenavunhide");
        //TODO: add x to exit the nav
        //add fa dinamically to top right conor of the nav bar
        //on click listener
        //display only when sidenavunhide class is added (via css)
    })
    $("main").on("click", function(){$(".sidenav").removeClass("sidenavunhide");});


    $(document).on("click",".collapsible",function(){
        $(this).toggleClass("active");
        $(this).parent().toggleClass("active");
        $(this).children(".fa-caret-down").toggleClass("spin");
        var content = $(this).next();
        if (content.css("display") === "flex") {
        content.css("display","none");
        } else {
        content.css("display","flex");
        }
    });
    
});
var array = ["my list","","chicken", "spinach","eggs","milk","pizza"];
const apiKey= "jIGF6tck67zDxSHcihSf1h7wfRbCITyb";
const giphyBaseURL="https://api.giphy.com/v1/gifs/search?api_key=iXVZjM3tIa7nDqSSdJVHp3N6Qg4ZhDXA&rating=PG-13&lang=en&limit=10"
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
                    url:parent.attr("data-still")
                },
                fixed_height_still:{
                    url:parent.attr("data-still")
                }
            }
        }

        //TODO check if this gif is already faverated
        //loop through fav array, 
        //if thisgif.images.fixedheight.url  == favarr...... then don't push, 
        //else push and break
        favarr.push(thisgif);
        localStorage.setItem("fav",JSON.stringify(favarr));
    }




    initSideBar();

    $("#add-item").on("click", function (event) {
        //TODO: check for illegal charactors
        event.preventDefault();
        input = $("#user-input").val().trim().toLowerCase();
        if(input!== "" && array.indexOf(input) == -1){
            //TODO error handling if val is empty or already added
            array.push(input);
            initSideBar();
            loadGiphy(input);
        }
        $("#user-input").val("");
    });


    $(document).on("click", ".navItem", async function(){
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
        //add fa dinamically to top right conor of the nav bar
        //on click listener
        //display only when sidenavunhide class is added (via css)
    })
    $("main").on("click", function(){$(".sidenav").removeClass("sidenavunhide");});

    
});
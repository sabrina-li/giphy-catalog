var array = ["ski","swim","running","cliff jumping"];

$(document).ready(function(){
    function initSideBar(){
        array.forEach(function(val){
            console.log(val);
            $(".sidenav").append("<a>"+val+"</a>");
        })
    }
    initSideBar();
});
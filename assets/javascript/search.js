// var marvelbaseURL = "https://gateway.marvel.com:443/v1/public/characters?apikey=06af5d7b11d41813d19adfe329ba0485&nameStartsWith="//ironman
// publickey = "06af5d7b11d41813d19adfe329ba0485";
// privatekey = "2f31f8a73147d7b70711919debbc21a15dca9080"
// "https://pokeapi.co/api/v2/pokemon/";//pikachu
var foodBaseURL="https://www.themealdb.com/api/json/v1/1/filter.php?i=";//chicken_breast
var mealBaseURL="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";//52772

$(document).ready(function(){
    var timer;//wait 1 seconde before calling ajax
    $("#user-input").on("input",function(){
        clearTimeout(timer);
        let input = $(this).val().trim().toLowerCase();
        let ms = 200; // milliseconds
        if (input !== null){
            timer = setTimeout(function() {
                
                searchMeal(input);
            }, ms);
        }

    });
})

function searchMeal(val){
    closeAllLists();
    let a = $("<div>");
    a.attr("id", "autocomplete-list");
    a.attr("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    $("#user-input").parent().append(a);

    let arr=[];
    $.ajax({
        url:foodBaseURL+val,
        method:"GET"
    }).then(function (r){
        if(r.meals !== null && val !== ''){
            r.meals.forEach(function(m){
                arr.push(m);
            });
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
              //   if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                  /*create a DIV element for each matching element:*/
                  arr[i].strMeal = arr[i].strMeal.replace('&', 'and');;
                  b = $("<div>");
                  /*make the matching letters bold:*/
                  b.append("<strong>" + arr[i].strMeal.substr(0, val.length) + "</strong>");
                  b.append(arr[i].strMeal.substr(val.length));
                  /*insert a input field that will hold the current array item's value:*/
                  b.append("<input type='hidden' data-id="+arr[i].idMeal+" value='" + arr[i].strMeal + "'>");
                  /*execute a function when someone clicks on the item value (DIV element):*/
                  b.on("click", function(e) {
                      /*insert the value for the autocomplete text field:*/
                    //   console.log($(this).children("input")[0]);
                      $("#user-input").val($($(this).children("input")[0]).attr("value"));
                      /*close the list of autocompleted values,
                      (or any other open lists of autocompleted values:*/
                      closeAllLists();
                      
                    //   $.ajax({
                    //       url: mealBaseURL+$($(this).children("input")[0]).attr("data-id"),
                    //       method:"GET"
                    //   }).then(function(r){
                    //     // console.log(r.meals[0].strInstructions);
                    //     $("#recipe").empty();
                    //     $("#recipe").append(r.meals[0].strInstructions);
                    //     $("#add-item").click();
                    //   })
    
                  });
                  a.append(b);
              //   }
              }
        }
        
        
    })
    
}


function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = $(".autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != ("user-input")) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
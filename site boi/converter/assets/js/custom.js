




(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
      
 

            $(document).ready(function(){

                var CURRENCY_API = "http://data.fixer.io/api/latest?access_key=b4bca894e97e84087e5c623415b39f90";
                var dateElement = $('h3');
                
                    function callCurrency() {
                        $.get(CURRENCY_API, function(data){
                         var dateOutput;
                
                       dateOutput = "<h3> As of " + data.date + "</h3>";
                       dateElement.html(dateOutput);
                
                       var currencyOutput;
                

                       currencyOutput = "<br> 1USD = €" + data.rates.USD;
                       currencyOutput += "<br> 1GBP = €" + data.rates.GBP;
                       $('lip').html(currencyOutput);
                        });
                    };
                
                callCurrency();
                 

                });

        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
 
    $(document).ready(function () {
        mainApp.main_fun();
    });

}(jQuery));

var currencies = ["EUR", "GBP", "USD"]
var rates = {}

function getRates(callback) {
    var key = "b4bca894e97e84087e5c623415b39f90"
    $.ajax({
        url: 'http://data.fixer.io/api/latest?access_key=' + key,
        dataType: 'jsonp',
        success: function(json) {
            rates.GBP = json.rates.GBP
            rates.USD = json.rates.USD
            callback()
        }
    })
}

function showApp() {
    $("#loading").hide()
    $("#app").removeClass("d-none")
}

function changeFrom () {
    // Reset to currencies
    $("#to").html('<option value="">To</option>')
    $("#result").hide()
    $("#converted").text("")

    // Get selected from currency
    var selected = $("#from").val()

    if (selected) {
        var newArray = currencies.slice() // Copy array
        var index = newArray.indexOf(selected) // Find from currency
        newArray.splice(index, 1) // Remove it so it wont show on to

        // Print to currencies
        for (var i = 0; i < newArray.length; i++) {
            var _currency =newArray[i]
            var html = '<option value="'+_currency+'">'+_currency+'</option>'
            $("#to").append(html)
        }
    }
}

function ConvertAmount(from, to, amount) {
  if (from === to) return amount
  else if (from === "EUR") return amount * rates[to]
  else if (to === "EUR") return amount / rates[from]
  else return amount / rates[from] * rates[to]
}

function FloorTwoDigits(input) {
  return Math.floor(input * 100) / 100
}

function StartConversion() {
    var from = $("#from").val()
    var to = $("#to").val()
    var amount = $("#amount").val()

    if (!from || !to) return

    var converted = FloorTwoDigits(ConvertAmount(from, to, amount))
    $("#converted").text(converted)
    $("#result").removeClass("d-none").show()
}

$("#from").on("change", changeFrom)
$("#to").on("change", StartConversion)
$("#amount").on("input", StartConversion)

$(document).ready(getRates(showApp))



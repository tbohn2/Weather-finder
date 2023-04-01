var input = $("#input")
var searchbtn = $("#searchbtn")
var searchedlist = $("#searchedlist")
var todaycard = $("#todaycard")
var forecasthead = $("#forecasthead")
var forecastcards = [$("#daycard1"), $("#daycard2"), $("#daycard3"), $("#daycard4"), $("#daycard5")]

// c8e2a7585038b4ebf8428eb49100360f API key

// To get weather for 5 days
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// To get coordinates, limit up to 5
// http:api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

fetch("http:api.openweathermap.org/geo/1.0/direct?q=phoenix&appid=c8e2a7585038b4ebf8428eb49100360f")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data[0].lat)
        console.log(data[0].lon)
    });
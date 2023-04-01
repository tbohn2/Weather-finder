var input = $("#input")
var searchbtn = $("#searchbtn")
var searchedlist = $("#searchedlist")
var todaycard = $("#todaycard")
var forecasthead = $("#forecasthead")
var forecastcards = [$("#daycard1"), $("#daycard2"), $("#daycard3"), $("#daycard4"), $("#daycard5")]
var searched = $(".list-group-item")
var lat = ""
var lon = ""
var city = ""


// c8e2a7585038b4ebf8428eb49100360f API key

// To get weather for 5 days
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// To get coordinates, limit up to 5
// http:api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

searchbtn.on('click', function (event) {
    event.preventDefault()
    city = input.val().trim()
    findCoord()
})

function findCoord() {
    var coordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=c8e2a7585038b4ebf8428eb49100360f"
    console.log(coordURL);
    fetch(coordURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat
            lon = data[0].lon
            findWeather()
        })
}
function findWeather() {
    // api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
    var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c8e2a7585038b4ebf8428eb49100360f&units=imperial&cnt=6"
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.list[0].dt_txt);
            console.log(data.list[0].main.temp);
            console.log(data.list[0].main.humidity);
            console.log(data.list[0].wind.speed);
            console.log(data.list[0].weather[0].icon);


        });
}


// fetch("http:api.openweathermap.org/geo/1.0/direct?q=phoenix&appid=c8e2a7585038b4ebf8428eb49100360f")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//
//     });
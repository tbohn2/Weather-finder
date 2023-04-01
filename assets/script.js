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
var today = dayjs().format("M/D/YYYY")

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
    var todayURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=c8e2a7585038b4ebf8428eb49100360f&units=imperial"
    fetch(todayURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //  https://openweathermap.org/img/wn/10d@2x.png
            let todaysymbol = $("<img>")
            let src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            todaysymbol.attr("src", src)
            todaycard.children("h2").text(data.name + "(" + today + ") ")
            todaycard.children("h2").append(todaysymbol)
            todaycard.children(".temp").text("Temp: " + data.main.temp)
            todaycard.children(".wind").text("Wind: " + data.wind.speed + "MPH")
            todaycard.children(".humidity").text("Humidity: " + data.main.humidity + "%")

            // console.log(data);
            // console.log(data.name);
            // console.log(data.main.temp);
            // console.log(data.main.humidity);
            // console.log(data.wind.speed);
            // console.log(data.weather[0].icon);
        });
}
//     var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c8e2a7585038b4ebf8428eb49100360f&units=imperial"
//     fetch(forecastURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             console.log(data.list[0].dt_txt);
//             console.log(data.list[0].main.temp);
//             console.log(data.list[0].main.humidity);
//             console.log(data.list[0].wind.speed);
//             console.log(data.list[0].weather[0].icon);
//         });
// }


// fetch("http:api.openweathermap.org/geo/1.0/direct?q=phoenix&appid=c8e2a7585038b4ebf8428eb49100360f")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//
//     });
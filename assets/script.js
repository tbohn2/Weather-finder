var input = $("#input")
var searchbtn = $("#searchbtn")
var searchedlist = $("#searchedlist")
var todaycard = $("#todaycard")
var forecasthead = $("#forecasthead")
var forecastcards = [$("#daycard1"), $("#daycard2"), $("#daycard3"), $("#daycard4"), $("#daycard5")]
var searchedbtn = $(".list-group-item")
var lat = ""
var lon = ""
var city = ""
var today = dayjs().format("M/D/YYYY")
var searchedcities = JSON.parse(localStorage.getItem("searched"))
if (searchedcities == null) {
    searchedcities = []
}

loadSearched()

function loadSearched() {
    searchedlist.empty()
    for (let i = 0; i < searchedcities.length; i++) {
        let newSearched = $("<li>")
        newSearched.addClass("list-group-item col-12 text-center btn btn-primary")
        newSearched.text(searchedcities[i])
        searchedlist.append(newSearched)
    }
}

searchbtn.on('click', function (event) {
    event.preventDefault()
    city = input.val().trim()
    findWeather()
})

function addToSearched() {
    searchedcities.push(city)
    searchedcities = $.grep(searchedcities, function (element, index) {
        return index === $.inArray(element, searchedcities)
    })
    localStorage.setItem("searched", JSON.stringify(searchedcities))
    loadSearched()
}

function findWeather() {
    var todayURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c8e2a7585038b4ebf8428eb49100360f&units=imperial"
    fetch(todayURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            todaycard.addClass("bg-info")
            city = data.name
            let todaysymbol = $("<img>")
            let src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            todaysymbol.attr("src", src)
            todaycard.children("h2").text(city + " (" + today + ") ")
            todaycard.children("h2").append(todaysymbol)
            todaycard.children(".temp").text("Temp: " + data.main.temp)
            todaycard.children(".wind").text("Wind: " + data.wind.speed + "MPH")
            todaycard.children(".humidity").text("Humidity: " + data.main.humidity + "%")
            addToSearched()
        });
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c8e2a7585038b4ebf8428eb49100360f&units=imperial"
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 4; i < data.list.length; i += 8) {
                let x = (i - 4) / 8;
                let forecastcard = forecastcards[x]
                forecastcard.addClass("bg-info")
                let src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
                let date = (data.list[i].dt_txt).slice(0, 10)
                date = dayjs(date).format("M/D/YYYY")
                forecastcard.children("h4").text(date)
                forecastcard.children(".symbol").attr("src", src)
                forecastcard.children(".temp").text("Temp: " + data.list[i].main.temp)
                forecastcard.children(".wind").text("Wind: " + data.list[i].wind.speed + "MPH")
                forecastcard.children(".humidity").text("Humidity: " + data.list[i].main.humidity + "%")
            }



            // console.log(data);
            // console.log(data.list[0].dt_txt);
            // console.log(data.list[0].main.temp);
            // console.log(data.list[0].main.humidity);
            // console.log(data.list[0].wind.speed);
            // console.log(data.list[0].weather[0].icon);
        });
}

// function findCoord() {
//     var coordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=c8e2a7585038b4ebf8428eb49100360f"
//     fetch(coordURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             lat = data[0].lat
//             lon = data[0].lon
//             findWeather()
//         })
// }
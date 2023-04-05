var input = $("#input")
var searchbtn = $("#searchbtn")
var searchedlist = $("#searchedlist")
var todaycard = $("#todaycard")
var forecasthead = $("#forecasthead")
var forecastcards = [$("#daycard1"), $("#daycard2"), $("#daycard3"), $("#daycard4"), $("#daycard5")]
var city = ""
var today = dayjs().format("M/D/YYYY")
var date = dayjs().format("YYYY-MM-DD")
var searchedcities = JSON.parse(localStorage.getItem("searched"))
// If local storage is empty, the searchedcities var will be set to an empty array
if (searchedcities == null) {
    searchedcities = []
}

// Displays past searched cities
loadSearched()

function loadSearched() {
    // Removes all children from searched list
    searchedlist.empty()
    // Creates a new button for every city that has been searched
    for (let i = 0; i < searchedcities.length; i++) {
        let newSearched = $("<btn>")
        newSearched.addClass("list-group-item col-12 text-center btn btn-primary")
        newSearched.text(searchedcities[i])
        searchedlist.append(newSearched)
    }
    // Creates a variable for the buttons
    var searchedbtn = $(".list-group-item")
    // Adds event listener for buttons on click
    searchedbtn.on('click', function (event) {
        event.preventDefault()
        // Sets the button text as the city
        city = ($(event.target).text());
        findWeather()
    })
}

// Function sets the city equal to the text input
function submit() {
    city = input.val().trim()
    findWeather()
}

// Calls submit function when submit is clicked
searchbtn.on('click', function (event) {
    event.preventDefault()
    submit()
})

// Calls submit function when Enter key is pressed on input
input.keypress(function (event) {
    if (event.which === 13) {
        submit()
    }
})

// Adds searched city to the history list
function addToSearched() {
    // Places new city searched at beginning of searchedlist array
    searchedcities.unshift(city)
    // Looks for duplicates in the array and only includes the item once in the array
    searchedcities = $.grep(searchedcities, function (element, index) {
        return index === $.inArray(element, searchedcities)
    })
    // Saves the array searchedcities in local storage under the key of "searched"
    localStorage.setItem("searched", JSON.stringify(searchedcities))
    loadSearched()
}

// Finds the weather for the city
function findWeather() {
    // Creates the fetch URL to find the current weather
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c8e2a7585038b4ebf8428eb49100360f&units=imperial"
    fetch(todayURL)
        .then(function (response) {
            // If fetch response is not ok, the user is alerted to enter a valid city, otherwise the response is returned
            if (!response.ok) {
                alert("Please enter a valid city")
                return
            }
            return response.json();
        })
        // Finds the data and places it into approprate HTML element to display current weather
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

    // Makes the URL for forecasted weather over the next five days
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c8e2a7585038b4ebf8428eb49100360f&units=imperial"

    // Fethces forecast data
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Finds the offset timezone and converts it to hours
            var offset = (data.city.timezone) / 3600
            // Finds the date of the weather in the data by splitting it from time stamp and selecting the date in the array
            var $date = $(data.list[0].dt_txt.split(" "))
            // Creates an empty array to store midday weather for the next five days
            let middayWeather = $([])
            // All data forecasted between 11 am and 3 pm in the time of the city and not today is added to the array middayWeather
            for (let i = 0; i < data.list.length; i++) {
                // Creates a variable that shows the UTC hour that the data is forecasted
                recordTime = parseInt((data.list[i].dt_txt.split(" ").pop()).split(":")[0])
                // If the UTC time plus the offset from the city's timezone is between 11 am and 3 pm, and the date is not today, the data is added to the middayWeather
                if (recordTime + offset > 11 && recordTime + offset < 15 && $($date[i] != date)) {
                    middayWeather.push(data.list[i])
                }
            }
            console.log(middayWeather);
            // Moves through the middayWeather and forecastcards arrays at the same time to display the corresponding data in each card per day
            for (let i = 0; i < middayWeather.length; i++) {
                let forecastcard = forecastcards[i]
                forecastcard.addClass("bg-info")
                let src = "https://openweathermap.org/img/wn/" + middayWeather[i].weather[0].icon + "@2x.png"
                let date = (middayWeather[i].dt_txt).slice(0, 10)
                date = dayjs(date).format("M/D/YYYY")
                forecastcard.children("h4").text(date)
                forecastcard.children(".symbol").attr("src", src)
                forecastcard.children(".temp").text("Temp: " + middayWeather[i].main.temp + " °F")
                forecastcard.children(".wind").text("Wind: " + middayWeather[i].wind.speed + "MPH")
                forecastcard.children(".humidity").text("Humidity: " + middayWeather[i].main.humidity + "%")
            }
        });
}


let APIkey = "d5e7854d07a92a637c401978878f4915";
let IPkey = "at_Vo7aie4UySYciAYoeGNHBTv7spv00";
let divTime = document.querySelector(".time");
let divWeather = document.querySelector(".weather");
let divWeatherLeft = document.createElement("div");
let divWeatherCenter = document.createElement("div");
let divWeatherRight = document.createElement("div");
let divWeek = document.querySelector(".week");

let divWind = document.querySelector(".wind");
let form = document.querySelector("form");
let button = document.querySelector(".header__button");

function nav() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      drawWeather(lat, lon);
      drawTime(lat, lon);
      drawWeek(lat, lon);
      drawWind(lat, lon);
    },
    (err) => {
      nav2();
    }
  );
}

async function nav2() {
  try {
    const API2 = `https://geo.ipify.org/api/v2/country,city?apiKey=${IPkey}`;
    let coord = await unpack(API2);
    let lat = coord.location.lat;
    let lon = coord.location.lng;
    drawWeather(lat, lon);
    drawTime(lat, lon);
    drawWeek(lat, lon);
    drawWind(lat, lon);
  } catch (err) {
    console.log(err.message, "ХУЙ");
  }
}

async function unpack(API) {
  try {
    let res = await fetch(API);
    if (res.ok != true) {
      throw new Error(res.status);
    }
    return res.json();
  } catch (err) {
    console.log("хуй");
  }
}

async function drawTime(lat, lon) {
  let input = document.querySelector("input");
  const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&q=${input.value}&appid=${APIkey}`;
  let arr = unpack(API);
  arr = await arr;
  let ts = Date.now() + arr.timezone * 1000;
  let time = new Date(ts + +new Date(ts).getTimezoneOffset() * 60000);
  let hour = time.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let min = time.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let weekday = time.toLocaleString("en", { weekday: "long" });
  let day = time.getDate();
  let month = time.toLocaleString("en", { month: "short" });

  divTime.innerHTML = `
  <h2>${arr.name}</h2>
  <p class="p_time">${hour}:${min}</p>
  <p class="p_date">${weekday}, ${day} ${month}</p>
  `;
}

async function drawWeather(lat, lon) {
  let input = document.querySelector("input");
  const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&q=${input.value}&appid=${APIkey}&units=metric`;
  let arr = unpack(API);
  arr = await arr;
  let tem = arr.main.temp;
  tem = Math.ceil(tem);
  let feel = arr.main.feels_like;
  feel = Math.ceil(feel);

  let sunrise = arr.sys.sunrise * 1000;
  let timeRise = new Date(sunrise);
  let hourRise = timeRise.getHours();
  if (hourRise < 10) {
    hourRise = "0" + hourRise;
  }
  let minRise = timeRise.getMinutes();
  if (minRise < 10) {
    minRise = "0" + minRise;
  }

  let sunset = arr.sys.sunset * 1000;
  let timeSet = new Date(sunset);
  let hourSet = timeSet.getHours();
  if (hourSet < 10) {
    hourSet = "0" + hourSet;
  }
  let minSet = timeSet.getMinutes();
  if (minSet < 10) {
    minSet = "0" + minSet;
  }

  divWeatherLeft.className = "weather_left";
  divWeatherLeft.innerHTML = "";
  divWeatherLeft.innerHTML = `
<p class="mainTemp">${tem}°C</p>
<div class="feel_like">
   <p class="feel">Feels like: </p>
   <p class="like">${feel}°C</p>
</div>
<div class="sun">
   <div class="sun_card">
      <img src="./sunrise.png">
      <div class="sun_text">
         <p>Sunrise</p>
         <p>${hourRise}:${minRise}</p>
      </div>
   </div>
   <div class="sun_card">
      <img src="./sunset.png">
      <div class="sun_text">
         <p>Sunset</p>
         <p>${hourSet}:${minSet}</p>
   </div>
</div>
`;
  divWeather.append(divWeatherLeft);

  divWeatherCenter.className = "weather_center";
  divWeatherCenter.innerHTML = `
  <img src="https://openweathermap.org/img/wn/${arr.weather[0].icon}@4x.png" width=260px/>
  <p>${arr.weather[0].main}</p>
  `;
  divWeather.append(divWeatherCenter);

  divWeatherRight.className = "weather_right";
  divWeatherRight.innerHTML = `
  <div class="wind_article">
     <img src="./humidity.png" height=55px>
     <p>${arr.main.humidity}%</p>
     <p>Humidity</p>
   </div>
    <div class="wind_article">
     <img src="./wind.png" height=55px>
     <p>${arr.wind.speed}km/h</p>
     <p>Wind Speed</p>
   </div>
    <div class="wind_article">
     <img src="./pressure-white.png" height=55px>
     <p>${arr.main.pressure}</p>
     <p>Pressure</p>
   </div>
    <div class="wind_article">
     <img src="./uv-white.png" height=55px>
     <p>???</p>
     <p>---</p>
   </div>
  `;
  divWeather.append(divWeatherRight);
}

async function drawWeek(lat, lon) {
  let input = document.querySelector("input");
  const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&q=${input.value}&units=metric`;
  let arr = unpack(API);
  arr = await arr;

  let tem0 = arr.list[4].main.temp;
  tem0 = Math.ceil(tem0);
  let dt0 = arr.list[4].dt * 1000;
  let time0 = new Date(dt0);
  let weekday0 = time0.toLocaleString("en", { weekday: "long" });
  let day0 = time0.getDate();
  let month0 = time0.toLocaleString("en", { month: "short" });

  let tem1 = arr.list[12].main.temp;
  tem1 = Math.ceil(tem1);
  let dt1 = arr.list[12].dt * 1000;
  let time1 = new Date(dt1);
  let weekday1 = time1.toLocaleString("en", { weekday: "long" });
  let day1 = time1.getDate();
  let month1 = time1.toLocaleString("en", { month: "short" });

  let tem2 = arr.list[20].main.temp;
  tem2 = Math.ceil(tem2);
  let dt2 = arr.list[20].dt * 1000;
  let time2 = new Date(dt2);
  let weekday2 = time2.toLocaleString("en", { weekday: "long" });
  let day2 = time2.getDate();
  let month2 = time2.toLocaleString("en", { month: "short" });

  let tem3 = arr.list[28].main.temp;
  tem3 = Math.ceil(tem3);
  let dt3 = arr.list[28].dt * 1000;
  let time3 = new Date(dt3);
  let weekday3 = time3.toLocaleString("en", { weekday: "long" });
  let day3 = time3.getDate();
  let month3 = time3.toLocaleString("en", { month: "short" });

  let tem4 = arr.list[36].main.temp;
  tem4 = Math.ceil(tem4);
  let dt4 = arr.list[36].dt * 1000;
  let time4 = new Date(dt4);
  let weekday4 = time4.toLocaleString("en", { weekday: "long" });
  let day4 = time4.getDate();
  let month4 = time4.toLocaleString("en", { month: "short" });

  divWeek.innerHTML = `
  <p class="week_title">5 Days Forecast:</p>
  <div class="one_day">
    <img src="https://openweathermap.org/img/wn/${arr.list[4].weather[0].icon}@2x.png" width=60px/>
    <p>${tem0}°C</p>
    <p>${weekday0}, ${day0} ${month0}</p>
  </div>
<div class="one_day">
    <img src="https://openweathermap.org/img/wn/${arr.list[12].weather[0].icon}@2x.png" width=60px/>
    <p>${tem1}°C</p>
    <p>${weekday1}, ${day1} ${month1}</p>
  </div>
  <div class="one_day">
    <img src="https://openweathermap.org/img/wn/${arr.list[20].weather[0].icon}@2x.png" width=60px/>
    <p>${tem2}°C</p>
    <p>${weekday2}, ${day2} ${month2}</p>
  </div>
  <div class="one_day">
    <img src="https://openweathermap.org/img/wn/${arr.list[28].weather[0].icon}@2x.png" width=60px/>
    <p>${tem3}°C</p>
    <p>${weekday3}, ${day3} ${month3}</p>
  </div>
  <div class="one_day">
    <img src="https://openweathermap.org/img/wn/${arr.list[36].weather[0].icon}@2x.png" width=60px/>
    <p>${tem4}°C</p>
    <p>${weekday4}, ${day4} ${month4}</p>
  </div>
  `;
}

async function drawWind(lat, lon) {
  let input = document.querySelector("input");
  const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&q=${input.value}&units=metric`;
  let arr = unpack(API);
  arr = await arr;
  console.log(arr);

  let tem12 = arr.list[0].main.temp;
  tem12 = Math.ceil(tem12);
  let time1 = arr.list[0].dt * 1000;
  let time_1 = new Date(time1);
  let hour1 = time_1.getHours();

  let tem15 = arr.list[1].main.temp;
  tem15 = Math.ceil(tem15);
  let time2 = arr.list[1].dt * 1000;
  let time_2 = new Date(time2);
  let hour2 = time_2.getHours();

  let tem18 = arr.list[2].main.temp;
  tem18 = Math.ceil(tem18);
  let time3 = arr.list[2].dt * 1000;
  let time_3 = new Date(time3);
  let hour3 = time_3.getHours();

  let tem21 = arr.list[3].main.temp;
  tem21 = Math.ceil(tem21);
  let time4 = arr.list[3].dt * 1000;
  let time_4 = new Date(time4);
  let hour4 = time_4.getHours();

  let tem00 = arr.list[4].main.temp;
  tem00 = Math.ceil(tem00);
  let time5 = arr.list[4].dt * 1000;
  let time_5 = new Date(time5);
  let hour5 = time_5.getHours();

  divWind.innerHTML = `
<h3>Hourly Forecast:</h3>
<div class="wind_cards">
  <div class="wind_article_bottom">
    <p>${hour1}:00</p>
    <img src="https://openweathermap.org/img/wn/${
      arr.list[0].weather[0].icon
    }@2x.png" width=60px/>
    <p>${tem12}°C</p>
    <img src="./windNav.png" class="windNav1">
    <p>${Math.ceil(arr.list[0].wind.speed)} km/h</p>
 </div>
 <div class="wind_article_bottom">
    <p>${hour2}:00</p>
    <img src="https://openweathermap.org/img/wn/${
      arr.list[1].weather[0].icon
    }@2x.png" width=60px/>
    <p>${tem15}°C</p>
    <img src="./windNav.png" class="windNav2">
    <p>${Math.ceil(arr.list[1].wind.speed)} km/h</p>
 </div>
 <div class="wind_article_bottom">
    <p>${hour3}:00</p>
    <img src="https://openweathermap.org/img/wn/${
      arr.list[2].weather[0].icon
    }@2x.png" width=60px/>
    <p>${tem18}°C</p>
    <img src="./windNav.png" class="windNav3">
    <p>${Math.ceil(arr.list[2].wind.speed)} km/h</p>
 </div>
 <div class="wind_article_bottom_dark">
    <p>${hour4}:00</p>
    <img src="https://openweathermap.org/img/wn/${
      arr.list[3].weather[0].icon
    }@2x.png" width=60px/>
    <p>${tem21}°C</p>
    <img src="./windNav.png" class="windNav4">
    <p>${Math.ceil(arr.list[3].wind.speed)} km/h</p>
 </div>
 <div class="wind_article_bottom_dark">
    <p>${hour5}:00</p>
    <img src="https://openweathermap.org/img/wn/${
      arr.list[4].weather[0].icon
    }@2x.png" width=60px/>
    <p>${tem00}°C</p>
    <img src="./windNav.png" class="windNav5">
    <p>${Math.ceil(arr.list[4].wind.speed)} km/h</p>
 </div>
</div>
`;

  let deg1 = arr.list[0].wind.deg;
  let deg2 = arr.list[1].wind.deg;
  let deg3 = arr.list[2].wind.deg;
  let deg4 = arr.list[3].wind.deg;
  let deg5 = arr.list[4].wind.deg;

  let windNav1 = document.querySelector(".windNav1");
  windNav1.style = `transform: rotateZ(${deg1}deg);`;

  let windNav2 = document.querySelector(".windNav2");
  windNav2.style = `transform: rotateZ(${deg2}deg);`;

  let windNav3 = document.querySelector(".windNav3");
  windNav1.style = `transform: rotateZ(${deg3}deg);`;

  let windNav4 = document.querySelector(".windNav4");
  windNav4.style = `transform: rotateZ(${deg4}deg);`;

  let windNav5 = document.querySelector(".windNav5");
  windNav5.style = `transform: rotateZ(${deg5}deg);`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  drawTime();
  drawWeather();
  drawWeek();
  drawWind();
});

button.addEventListener("click", function () {
  nav();
});

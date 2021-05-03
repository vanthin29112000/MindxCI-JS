document.getElementsByClassName("btn-icon")[0].addEventListener("click",(e)=>{
    
    document.getElementsByClassName("header-background-dropdown")[0].style.display = "block";
})

document.getElementsByClassName("background-dropdown-close")[0].addEventListener("click",(e)=>{
    
    document.getElementsByClassName("header-background-dropdown")[0].style.display = "none";
})

function Loop_item(dem,temperature)
{
    let arr_date = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    for(let a of arr_date)
    {
        document.getElementsByClassName("body-background-bottom")[dem].innerHTML +=`<div class="body-background-bottom-item">
        <div class="body-background-bottom-item-boder">
            <div class="Date">`+a+`</div>
            <img src="./day_rain_thunder.png" alt="">
            <h2>26 &#176;C</h2>
        </div>
    </div>`;
    }
}

let array_city = [];
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

//usage:
readTextFile("./city.list.json", function(text){
  var data = JSON.parse(text);

  data.forEach(element => {
    if(element.country == "VN")
    {
      array_city.push(element);
    }
  });
  console.log(array_city);
});

function change_Input(name_id)
{
  document.getElementById(name_id).innerHTML = "";
  array_city.forEach(element => {
    document.getElementById(name_id).innerHTML += `<option value="`+element.name+`">`;
  });
  
}
function call_arae(name_id)
{
  let string_temp = document.getElementById(name_id).value ;
  array_city.forEach(element => {
    if(string_temp.localeCompare(element.name) == 0)
    {
      fetch_api_openweather(element.coord.lat,element.coord.lon,string_temp);
      console.log(element.coord.lon,element.coord.lat);
      return;
    }
  });
  document.getElementsByClassName("header-background-dropdown")[0].style.display = "none";
}

function value_date(date, month, year)
{
  array_week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  if (month <3) {
    month = month + 12;
    year = year - 1;
    }
    let n = ~~(date+2*month+(3*(month+1))/5 + year + (year/4))%7;
    return array_week[n];
}

function change_unix_to_utc(timestamp)
{
  let a = new Date(timestamp *1000);
  return value_date(a.getDate(), a.getMonth()+1, a.getFullYear());
}

function Loop_item_2(array,name_city)
{
  array_description = ["Clear","Clouds","Drizzle","Rain","Thunderstorm","Snow","Atmosphere"];
  array_img = ["./day_clear (1).png","./day_partial_cloud.png","./day_rain.png","./day_rain.png","./day_rain_thunder.png","./day_snow.png","./mist.png"];


  document.getElementsByClassName("body")[0].innerHTML = "";
  document.getElementsByClassName("body")[0].innerHTML = `<div class="content1">
    <div class="body-background body-background-top ">
        <div class="body-background-top-mobile">
            <p>Current Location</p>
            <p><h2>`+name_city+`, Vietnam</h2></p>
        </div>
        <div class="body-background-left">
            <img src="./day_rain_thunder.png" alt="">
            <div class="title">
                <h1 class="temperature">`+ array[0].temp.day+` &#176;C</h1>
                <p>Mostly Sunny</p>
                <p>Feel like `+ array[0].feels_like.day +` &#176;C</p>
            </div>
        </div>
        <div class="body-background-right-desktop ">
            <p>Current Location</p>
            <h2 class="temperature">`+name_city+`, Vietnam</h2>
        </div>
    </div>
    <div class=" body-background-bottom">
        
    </div>
</div>`;
  document.getElementsByClassName("body-background-bottom")[0].innerHTML = "";
    for(let i = 0;i<7;i++)
    {
      let link_img ="hi";
      for(let a =0; a<array_description.length;a++)
      {
        if(array[i].weather[0].main.localeCompare(array_description[a]) == 0)
        {
          link_img = array_img[a];
          console.log(a);
        }
      }
      console.log(link_img,array[i].weather[0].main);
      document.getElementsByClassName("body-background-bottom")[0].innerHTML +=`<div class="body-background-bottom-item">
      <div class="body-background-bottom-item-boder">
          <div class="Date">`+change_unix_to_utc(array[i].dt)+`</div>
          <img src="`+link_img+`" alt="">
          <h3>`+array[i].temp.day+` &#176;C</h3>
      </div>
      </div>`;
    }
}

function fetch_api_openweather(lat,lon,city)
{
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&exclude=hourly&appid=10a62d1428aa7227603dd8cb564e7b2a')
  .then(function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    // Read the response as json.
    return response.json();
  })
  .then(function(responseAsJson) {
    // Do stuff with the JSON
    console.log(responseAsJson.daily);
    let array_temp =  responseAsJson.daily;
    Loop_item_2(array_temp,city);
  })
  .catch(function(error) {
    console.log('Looks like there was a problem: \n', error);
  });
}
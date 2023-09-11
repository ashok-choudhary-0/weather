
function userLocation() {
  navigator.geolocation.getCurrentPosition(gotLocation);
}
userLocation();

async function apiData(input) {
  let apiKey = "82005d27a116c2880c8f0fcb866998a0";
  let url = (typeof (input) === "string") ? `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}` : `https://api.openweathermap.org/data/2.5/weather?lat=${input[0]}&lon=${input[1]}&appid=${apiKey}`
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function dynamicUiData(data) {
  const tempInCalvin = data.main?.temp;
  let tempInDegree = tempInCalvin - 273.15;
  tempInDegree = Math.round(tempInDegree);
  const iconCode = data.weather[0]?.icon;
  document.getElementById('image').src = `icons/${iconCode}.png`;
  document.getElementById("desc").innerHTML = data.weather[0]?.description
  document.getElementById("address").innerHTML = data?.name + ", ";
  document.getElementById("country").innerHTML = data?.sys.country;
  document.getElementById("temperature").innerHTML = tempInDegree + "°c";
}

function gotLocation(position) {
  let arr = [];
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  arr.push(latitude);
  arr.push(longitude);

  async function currentLocationData() {
    try {
      document.getElementById('image').src = "loader.gif";
      const data = await apiData(arr);
      dynamicUiData(data);
    } catch (err) {
      console.log(err)
    }
  }
  currentLocationData();
}

const customApiFunction = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82005d27a116c2880c8f0fcb866998a0`
}

async function handleSearch() {
  try {
    document.getElementById('image').src = "loader.gif";
    document.getElementById("weatherContainer").style.display = "flex"
    document.getElementById("error").style.display = "none"
    let inputValue = document.getElementById("input").value;
    const data = await apiData(inputValue)

    dynamicUiData(data);
    let timezone = data?.dt;

    if (timezone >= 1694006253 && timezone <= 1694063100) {
      document.getElementById("container").style.background = "black";
    } else {
      document.getElementById("container").style.background = "white";
    }

    if (data?.weather[0].description == "scattered clouds") {
      document.getElementById('container').style.backgroundImage = "url('blueCloud2.jfif')";
    } else if (data?.weather[0].description == "moderate rain" || data?.weather[0].description == "light intensity drizzle" || data?.weather[0].description == "heavy intensity drizzle" || data?.weather[0].description == "heavy intensity rain") {
      document.getElementById('container').style.backgroundImage = "url('rain2.png')";
    } else {
      document.getElementById('container').style.background = "white"
    }

  } catch (err) {
    document.getElementById('image').src = "loader.gif";
    document.getElementById("weatherContainer").style.display = "none"
    document.getElementById("error").style.display = "flex"
    document.getElementById("error").innerHTML = "City not Found 	&#128557;"
  }
}















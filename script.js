const helperFunction = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82005d27a116c2880c8f0fcb866998a0`
}

const handleSearch = async () => {
  let data;

  try {
    let inputValue = document.getElementById("input").value;
    inputValue = (inputValue === "") ? "noida" : inputValue;
    const response = await fetch(helperFunction(inputValue));
    data = await response.json();


    const tempInCalvin = data.main?.temp;
    let tempInDegree = tempInCalvin - 273.15;
    tempInDegree = Math.round(tempInDegree);
    const iconCode = data.weather[0]?.icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    document.getElementById('image').src = iconUrl;
    document.getElementById("desc").innerHTML = data.weather[0]?.description
    document.getElementById("address").innerHTML = data?.name + ", ";
    document.getElementById("country").innerHTML = data?.sys.country;
    document.getElementById("temperature").innerHTML = tempInDegree + "°c";
    let timezone = data?.dt;
    console.log(data)



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
    console.log(err);
    document.getElementById("weatherContainer").style.display = "none"
    document.getElementById("error").style.display = "flex"
    document.getElementById("error").innerHTML = "City not Found 	&#128557;"

  }
}
handleSearch();


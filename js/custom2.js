class Weather {

  //constructor

  constructor({
    longitude = null,
    latitude = null
  } = {}) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.data = {

    }
  }

  //Getters and Setters

  getLongitude() {
    return this.longitude;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
  }

  getLatitude() {
    return this.latitude;
  }

  setLatitude(latitude) {
    this.latitude = latitude;
  }

  //GetLocation
  getLocation() {
    if (Modernizr.geolocation) {
      //if locatin is enabled, show position in button
      navigator.geolocation.getCurrentPosition(this.success.bind(this), this.fail, this.options);
    } else {
      alert("Sorry, you browser doesn't have geolocation");
    }
  }

  success(position) {
    console.log("Valeur de l'objet",this)
    const pos = position.coords;
    // console.log('Your actual position is :');
    // console.log(`Latitude : ${pos.latitude}`);
    // console.log(`Longitude: ${pos.longitude}`);
    // console.log(`More or less ${position.coords.accuracy} meters.`);
    this.setLongitude(pos.longitude);
    this.setLatitude(pos.latitude);
    let self = this;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.getLatitude()}&lon=${this.getLongitude()}&APPID=6c67991682fb9f46e28a78336a9f601f`;
    var ajax = $.getJSON(url, (data, self) => {
      console.log("Getting data...");
    }).done((data) =>{
      console.log(data);
      this.data.temperature = parseInt((data.main.temp - 273.15).toFixed(1), 10);
      this.data.humidity = data.main.humidity;
      this.data.name = data.name;
      this.displayData();
    });
  }

  fail() {
    console.log('User refused to give position');
    alert('You need to give your position to make it work');
  }

  pushData(temp){
    this.data.temperature = temp;
  }

  displayData() {
    console.log(`La température de ${this.data.name} est de ${this.data.temperature}°C et l'humidité est de ${this.data.humidity}%.`);
  }
}

let City = new Weather();
City.getLocation();

//6c67991682fb9f46e28a78336a9f601f
//http://api.openweathermap.org/data/2.5/weather?lat=47.3329934&lon=5.018274000000019&APPID=6c67991682fb9f46e28a78336a9f601f

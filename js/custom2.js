class Weather {

  //constructor

  constructor({longitude = null, latitude = null} = { }) {
    this._longitude = longitude;
    this._latitude = latitude;
    this._options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this._data = {

    }
  }

  //Getters and Setters

  get Longitude() {
      return this._longitude;
  }

  set Longitude(longitude) {
      this._longitude = longitude;
  }

  get Latitude() {
      return this._latitude;
  }

  set Latitude(latitude) {
      this._latitude = latitude;
  }

  get Name() {
      return this._data.name;
  }

  get Temp() {
      return this._data.temp;
  }

  set Temp(temp) {
      this._data.temp = temp;
  }

  get TempMin() {
      return this._data.temp_min;
  }

  set TempMin(temp) {
      this._data.temp_min = temp;
  }

  get TempMax() {
      return this._data.temp_max;
  }

  set TempMax(temp) {
      this._data.temp_max = temp;
  }

  get Humidity() {
      return this._data.humidity;
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

  //if location has been successfully aquired
      success(position) {
            const pos = position.coords;
            this.Longitude = pos.longitude;
            this.Latitude = pos.latitude;
            this.getAjax();
      }
  //else...
      fail() {
            console.log('User refused to give position');
            alert('You need to give your position to make it work');
      }

  //Method to call the API
      getAjax() {
        let self = this;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.Latitude}&lon=${this.Longitude}&APPID=6c67991682fb9f46e28a78336a9f601f`;
        var ajax = $.getJSON(url, (data, self) => {
          console.log("Getting data...");
        }).done((data) => {
          //When done...
          self.pushData(data); //Push data to the object
          this.Temp = this.KelvinToCelsius(this.Temp);
          this.TempMin = this.KelvinToCelsius(this.TempMin);
          this.TempMax = this.KelvinToCelsius(this.TempMax);
          // this.KelvinToCelsius(this.Temp); //Convert temp to °C
          // tthis.KelvinToCelsius(this.TempMin); //Convert min temp to °C
          // this.KelvinToCelsius(this.TempMax); //Convert max temp to °C
          // this.CelsiusToFahrenheit(temp);

          this.displayData();
        });
      }

      //method to convert Kelvin to Celsius
    KelvinToCelsius(value) {
        let celsius = parseInt(value - 273.15);
        return celsius;
    }

  CelsiusToFahrenheit(value) {
    let fahrenheit = (value * (9 / 5) + 32);
    console.log("Fahrenheit", fahrenheit);
  }

  //Method to push data
  pushData(value) {
      this._data.name = value.name;
      this._data.temp = value.main.temp;
      this._data.temp_min = value.main.temp_min;
      this._data.temp_max = value.main.temp_max;
      this._data.humidity = value.main.humidity;
  }
  //Display Method
  displayData() {
    console.log(this);
    console.log(`La température de ${this.Name} est de ${this.Temp}°C et l'humidité est de ${this.Humidity}%.`);
  }
}

let City = new Weather();
City.getLocation();



//6c67991682fb9f46e28a78336a9f601f
//http://api.openweathermap.org/data/2.5/weather?lat=47.3329934&lon=5.018274000000019&APPID=6c67991682fb9f46e28a78336a9f601f

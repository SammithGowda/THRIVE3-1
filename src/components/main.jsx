import "../App.css";
import { ImLocation, ImSearch } from "react-icons/im";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
export const Main = () => {
  const [place, setPlace] = useState("");
  const [data, setData] = useState({
    coord: { lat: "", lon: "" },
    main: "",
    sys: "",
    timezone: "",
  });
  // const [userlocation, setUserlocation] = useState();
  const [dailyforcastdata, setDailyforcastdata] = useState([]);

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };
  function success(pos) {
    const { latitude, longitude } = pos.coords;
    const location = {
      lat: latitude,
      lon: longitude,
    };
    dailyforcast(location);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    // console.log("useef 1");
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    search();

    // dailyforcast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);
  const sumfunc = (params1, params2) => {
    // console.log(params1, params2);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${params1}&lon=${params2}&exclude=hourly&appid=ffad48f0f537175523e6baaf8924ef0f&&units=metric`
      )
      .then((res) => setDailyforcastdata(res.data))
      .catch((er) => console.log(er));
  };
  const search = (event) => {
    // console.log(event.key);

    if (!place) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=ffad48f0f537175523e6baaf8924ef0f&&units=metric`
    )
      .then((res) => res.json())
      .then(
        (res) =>
          setData(
            {
              coord: { lat: res.coord.lat, lon: res.coord.lon },
              main: res.main,
              sys: res.sys,
              timezone: res.timezone,
            },
            sumfunc(res.coord.lat, res.coord.lon)
          )
        // console.log(res)
      );
  };
  const clearfun = (e) => {
    if (e.key === "Backspace") {
      setDailyforcastdata([]);
      setData({
        coord: { lat: "", lon: "" },
        main: "",
        sys: "",
        timezone: "",
      });
    }
  };
  const dailyforcast = (userlocation) => {
    const location = `https://api.openweathermap.org/data/2.5/onecall?lat=${userlocation.lat}&lon=${userlocation.lon}&exclude=hourly&appid=ffad48f0f537175523e6baaf8924ef0f&&units=metric`;
    const lname = `https://us1.locationiq.com/v1/reverse.php?key=pk.094534d9e6252d151e352d9ad7a8ba56&lat=+
    ${userlocation.lat} + &lon= +${userlocation.lon}+ &format=json`;

    const reqone = axios.get(location);
    const reqtwo = axios.get(lname);

    axios.all([reqone, reqtwo]).then(
      axios.spread((...res) => {
        setDailyforcastdata(res[0].data);
        setPlace(res[1].data.address.city);
      })
    );
  };
  const displaydate = (d) => {
    // const months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const day = days[d.getDay()];
    // const month = months[d.getMonth()];
    // const date = d.getDate();
    // const year = d.getFullYear();

    return ` ${day}`;
  };
  console.log(dailyforcastdata, "1");
  console.log(data, "2");

  return (
    <>
      <div className="maindiv">
        <div className="searchBar">
          <div className="location_icon_div">
            <ImLocation className="react_iCon" />
          </div>
          <div className="location_input_div">
            <input
              onChange={(e) => setPlace(e.target.value)}
              onKeyDown={(e) => clearfun(e)}
              type={"text"}
              placeholder="Enter Location"
            />
          </div>
          <div className="location_search_button">
            <button>
              <ImSearch className="react_iCon" />
            </button>
          </div>
        </div>

        <div className="daily-report-div">
          {dailyforcastdata.length === 0 ? (
            <div></div>
          ) : (
            dailyforcastdata.daily.map((el) => (
              <div className="daily-tempdiv">
                <span>
                  {displaydate(new Date(el.dt * 1000 - data.timezone * 1000))}
                </span>
                <br />
                <img
                  src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`}
                  alt=""
                />
                <br />
                <span>{`MaxTemp ${el.temp.max}`} </span>
                <br />
                <span>{`MinTemp ${el.temp.min}`}</span>
              </div>
            ))
          )}
        </div>
        {Object.keys(dailyforcastdata).length === 0 && data.main === "" ? (
          <div></div>
        ) : Object.keys(dailyforcastdata).length !== 0 && data.main === "" ? (
          <div className="daily-details">
            <div>
              <h1>{`${dailyforcastdata.current.temp}°C`}</h1>
              <p>{`Pressure ${dailyforcastdata.current.pressure}`}</p>
            </div>
            <div>
              {" "}
              <h1>{`${dailyforcastdata.current.humidity}% Humidity`}</h1>
              <p>{`Sunrise ${dailyforcastdata.current.sunrise}`}</p>
              <p>{`Sunset ${dailyforcastdata.current.sunset}`}</p>
            </div>
          </div>
        ) : Object.keys(dailyforcastdata).length !== 0 && data.main !== "" ? (
          <div className="daily-details">
            <div>
              <p>{`Temp ${data.main.temp}°C`}</p>
              <p className="only_p">{`Pressure ${data.main.pressure}`}</p>
            </div>
            <div>
              <p>{`${data.main.humidity}% Humidity`}</p>

              <p className="only_p">{`Sunrise ${moment
                .unix(data.sys.sunrise)
                .format("hh:mm:ss")}`}</p>
              <p className="only_p">{`Sunset ${moment
                .unix(data.sys.sunset)
                .format("hh:mm:ss")}`}</p>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="map_div">
          {place ? (
            <iframe
              title="my unique app"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA0ttYe6gb0q-spi6rdZY0PRxr9Pi8nRRE&q=${place}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

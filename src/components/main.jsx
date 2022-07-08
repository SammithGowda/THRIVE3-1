import "../App.css";
import { ImLocation, ImSearch } from "react-icons/im";
import { useState, useEffect } from "react";

export const Main = () => {
  const [place, setPlace] = useState("");
  const [data, setData] = useState({
    coord: { lat: "", lon: "" },
    main: "",
    sys: "",
    timezone: "",
  });
  useEffect(() => {
    search();
    // dailyforcast(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);
  const search = (event) => {
    console.log(event.key);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=ffad48f0f537175523e6baaf8924ef0f&&units=metric`
    )
      .then((res) => res.json())
      .then(
        (res) =>
          setData({
            coord: { lat: res.coord.lat, lon: res.coord.lon },
            main: res.main,
            sys: res.sys,
            timezone: res.timezone,
          })
        // console.log(res)
      )
      .catch((er) => console.log(er, "im er"));
  };
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
              type={"text"}
              placeholder="Enter Location"
            />
          </div>
          <div className="location_search_button">
            <button onClick={() => search()}>
              <ImSearch className="react_iCon" />
            </button>
          </div>
        </div>

        {data.main === "" ? (
          <div></div>
        ) : (
          <div className="daily-details">
            <div>
              <h1>{`${data.main.temp}°C`}</h1>
              <p>{`Pressure${data.main.pressure}`}</p>
            </div>
            <div>
              {" "}
              <h1>{`${data.main.humidity}% Humidity`}</h1>
              <p>{`Sunrise${data.sys.sunrise}`}</p>
              <p>{`Sunset${data.sys.sunset}`}</p>
            </div>
          </div>
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
            <div>
              {/* <img
                src="/rain-umbrella.gif"
                alt="gif"
                width={"50%"}
                style={{ marginTop: "50px" }}
              /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

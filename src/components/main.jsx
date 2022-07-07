import "../App.css";
import { ImLocation, ImSearch } from "react-icons/im";
import { useState, useEffect } from "react";

export const Main = () => {
  const [place, setPlace] = useState("");
  //   const [data, setData] = useState({
  //     coord: { lat: "", lon: "" },
  //     main: "",
  //     sys: "",
  //     timezone: "",
  //   });
  useEffect(() => {
    // search();
    // dailyforcast(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);
  const search = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=ffad48f0f537175523e6baaf8924ef0f&&units=metric`
    )
      .then((res) => res.json())
      .then((res) =>
        //   setData({
        //     coord: { lat: res.coord.lat, lon: res.coord.lon },
        //     main: res.main,
        //     sys: res.sys,
        //     timezone: res.timezone,
        //   })
        console.log(res)
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
      </div>
    </>
  );
};

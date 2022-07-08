import { useEffect, useState } from "react";
import axios from "axios";
export const Example = () => {
  const [obj, setObj] = useState({
    lat: "",
    lon: "",
  });
  const lagandlat = obj.lat + "," + obj.lon;
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    const crd = pos.coords;
    setObj({ lat: crd.latitude, lon: crd.longitude });
    console.log(pos);
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function errors(err) {
    console.log(err);

    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            console.log("prompt");
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
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=12.96629766&lon=77.6208384&exclude=hourly&appid=ffad48f0f537175523e6baaf8924ef0f&&units=metric`
      )
      .then((res) => console.log(res.data))
      .catch((er) => console.log(er));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(lagandlat);
  return (
    <div className="App">
      <iframe
        title="my unique app"
        src={`https://maps.googleapis.com/maps/api/staticmap?center=Pune,CA&zoom=12&size=600x400&key=AIzaSyA0ttYe6gb0q-spi6rdZY0PRxr9Pi8nRRE`}
        alt="sdfsdaf"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

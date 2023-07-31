import React, { useEffect, useState } from "react";
import img1 from "../image/search.png";
// import img2 from "../image/1.png";
import img3 from "../image/3.png";
import img4 from "../image/4.png";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "london",
    humidity: "10",
    speed: "2",
    image:'image/sun.png'
  });

  const [input,setInput]=useState('')

  const handlesubmit=()=>{
    if(input!==''){
        const Apiurl =
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=d28af2e31cdba509dc115d00ed2b8c92&&units=metric`;
  
      axios
        .get(Apiurl)
        .then((response) => {
        let imgpath=''
        //   console.log(response.data);
        if(response.data.weather[0].main==='Clouds'){
            imgpath='image/sun.png'
        }else if(response.data.weather[0].main==='Clear'){
            imgpath='image/suncloud.png'
        }else if(response.data.weather[0].main==='Rain'){
            imgpath='image/rain.png'
        }
        else if(response.data.weather[0].main==='Drizzle'){
            imgpath='image/drizzling.png'
        }else if(response.data.weather[0].main==='Mist'){
            imgpath='image/1.png'
        }else{
            imgpath='image/cloudsun.png'
        }
          setData({
            ...data,
            celcius: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            speed: response.data.wind.speed,
            image:imgpath
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="container">
        <h2 style={{textAlign:'center',color:'white'}}>Weather Application</h2>
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter city name.."
           value={input}
           onChange={(e)=>setInput(e.target.value)}
           />
          <button>
            <img src={img1} alt="cloud_img" onClick={handlesubmit}/>
          </button>
        </div>

        <div className="info">
          <img src={data.image} alt="cloud_img" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
        </div>
        <div className="detailes">
          <div className="col">
            <img src={img3} alt="humodity_img" />
            <div className="humidity">
              <p>{data.humidity}</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src={img4} alt="wind_img" />
            <div className="wind">
              <p>{Math.round(data.speed)} km/h</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

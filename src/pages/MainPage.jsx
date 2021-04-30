import React, { useEffect, useState } from "react";
import axios from "axios";

//import componets
import styled from "styled-components";
import Select from "react-select";


//import images
import Patten_1 from "../assets/img/pattern_1.svg";
import Patten_2 from "../assets/img/pattern_2.svg";
import BasicShape from "../assets/img/basic_shape.svg";
import BasicShape_2 from "../assets/img/uj_varos.svg";
import Illustration from "../assets/img/illustration.svg";
import Triangle_1 from "../assets/img/triangle_1.svg";
import Triangle_2 from "../assets/img/triangle_2.svg";
import City from "../components/City";
//style
const StyledMainPage = styled.div`
  display: flex;
  margin: 5% 0 0 10%;
  .pattern {
    width: 321px;
  }
  .pattern1 {
    margin-bottom: -4px;
  }
  .main-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 322px;
    height: 130px;
    background-image: url(${BasicShape});
    position: relative;
    .Triangle_1 {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 90%;
      left: 50%;
      transform: translate(-50%);
      z-index: 1;
    }
    .main-input {
      input {
        width: 200px !important;
      }
      p {
        padding: 0;
        margin: 0 0 5px 4px;
      }
    }
  }
  .secondary-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 322px;
    height: 170px;
    background-image: url(${BasicShape_2});
    position: relative;
    .Triangle_2 {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 40%;
      right: -5%;
      /* transform: translate(-50%); */
      z-index: 22;
    }
    .secondary-input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      input {
        width: 260px !important;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 4px;
        border: none;
        outline: none;
        margin: 5px 0 13px 0;
      }
      p {
        padding: 0;
        margin: 0 0 5px 4px;
      }
      button {
        width: 260px;
        height: 34px;
        background-color: #80ba27;
        color: white;
        font-size: 1rem;
        border-radius: 5px;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .illustarion {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 160px;
    img {
      width: 299px;
      height: 204px;
    }
  }
  .right-hand-side {
    background-color: white;
    width: 652px;
    height: 771px;
    .state {
      height: 70px;
      background-color: #dce7ff;
      .header {
        margin-left: 100px;
        display: flex;
        align-items: center;
        height: 100%;
        color: #6d9bff;
        p {
          margin-left: 50px;
          color: #88acfa;
        }
      }
      .content {
        margin: 80px 0 0 73px;
        display: flex;
       
        h2 {
          margin-right: 50px;
          color: #8ec13e;
        }
      }
    }
  }
`;

const SytledCityContainer = styled.div`
display: flex;
flex-direction: column;
`

const MainPage = () => {
  const [state, setState] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState()
  const [city, setCity] = useState()
  const [newCityInput, setNewCityInput] = useState()
  const [inputValue, setInputValue] = useState();
  
  //functions
  useEffect(() => {
    axios({
      url: "https://probafeladat-api.zengo.eu/api/all_states",
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: "56b83b5517fba747f746e5d0a37d23a4",
      },
    })
      .then((data) => {
        const arr = [];
        data.data.data.forEach((d) => {
          arr.push({ id: d.id, label: d.name, value: d.name });
        });
        setState(arr);
      })
      .catch(() => {
        console.log("fail");
      });
  }, []);
  useEffect(()=>{
    if(selectedState !== undefined){
      axios({
        url: "https://probafeladat-api.zengo.eu/api/state_city",
            method: "POST",
            headers: {
              "Content-Type": "form-data",
              token: "56b83b5517fba747f746e5d0a37d23a4",
            },
            params: {
             'state_id': selectedState.id,
            }
      }).then((data) => {
        setCity(data.data.data)
      })
    }
  }, [selectedState])

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const addCity = () => {
    if (inputValue !== null) {
     axios(
        {
          url: "https://probafeladat-api.zengo.eu/api/city",
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: "56b83b5517fba747f746e5d0a37d23a4",
          },
         params: {
           "name": inputValue,
           "state_id": selectedState.id
         }
        }
      ).then(()=>{
        axios({
          url: "https://probafeladat-api.zengo.eu/api/state_city",
              method: "POST",
              headers: {
                "Content-Type": "form-data",
                token: "56b83b5517fba747f746e5d0a37d23a4",
              },
              params: {
               'state_id': selectedState.id,
              }
        }).then((data) => {
          setCity(data.data.data)
          setInputValue('')
        })
      }).catch(() => {
        console.log('err')
      });
    } else {
      alert("Tolsd ki a mezot!");
    }
  };
  const deleteCity = () => {
    axios({
      url: "https://probafeladat-api.zengo.eu/api/city",
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: "56b83b5517fba747f746e5d0a37d23a4",
      },
      params: {
          "city_id": selectedCity
      }
    }).then(()=>{
      axios({
        url: "https://probafeladat-api.zengo.eu/api/state_city",
            method: "POST",
            headers: {
              "Content-Type": "form-data",
              token: "56b83b5517fba747f746e5d0a37d23a4",
            },
            params: {
             'state_id': selectedState.id,
            }
      }).then((data) => {
        setCity(data.data.data)
      })
    })
  };

  const changeCity = () => {
    axios({
      url: "https://probafeladat-api.zengo.eu/api/city",
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: "56b83b5517fba747f746e5d0a37d23a4",
      },
      params: {
        "name": newCityInput,
        "city_id": selectedCity
    }
    }).then(()=>{
      axios({
        url: "https://probafeladat-api.zengo.eu/api/state_city",
            method: "POST",
            headers: {
              "Content-Type": "form-data",
              token: "56b83b5517fba747f746e5d0a37d23a4",
            },
            params: {
             'state_id': selectedState.id,
            }
      }).then((data) => {
        setCity(data.data.data)
      })
    });
  };

  const handleClick = (e) => {
    setSelectedCity(e.target.id)
  }
  const handleNewCityInput = (e) =>{
    setNewCityInput(e.target.value)
  }
  
  return (
    <StyledMainPage>
      <div className="left-hand-side">
        <div className="pattern1">
          <img className="pattern" src={Patten_1} alt="pattern1" />
        </div>
        <div className="main-input-container">
          {selectedState === undefined ? null : (
            <img className="Triangle_1" src={Triangle_1} alt="Triangle_1" />
          )}
          <div className="main-input">
            <p>MEGYE</p>
            <Select
              placeholder="Valassz Megyet"
              onChange={setSelectedState}
              options={state}
            />
          </div>
        </div>
        {selectedState !== undefined ? (
          <div className="secondary-input-container">
            <img className="Triangle_2" src={Triangle_2} alt="Triangle_2" />
            <div className="secondary-input">
              <p>ÚJ VÁROS</p>
              <input
                type="text"
                placeholder="Települlés neve"
                onChange={handleChange}
              />
              <button onClick={addCity}>FELVESZEM</button>
            </div>
          </div>
        ) : null}
        <div className="pattern2">
          <img className="pattern" src={Patten_2} alt="pattern2" />
        </div>
      </div>
      <div
        className={
          selectedState !== undefined ? "right-hand-side" : "illustarion"
        }
      >
        {selectedState !== undefined ? (
          <div className="state">
            <div className="header">
              <h2>MEGYE</h2>
              <p>{selectedState.label}</p>
            </div>
            <div className="content">
              <h2>VÁROSOK</h2>
              <SytledCityContainer>
             {city ? city.map(d =>  <City city={d} key={d.id} deleteCity={deleteCity} handleClick={handleClick} changeCity={changeCity} handleNewCityInput={handleNewCityInput}  />) : null}
             </SytledCityContainer> 
            </div>
          </div>
        ) : (
          <img src={Illustration} alt="" />
        )}
      </div>
    </StyledMainPage>
  );
};

export default MainPage;

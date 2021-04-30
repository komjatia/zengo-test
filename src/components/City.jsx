import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';



const StyledCity = styled.div`
          display: flex;
          margin: 5px;
          p {
            width: 200px;
            padding: 0.2rem;
            font-size: 1.2rem;
          }
          .active {
            border: 1px solid black;
            cursor: pointer;
          }
          .icons {
            margin-left: 20px;
            width: 120px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            .icon {
              width: 34px;
              height: 34px;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
            .trash {
              background-color: #e85128;
            }
            .cross {
              background-color: #9b9b9b;
            }
            .pipa {
              background-color: #80ba27;
            }
          }
          input {
        width: 200px !important;
        padding: 0.2rem;
        font-size: 1.2rem;
        border-radius: 4px;
        border: 1px solid black;
        outline: none;
      
      }
        
`

const City = ({city, deleteCity, handleClick,changeCity, handleNewCityInput}) => {
    const [clickedCity, setClickedCity] = useState();

    const customizeCity = () => {
        setClickedCity(true);
      };
    
      
      const abortCity = () => {
        setClickedCity(false);
      };
    return (
       
        <StyledCity onClick={handleClick}>
                {clickedCity ? (
                    <>
                    <input type="text" onChange={handleNewCityInput} onClick={handleClick} id={city.id}/>
                  <div className="icons">
                    <div className="trash icon" onClick={deleteCity}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                    <div className="pipa icon">
                      <FontAwesomeIcon icon={faCheck} onClick={changeCity} />
                    </div>
                    <div className="cross icon">
                      <FontAwesomeIcon icon={faTimes} onClick={abortCity} />
                    </div>
                  </div>
                  </>
                ) :  <p
                onClick={customizeCity}
                id={city.id}
                >{city.name}</p>}
              </StyledCity>
    );
}

export default City;

import React from 'react';

//import componets
import styled from 'styled-components'

//import images
import HeaderImg from '../assets/img/header.png'

const StyledHeader = styled.div`
width: 100%;
max-height: 5rem;
img{
    width: 100%;
    height: 100%;
}
`


const Header = () => {
    return (
        <StyledHeader>
            <img src={HeaderImg} alt="zengo header"/>
        </StyledHeader>
    );
}

export default Header;

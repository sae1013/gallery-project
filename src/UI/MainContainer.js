import React from 'react'
import styled from 'styled-components';

function MainContainer(props) {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    margin-top: 70px;
    padding-bottom:30px;
    min-width:767px;
    min-height:100vh;
    height:100%;
    position: relative;
    background-color: #ECEFF3;

`;
export default MainContainer

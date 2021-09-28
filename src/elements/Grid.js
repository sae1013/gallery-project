import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  return <GridBox {...props}></GridBox>
  
}

const GridBox = styled.div`
  background-color: ${(props)=>props.backgroundColor || 'white'};
  width:${props => props.width || '100%'};
  height:${props => props.height || 'auto'};
  display: ${props => props.display || 'block'};
  justify-content: ${props=>props.justifyContent || null};
  align-items: ${props=>props.alignItems || null};
  margin: ${props => props.margin || '10px'};
  padding: ${props => props.padding || '5px'};
  border-radius: ${props => props.borderRadius || '0px'};
  animation : ${props => props.skeleton ? "skeleton-loading 1s linear infinite alternate":null};
 
  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200,20%,70%);
    }
    
    100% {
      background-color: hsl(200,20%,95%);
    }
}
`;

export default Grid;
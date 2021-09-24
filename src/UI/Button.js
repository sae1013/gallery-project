import React from 'react'
import styled from 'styled-components';

function Button({children,onClick,...styleProps}) { 
  
  return (
    <div onClick={onClick}> 
      <ButtonStyle {...styleProps}>{children}</ButtonStyle>
    </div>
  )
}
 
const ButtonStyle = styled.button`
  width:${props => props.width ? props.width : 'auto'};
  height:${props => props.height ? props.height: 'auto'};
  text-decoration: none;
  border: 1px solid #0B72B9;
  background:${(props)=>props.backgroundColor ? props.backgroundColor :'#0B72B9'};
  color:${props => props.color ? props.color : "#fff"};
  padding: ${props => props.padding ? props.padding : '15px 20px'};
  transition: all 0.1s;
  border-radius: 15px;
  display: ${props => props.display ? props.display : 'inline-block'};
  margin: ${props => props.margin ? props.margin : '10px 0'};
  font-size: ${props => props.fontSize? props.fontSize : '13px'};
  
  &:hover {
    opacity:0.8
  }
  &:active {
    transform: translate(0,5px);
  }
`;
export default Button


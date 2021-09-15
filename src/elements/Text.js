import React from 'react'
import styled from 'styled-components';

function Text(props) {
    return (
        <P {...props}></P>
    )
}

export default Text

Text.defaultProps = {
    bold: false,
    color: '#222831',
    size:'14px',
}

const P = styled.p`
    color: ${props => props.color};
    font-size:${props => props.size};
    font-weight:${props=> props.bold ? "600": "400"};   
    ${props => props.margin ? `margin:${props.margin};`: ''}
`;

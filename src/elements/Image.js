import styled from 'styled-components';
import React from "react";

const Image = (props) => {
    const {shape, src, size,width,height} = props;
    
    const styles = {
        size,width,height,src
    }
    
    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }
    if(shape === "fixed-rectangle"){
        return (
            <FixedImage {...styles}></FixedImage>
        )
    }
}

Image.defaultProps = {
  shape: "circle",
  src: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  size: 36,
};

const FixedImage = styled.div`
    width:${props=>props.width};
    height:${props=>props.height};
    background-image: url(${(props) => props.src});
    overflow: hidden;
    background-size: contain;
`;

const AspectOutter = styled.div`
    width: 80%;
    min-width: 250px;
    margin: 0 auto;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: contain;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: contain;
    margin: 4px;
`;

export default Image;

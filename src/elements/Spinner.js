import React from 'react'
import { css } from "@emotion/react";
import {SyncLoader,ClockLoader} from "react-spinners";
import classes from './Spinner.module.scss';

function Spinner(props) {
    if(props.shape == 'syncLoader'){
        return (
            <div className={classes.container}>
                <SyncLoader color={props.color} loading={props.loading} size={props.size}></SyncLoader>
            </div>
        )    
    }
    if(props.shape == 'clockLoader'){
        return (
            <div>
                <ClockLoader color={props.color} loading={props.loading} size={props.size}></ClockLoader>
            </div>
        )
    }
    
}

export default Spinner

import React from 'react'
import Grid from '../elements/Grid';
import classes from './SkeletonListView.module.scss';

function SkeletonListView(props) { 

  const arr = [...new Array(props.size).keys()]

  return (
    <React.Fragment> 
      {arr.map(()=> {
        return (
            <div className={classes.card}>
                <Grid display="flex" alignItems="center" margin="0px"> 
                  <Grid width="35px" height="35px" borderRadius="50%" backgroundColor="hsl(200,20%,70%)" skeleton></Grid> 
                  <Grid margin="0 10px" width="70%" height="15px" backgroundColor="hsl(200,20%,70%)" skeleton></Grid>
                </Grid>
                <hr></hr>
                <Grid padding="16px">
                    <Grid width="70%" height="15px" backgroundColor="hsl(200,20%,70%)" skeleton></Grid>
                </Grid>
                <Grid width="80%" height="250px" padding ="30px" backgroundColor="hsl(200,20%,70%)" margin="0 auto" skeleton/>
                <Grid height="100px" ></Grid>
            </div>
        )
      })}
    </React.Fragment>
  )
}
export default SkeletonListView;

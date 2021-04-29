import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Material-UI imports
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Custom Components
import Nav from '../Nav/Nav'
import './Admin.css';

function AdminCreate() {
  const history = useHistory();
  const dispatch = useDispatch();

  // State Variables
  const [leagueName, setLeagueName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

function handleSubmit() {
  dispatch({
    type: 'CREATE_NEW_LEAGUE',
    payload: { leagueName, startDate, endDate }
  })
    history.push(`/admin/leagues`)
} // end handleSubmit

  return (
    <>
    <Nav />
    <Grid
      container
      item
      xs={12}
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >

        <Grid item xs={6}>
          <h1>Create a League</h1>
        </Grid>

      </Grid>
      
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        {/* League name textbox */}
        <Grid item xs={12}>
          <p>League Name:</p>
        </Grid>
        <Grid> 
          <TextField
            id="outlined-basic"
            type= "text"
            label="League Name" 
            variant="outlined"
            onChange={(event) => setLeagueName(event.target.value)} 
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >

        {/* Start Date Input */}
        <Grid item xs={12}>
          <p>Start date:</p>
        </Grid>
        <Grid item xs={12}>
          <TextField 
          variant="outlined"
          color="primary"
          type="date"
          onChange={(event) => setStartDate(event.target.value)} 
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >

        {/* End Date Input */}
        <Grid item={12}>
          <p>End Date: </p>
        </Grid>
        <Grid item={12}>
          <TextField
          variant="outlined"
          color="primary"
          type="date"
          onChange={(event) => setEndDate(event.target.value)} 
          />
        </Grid>
      </Grid>
      <br></br>

      
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit} >
            Create League
          </Button>
        </Grid>
      </Grid>
      
    </Grid>
    </>
  );
}

export default AdminCreate;

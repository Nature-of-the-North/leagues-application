import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

// Material-UI imports
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Custom Components
import './Admin.css';
import Nav from '../Nav/Nav'

function AdminEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams() // this is the param id

  // Redux Store
  const leaguesInfo = useSelector ((store) => store.leaguesReducer);

  // State Variables
  const [leagueName, setLeagueName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('')

  // Save the edited league info
  function saveResults() {
    dispatch({
      type: 'UPDATE_LEAGUE',
      payload: {
        leagueName: leagueName,
        startDate: startDate,
        endDate: endDate,
        leagueId: id
      }
    })
    history.push('/admin/leagues')
  }; // end saveResults

  useEffect(() => {
    findLeague();
  }, [setLeagueName])

  // this is going to see if the id we clicked on from the admin leagues matches the id of the league 
  const findLeague = () => {
    for(let league of leaguesInfo) {
      if(league.id == id) {
        console.log('its a match!');
        setLeagueName(league.name)
        setStartDate(moment(league.start).format('YYYY-MM-DD'))
        setEndDate(moment(league.end).format('YYYY-MM-DD'))
      }
    }
  }; // end findLeague

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
          <h1>Edit a League</h1>
        </Grid>
      </Grid>
      
    
      <form >
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="center"
      >

        {/* League Name Input */}
        <Grid>
          <p>League Name:</p>
        </Grid>
        <Grid>
          <TextField
            id="outlined-basic"
            label="League Name"
            variant="outlined"
            value={leagueName}
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
          value={startDate}
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
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          />
        </Grid>
      </Grid>
      <br></br>

      {/* Save and Delete Buttons */}
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid>
          <Button variant="contained" color="primary" onClick={saveResults}  >
            Save
          </Button>

          <Button variant="contained" color="primary" onClick={() => history.push('/admin/leagues')}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
    </Grid>
    </>
  );
}

export default AdminEdit;

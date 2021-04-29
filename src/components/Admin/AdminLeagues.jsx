import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Material-UI imports
import { Grid } from '@material-ui/core';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

// Custom Components
import './Admin.css';
import Nav from '../Nav/Nav';

function AdminLeagues() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Redux Store
  const leaguesInfo = useSelector((store) => store.leaguesReducer);
  const user = useSelector((store) => store.user);

  // State Variables
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteName, setDeleteName] = useState('');


  // Push to the Create League page
  function createNewLeague() {
    history.push(`/admin/leagues/new`);
  }; // end createNewLeague


  // Push to the Edit League page
  function handleEdit(leagueId) {
    history.push(`/admin/leagues/edit/${leagueId}`);
  }; // end handleEdit

  function handleDelete(leagueId) {
    console.log('what is the id', leagueId);
    dispatch({
      type: 'DELETE_LEAGUE',
      payload: leagueId,
    });
    handleClose();
  }; // end handleDelete

  // on Delete click, open the delete confirmation pop up
  const handleClickOpen = (leaguesID, leagueName) => {
    console.log('what is the id in handleClickOpen', leaguesID);
    console.log('what is the name in handleClickOpen', leagueName);
    setDeleteId(leaguesID)
    setDeleteName(leagueName)
    setOpen(true);
  }; // end handleClickOpen

  // close the delete confirmation pop up
  const handleClose = () => {
    setOpen(false);
  }; // end handleClose


  return (

    user.authLevel === 'ADMIN' ?
    <Grid
      container
      xs={12}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Nav />
      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <h1>Leagues</h1>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button variant="outlined" color="primary" onClick={createNewLeague}>
          Create a League
        </Button>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <h2>League</h2>
        </Grid>

        <Grid item xs={2}>
          <h2>Start Date</h2>
        </Grid>

        <Grid item xs={2}>
          <h2>End Date</h2>
        </Grid>

        <Grid item xs={2}>
          <h2>Status</h2>
        </Grid>

        <Grid item xs={2}>
        </Grid>
      </Grid>

      {/* iLeagues stands for individual leagues */}
      {leaguesInfo.map((iLeagues) => {
        return (
          <Grid
            container
            item
            xs={12}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {/* League Name */}
            <Grid item xs={2} key={iLeagues.name} >
              <h3 className="leagueTitle">{iLeagues.name}</h3>
            </Grid>

            {/* Start Date */}
            <Grid item xs={2} key={iLeagues.start}>
              <p>{moment(iLeagues.start).format('MM-DD-YYYY')}</p>
            </Grid>

            {/* End Date */}
            <Grid item xs={2} key={iLeagues.end}>
              <p>{moment(iLeagues.end).format('MM-DD-YYYY')}</p>
            </Grid>

            {/* Status */}
            <Grid item xs={2}>
              {/* Compare today's date to the start and end dates of the leagues to find out if it is 'In Progress', 'Completed', or 'Not Started' */}
                {moment().isBefore(iLeagues.start)
                  ? <p>Not Started</p>
                  : moment().isSameOrAfter(iLeagues.start) &&
                    moment().isSameOrBefore(iLeagues.end)
                  ? <p style={{color: 'green'}}>In Progress</p>
                  : moment().isAfter(iLeagues.end)
                  ? <p>Completed</p>
                  : <p>Something is wrong</p>}
            </Grid>

            <Grid item xs={1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={(event) => handleEdit(iLeagues.id)}
              >
                Edit
              </Button>
            </Grid>

            <Grid item xs={1} >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleClickOpen(iLeagues.id, iLeagues.name)}
              >
                Delete
              </Button>
            </Grid>

              {/* Dialog Box for Delete confirmation */}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Delete {deleteName}?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this league? All information
                    added into this league will be lost.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    autoFocus
                    onClick={(event) => handleDelete(deleteId)}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>

            
          </Grid>
        );
      })}
    </Grid>
    : <h2>404  Page Not Found</h2>
  );
}

export default AdminLeagues;

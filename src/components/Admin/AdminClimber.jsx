import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Material-UI imports
import { TableContainer } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';

// Custom Components
import Nav from '../Nav/Nav'
import './Admin.css'
import { climberWeekCalc } from '../../scripts/climberWeekCalc';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  table: {
    minWidth: 650,
  },
}));

function AdminClimber() {
  const classes = useStyles();
  // Grab the ID from the params
  let { id } = useParams();

  // Redux Store
  const adminClimbs = useSelector((store) => store.adminClimbsReducer)
  const climberInfo = useSelector((store) => store.teams);
  const leagues = useSelector((store) => store.leaguesReducer);
  const leagueTeams = useSelector((store) => store.leagueTeamReducer);
  const user = useSelector((store) => store.user);
  const userClimbs = useSelector((store) => store.climbs);

  // State Variables
  const [climberByeWeek, setClimberByeWeek] = useState(0);
  const [climberName, setClimberName] = useState('');
  const [climberTeam, setClimberTeam] = useState('')
  const [climberScore, setClimberScore] = useState(0);
  const [climberStats, setClimberStats] = useState('');
  const [leagueName, setLeagueName] = useState('');
  const [leagueStart, setLeagueStart] = useState('');
  const [leagueEnd, setLeagueEnd] = useState('');


  useEffect(() => {
    getCurrentLeague();
    findClimber();
  }, []);

  // Find the current league based on today's date
  const getCurrentLeague = () => {
    for(let league of leagues) {
      if(moment().isBetween(league.start, league.end)) {
        setLeagueName(league.id);
        setLeagueStart(league.start);
        setLeagueEnd(league.end)
        console.log('league Id', league.id);
      } 
    }
  }; // end getCurrentLeague

  // loop use the climberInfo store to define the climber name, team, and bye week
  const findClimber = () => {
    let teamId = 0;
    let byeWeek = 0;
    for (let climber of climberInfo) {
      if (climber.userId == id) {
        setClimberName(climber.username);
        setClimberTeam(climber.teamName);
        teamId = climber.teamId
      }
    }
    for (let team of leagueTeams) {
      if (team.teamId === teamId) {
        byeWeek = team.byeWeek;
      }
    }
    setClimberByeWeek(byeWeek)
    findClimberScore(byeWeek);
  }; // end findClimber

  const findClimberScore = (byeWeek) => {
    let score = climberWeekCalc(
        id,
        leagueStart,
        leagueEnd,
        userClimbs,
        byeWeek
      ).totalScore;
    setClimberScore(score);
  }; // end findClimberScore


  return (

    user.authLevel === 'ADMIN' ?
    <>
    <Nav />

      <div className="climberNameContainer">
        <h1>Climber Profile</h1>
        <h2>{climberName}</h2>
        <h3 className="climberTeamName">Team: {climberTeam}</h3>
      </div>

      <p className="climberNameContainer">Score: {climberWeekCalc(Number(id), leagueStart, leagueEnd, userClimbs, climberByeWeek).totalScore}</p>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Climber</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Difficulty</TableCell>
              <TableCell align="right">Attempts</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {adminClimbs.map((climb) => {
              return (
                <TableRow key={climb.climbId}>
                  <TableCell align="right">{climb.name}</TableCell>
                  <TableCell align="right">{climb.color}</TableCell>
                  <TableCell align="right">{climb.locationName}</TableCell>
                  <TableCell align="right">V{climb.level}</TableCell>
                  <TableCell align="right">{climb.attempts}</TableCell>
                  <TableCell align="right">
                    {moment(climb.climbDate).format('MM-DD-YYYY')}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  : <h2>404  Page Not Found</h2>
  );
}

export default AdminClimber;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Header from '../Header/Header'
import {climberWeekCalc} from '../../scripts/climberWeekCalc'

function ClimberProfile() {
  const history = useHistory();

  const user = useSelector(store => store.user)
  const climberTeams = useSelector(store => store.teams);
  const climbs = useSelector(store => store.climbs)
  const leagues = useSelector(store => store.leaguesReducer);

  const [climber, setClimber] = useState('')
  const [currentLeague, setCurrentLeague] = useState('')
  const [currentLeagueId, setCurrentLeagueId] = useState(0)
  const [currentLeagueStart, setCurrentLeagueStart] = useState('')
  const [currentLeagueEnd, setCurrentLeagueEnd] = useState('')

  useEffect(() => {
    getCurrentLeague();
  }, [])

  // sets the correct information for a league that is currently in place
  const getCurrentLeague = () => {
    for(let league of leagues) {
      if(moment().isBetween(league.start, league.end)) {
        setCurrentLeague(league.name);
        setCurrentLeagueId(league.id);
        setCurrentLeagueStart(league.start);
        setCurrentLeagueEnd(league.end);
        return;
      } 
    }
  }

  return (
    <div className="container">
      <Header />
      <h2>{user.name}</h2>
      <h4>Handicap: {climberWeekCalc(user.id, currentLeagueStart, currentLeagueEnd, climbs).handicap ? climberWeekCalc(user.id, currentLeagueStart, currentLeagueEnd, climbs).handicap : 'Not Set'}</h4>
      <h4>{user.username}</h4>
      <h4>{user.phone}</h4>
      <button onClick={() => history.push('/climber/profile/edit')}>Edit My Information</button>
    </div>
  );
}

export default ClimberProfile;

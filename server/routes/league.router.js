const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET Leagues
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "leagues"
    ORDER BY "leagues".start DESC;
  `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in Leagues GET', err);
      res.sendStatus(500);
    });
});

/**
 * GET LeagueTeams
 */
router.get('/teams', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT "teams".name AS "teamName", "teams".id AS "teamId","leaguesTeams"."isPaid", "leaguesTeams"."byeWeek", "leagues".name AS "leagueName", "leagues".id AS "leagueId"
    FROM "leagues"
    JOIN "leaguesTeams" ON "leaguesTeams"."leagueId" = "leagues".id
    JOIN "teams" ON "leaguesTeams"."teamId" = "teams".id
  `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in Leagues GET', err);
      res.sendStatus(500);
    });
});

/**
 * POST to join a league
 */
router.post('/join', rejectUnauthenticated, (req, res) => {

  let queryText = `
    INSERT INTO "leaguesTeams" ("teamId", "leagueId")
    VALUES ($1, $2);
  `;
  pool
    .query(queryText, [req.body.teamId, req.body.leagueId])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error joining league');
      res.sendStatus(500);
    });
});

/**
 * POST to create a league
 */
router.post('/', rejectUnauthenticated, (req, res) => {

  // Only admins can add a league
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    // IMPORTANT! Stop the rest of the function from running
    return;
  }

  const newLeague = req.body;
  console.log('new league', newLeague);
  let queryText = `
    INSERT INTO "leagues" ( "name", "start", "end")
    VALUES ($1, $2, $3);
  `;
  pool
    .query(queryText, [
      req.body.leagueName,
      req.body.startDate,
      req.body.endDate,
    ])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error in post', err);
      res.sendStatus(500);
    });
});

/**
 * PUT to edit a league
 */
router.put('/saveEdits', rejectUnauthenticated, (req, res) => {
  // Only admins can edit leagues
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    // IMPORTANT! Stop the rest of the function from running
    return;
  }

  let queryText = `
    UPDATE "leagues"
    SET "name" = $1, "start" = $2, "end" = $3
    WHERE "id" = $4 ;
  `;
  pool.query(queryText, [req.body.leagueName, req.body.startDate, req.body.endDate, req.body.leagueId])
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('Error Editing a League, in League.router', err);
    res.sendStatus(500);
  });
});

/**
 * DELETE to remove a league
 */
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  
  // Only admins can delete a league
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    // IMPORTANT! Stop the rest of the function from running
    return;
  }

  const deleteQuery = `DELETE FROM "leagues" WHERE "id" = $1;`;
  pool
    .query(deleteQuery, [req.params.id])
    .then((result) => {
      console.log('successful delete of a League');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error deleting a League, in League.router', err);
      res.sendStatus(500);
    });
});

module.exports = router;

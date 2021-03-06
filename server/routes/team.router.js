const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET all Teams and Climbers on those Teams
 *  */ 
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT "users".name as userName, 
      "usersTeams"."userId", "usersTeams"."teamId", 
      "teams".name as "teamName", "teams".id as "teamId", "teams"."captainId", "teams"."accessCode"
    FROM "users"
    JOIN "usersTeams" ON "users".id = "usersTeams"."userId"
    JOIN "teams" ON "teams".id = "usersTeams"."teamId"; 
  `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in Team GET', err);
      res.sendStatus(500)
    });
});

/**
 * GET all Teams in a specific League (leagueTeams)
 *  */ 
router.get('/leagueTeam/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM teams WHERE "teams"."leagueId" = $1`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('error getting teams', err);
    res.sendStatus(500)
  });
});

/**
 * GET access codes for a specific team
 */
router.get('/access/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT "teams"."accessCode" FROM "teams" WHERE "teams".id = $1;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('error getting team access code', err);
    res.sendStatus(500)
  });
});

/**
 * CREATE a Team
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  let accessCode = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6).toUpperCase();
  const connection = await pool.connect();
  try {
    await connection.query(`BEGIN`);
    let dbRes = await connection.query(`
      INSERT INTO "teams" ("name", "captainId", "accessCode")
      VALUES ($1, $2, $3)
      RETURNING *
    `, [req.body.teamName, req.user.id, accessCode]);
    await connection.query(`
      INSERT INTO "usersTeams" ("teamId", "userId")
      VALUES ($1, $2)
    `, [dbRes.rows[0].id, req.user.id]) 
    await connection.query(`COMMIT`);
    res.send(200)
  }
  catch (err) {
    console.error('error creating team', err);
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  }
  finally {
    connection.release()
  };
});

/**
 * JOIN a Team via access code
 */
router.post('/join/:accessCode', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try{
    await connection.query(`BEGIN`);
    let dbRes = await connection.query(`
      SELECT "teams".id, COUNT(*)
      FROM "teams"
      JOIN "usersTeams" ON "teams".id = "usersTeams"."teamId" 
      WHERE "teams".id = (SELECT "teams".id FROM "teams" WHERE "teams"."accessCode" = $1)
      GROUP BY "teams".id;
    `, [req.params.accessCode]);

    console.log('dbRes.rows', dbRes.rows);
    if (dbRes.rows[0] === undefined) {
      console.log('Access Code does not match')
      res.sendStatus(404)
    } else if (dbRes.rows[0].count == 3) {
      console.log('Already Three Climbers on this team')
      res.sendStatus(406) // Not acceptable
    } else {
      await connection.query(`
        INSERT INTO "usersTeams" ("userId", "teamId")
        VALUES ($1, $2)
      `, [req.user.id, dbRes.rows[0].id]);
      await connection.query(`COMMIT`);
      res.send(200)
    }
  }
  catch (err) {
    console.log('Error in joining team', err)
    await connection.query(`ROLLBACK`);
    res.sendStatus(500)
  };
});

/**
 * UPDATE Bye Week
 */
router.put('/bye', rejectUnauthenticated, (req, res) => {
  // Only team captain can start a bye week and only for their team
  if (req.user.id !== req.body.captainId) {
    res.sendStatus(403);

    // IMPORTANT! Stop the rest of the function from running
    return;
  }

  let queryText = `
    UPDATE "leaguesTeams"
    SET "byeWeek" = $1
    WHERE "leagueId" = $3 AND "teamId" = $2;
  `;
  pool.query(queryText, [req.body.byeWeek, req.body.teamId, req.body.leagueId])
    .then((results) => {
      console.log('Updated Bye Week');
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log('Error updating Bye Week', err);
      res.sendStatus(500)
    })
})

/**
 * UPDATE Paid Status
 */
router.put('/paid', rejectUnauthenticated, (req, res) => {

  // Only admins can mark a team as paid
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    // IMPORTANT! Stop the rest of the function from running
    return;
  }

  let queryText = `
    UPDATE "leaguesTeams"
    SET "isPaid" = $1
    WHERE "leagueId" = $3 AND "teamId" = $2;
  `;
  pool.query(queryText, [req.body.paidStatus, req.body.teamId, req.body.leagueId])
    .then((results) => {
      console.log('Updated Paid Status');
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log('Error updating Paid Status', err);
      res.sendStatus(500)
    })
})

/**
 * DELETE a User from a Team
 */
router.delete('/delete/:climberId/:captainId', rejectUnauthenticated, (req, res) => {
  // Only team captain can remove a teammate and only for their team
  if (req.user.id != req.params.captainId) {
    res.sendStatus(403);

    // IMPORTANT! Stop the rest of the function from running
    return;
  }

  let queryText = `
    DELETE FROM "usersTeams"
    WHERE $1 = "userId"
  `;
  pool.query(queryText, [req.params.climberId])
  .then((result) => {
    console.log('user removed')
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('error removing from team', err);
    res.sendStatus(500)
  });
});

module.exports = router;

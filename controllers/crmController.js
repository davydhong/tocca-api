// The API must be designed in such a way that it returns the profiles in a JSON object that contains no more than 50 profiles at one time. Many requests to this API can be performed to download all the profiles in the database

// Assumption1: each call to the .../api/users returns the next 50 set of the users
// Assumption2: gaps between user_id values are minimal

// Overall approach: cached pagination
// cache the request ip with the pagination counter

import db from '../model/crmModel';
import { sizeLimit, cache } from './reqTracker';

export const getUsers = (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  cache[ip] = cache[ip] + 1 || 0;
  const [startID, endID] = [cache[ip], cache[ip] + 1].map(num => num * sizeLimit);

  db
    .ref('users')
    .orderByKey()
    .startAt(startID.toString())
    .endAt(endID.toString())
    .once('value')
    .then((snapshot) => {
      if (!snapshot.val()) {
        // redo the query with startID @ 0
        cache[ip] = -1;
        res.send({ data: null });
      } else {
        res.send({ data: snapshot.val() });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const getUserWithID = (req, res) => {
  const userID = req.params.id;
  db
    .ref(`users/${userID}`)
    .once('value')
    .then((snapshot) => {
      res.send({ data: snapshot.val() });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

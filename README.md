# Tocca API design


## Getting started
Firebase realtime-database has been populated using following:
```
npm populate
```
To replicate this, generate a new firebase project and store the serviceAccount.json under the `root/key` folder.

To start the server on port 3000:
```
npm start
```

## REST API End Points
| end point | enabled methods | behavior |
| ------ | ------ | ------ |
| api/users | GET | returns the next 50 users |
| api/users/:id | GET | returns the specified user |

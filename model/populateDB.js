import faker from 'faker';
import db from './crmModel';

for (let user_id = 0; user_id < 500; user_id += 1) {
  const name = faker.name.findName();
  const email = faker.internet.email();
  const userName = faker.internet.email();

  db
    .ref(`users/${user_id}`)
    .set({
      user_id,
      userName,
      name,
      email,
    })
    .then(() => {
      console.log(`user#${user_id} write complete`);
    })
    .catch(console.error);
}

db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('people');

db.people.insert({ name: 'Hessu Matikainen', number: '0505050500505' });
db.people.insert({ name: 'Second Person', number: '040404004040404' });
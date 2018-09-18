const settings = require("./settings"); // settings.json

const knex = require('knex')({
    client: 'pg',
    version: '7.4.3',
    connection: {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
 },
 // pool: { min: 0, max: 7}
});


const searchData = process.argv.slice(2).join(" ");

const query = knex('famous_people')
  .select('*')
  .where({first_name: searchData})
  .asCallback((err, result) => {
    if(err){
      console.log('There was an error!', err);
    } else {
      console.log("Searching...")
      console.log('Found', result.length, 'person(s) by the name of', searchData);
      result.forEach((person) => {
        console.log(person.id, ':', person.first_name, person.last_name, 'born', "'",person.birthdate.toLocaleDateString(),"'");
      });
    }
    knex.destroy();
  });

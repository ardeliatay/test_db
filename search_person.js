const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig['development']);



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

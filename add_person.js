const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig['development']);

const searchData = process.argv.slice(2);
console.log(searchData);


knex('famous_people')
  .insert({
    first_name: searchData[0],
    last_name: searchData[1],
    birthdate: searchData[2]
  })
  .returning('*')
  .asCallback((err, insertPeople) => {
    if(err){
      // handle error
    } else {
    const insertPerson = insertPeople[0];
      console.log('Insert new person', insertPerson);
    }
    knex.destroy();
  });
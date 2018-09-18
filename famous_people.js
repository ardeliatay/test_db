const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const searchData = process.argv.slice(2).join(" ");
const query = "SELECT * FROM famous_people WHERE first_name = $1::text"

function handler (err, result) {
  if (err) {
      return console.error("error running query", err);
    }
  result.rows.forEach(person => console.log(`${person.id}: ${person.first_name} ${person.last_name}, born '${person.birthdate.toLocaleDateString()}'`));
  client.end();
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, [searchData], handler);
});






const {db} = require('./database/config/db')
const {createTables} = require('./database/creating/createTables')
const {queryTask1, queryTask2, queryTask3, queryTask4, queryTask5, queryTask6} = require('./database/queries')

db.connect();

createTables()
    .then(() => console.log('Tables created successfully.'))
    .catch(error => console.error('Error creating tables:', error));

for (let [index, query] of [queryTask1, queryTask2, queryTask3, queryTask4, queryTask5, queryTask6].entries()) {
    query()
        .then(data => console.log(`Query ${++index} result:`, data))
        .catch(error => console.error(`Error query ${++index}:`, error));
}
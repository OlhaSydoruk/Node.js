const fs = require('fs');
const path = require('path');
const {db} = require('../config/db')

async function executeSqlFile(filePath) {
    const sql = fs.readFileSync(filePath).toString();
    await db.query(sql);
}

const filepath = path.join(__dirname, 'sql');

async function dropIfExistsTables() {
    const tables = ['users', 'channels', 'videos', 'subscriptions', 'comments', 'likes'];
    for (const tableName of tables) {
        const query = `DROP TABLE IF EXISTS ${tableName};`;
        await db.query(query);
    }
}

async function createTables() {
    await dropIfExistsTables();

    await executeSqlFile(path.join(filepath, '0.schema.sql'));
    await executeSqlFile(path.join(filepath, '1.users.sql'));
    await executeSqlFile(path.join(filepath, '2.channels.sql'));
    await executeSqlFile(path.join(filepath, '3.videos.sql'));
    await executeSqlFile(path.join(filepath, '4.subscriptions.sql'));
    await executeSqlFile(path.join(filepath, '5.comments.sql'));
    await executeSqlFile(path.join(filepath, '6.likes.sql'));
}

module.exports = {
    createTables
};
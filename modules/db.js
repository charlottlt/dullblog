// setup connection ------
const pg = require('pg');
const dbURI = "postgres://vwybpxtphkhqak:6e546d435ddc9bdba2c412d606d247d01452a7319b9e426274709785fb49dcd4@ec2-63-33-14-215.eu-west-1.compute.amazonaws.com:5432/dd836lfaqkc8gv";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: { rejectUnauthorized: false}
});

// database methods --------
let dbMethods = {}; //create empty object

// -------------------------
dbMethods.getAllBlogPosts = function() {
    let sql = "SELECT * FROM blogposts";
    return pool.query(sql); //return the promise
}

// -------------------------
dbMethods.createBlogPost = function(heading, blogtext, userid) {
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT; DEFAULT; $1, $2, $3) returning *";
    let values = [heading, blogtext, userid];
    return pool.query(sql, values); //return the promise
}

// -------------------------
dbMethods.deleteBlogPost = function(id) {
    let sql = "DELETE FROM blogposts WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values); //return the promise
}

// export dbMethods --------
module.exports = dbMethods;
const express = require('express');
const db = require('./db.js');
const router = express.Router();

router.get("/blogposts", async function(req, res, next) {
	
	try {
		let data = await db.getAllBlogPosts();
		res.status(200).json(data.rows).end();
	}
	catch(err) {
		next(err);
	}
});

router.post("/blogposts", async function(req, res, next) {	
	
	let updata = req.body;
	let userid = 1; //must be changed when we implemented users

	try {
		let data = await db.createBlogPost(updata.heading, updata.blogtext, userid);

		if (data.rows.length > 0) {
			res.status(200).json({msg: "The blogpost was created succefully"}).end();
		}
		else {
			throw "The blogpost could´t be created";
		}
	}
	catch(err) {
		next(err);
	}
});

router.delete("/blogposts", async function(req, res, next) {
	
	let updata = req.body;

	try {
		let data = await db.deleteBlogPost(updata.id);

		if (data.rows.length > 0) {
			res.status(200).json({msg: "The blogpost was deleted succefully"}).end();
		}
		else {
			throw "The blogpost couldn´t be deleted";
		}
	}
	catch(err) {
		next(err);
	}
});

module.exports = router;
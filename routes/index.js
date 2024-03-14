var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// let data = require("../data/testdata.js");
require("dotenv").config();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// variables needed for bcrypt to do the encryption
const saltRounds = 10;
// variable needed for creating the token
const supersecret = process.env.SUPER_SECRET;


/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

//Reused in different routes to show all projects
function selectAllItems(req, res) {
  db("SELECT * FROM projects ORDER BY id DESC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
}

router.get("/projects", (req, res) => {
  // Send back the full list of items
  selectAllItems(req, res);
});

//GET project by ID
router.get("/projects/:id", async (req, res) => {
  try {
    let result = await db(`SELECT * FROM projects WHERE id = ${req.params.id}`);
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST new project
router.post("/projects", async (req, res) => {
  //get the info of the new item from req.body
  let newProject = req.body;
  try {
    await db(
      `INSERT INTO projects (projectname, type, materials, description, image, complete, favorite) VALUES ("${newProject.projectname}", "${newProject.type}", "${newProject.materials}", "${newProject.description}", "${newProject.image}", ${newProject.complete}, ${newProject.favorite})`
    );
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE project
router.delete("/projects/:id", async (req, res) => {
  // the id of the item to be deleted is available in req.params
  try {
    await db(`DELETE FROM projects WHERE id = ${req.params.id};`);
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE FAVORITE - get project by id, toggle fav
router.put(`/projects/favorites/:id`, async (req, res) => {
  console.log(req);
  try {
    await db(
      `UPDATE projects SET favorite = !favorite WHERE id=${req.params.id};`
    );
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE COMPLETE - get project by id, toggle fav
router.put(`/projects/completed/:id`, async (req, res) => {
  console.log(req);
  try {
    await db(
      `UPDATE projects SET complete = !complete WHERE id=${req.params.id};`
    );
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE all project
router.put("/projects/update/:id", async (req, res) => {
  //get the info of the new item from req.body
  let updatedProject = req.body;
  console.log(updatedProject);
  let updatedProjectId = Number(req.params.id);
  console.log(
    `UPDATE projects SET projectname = "${updatedProject.projectname}", type = "${updatedProject.type}", materials="${updatedProject.materials}", description="${updatedProject.description}", image="${updatedProject.image}" WHERE id = ${updatedProjectId}`
  );
  try {
    await db(
      `UPDATE projects SET projectname = "${updatedProject.projectname}", type = "${updatedProject.type}", materials="${updatedProject.materials}", description="${updatedProject.description}", image="${updatedProject.image}" WHERE id = ${updatedProjectId}`
    );
    const getUpdatedProject = await db(
      `SELECT * FROM projects WHERE id = ${updatedProjectId}`
    );

    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});



/********* REGISTER  *********/

router.post("/register", async (req, res) => {
  //0. get user info from request body
  let { name, username, email, password } = req.body;
  try {
    //1. encrypt password (⇒ `bcrypt.hash()`)
    let encryptedPWD = await bcrypt.hash(password, saltRounds);
    //2. create new user on DB to store user credentials
    await db(
      `INSERT into userpalace (name, username, email, password) VALUES ("${name}", "${username}", "${email}", "${encryptedPWD}");`
    );
    //3. respond with ok
    res.send({ message: "user created correctly" });
  } catch (err) {
    res.status(400).send(err);
  }
});

/*********  LOGIN  *********/

router.post("/login", async (req, res) => {
  //0. get user info from request body
  let { username, password } = req.body;
  try {
    //1. check if user exists on DB
    //hint: SQL query returns an array, our user should be the first item
    let response = await db(
      `SELECT * FROM userpalace WHERE username= "${username}"`
    );
    let user = response.data[0];
    //if user found...
    if (user) {
      const user_id = user.id;

      //2. check if pwd correct (compare passwords ⇒ `bcrypt.compare(plainPWD, encryptedPWD)`)
      let doMatch = await bcrypt.compare(password, user.password);
      //3.1 if not correct send error
      if (!doMatch) res.status(401).send({ error: "Password doesnt match" });
      const token = jwt.sign({ user_id }, supersecret);
      //3.2 else create token using user id (⇒ `jwt.sign()`)

      //...and respond with token
      res.send({ message: "Here is your token", token });
      //if no user found...
    } else {
      res.status(401).send({ error: "User not found" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
router.get("/private", async (req, res) => {
  //1. check if user logged in by extracting token

  // check "authorization" header, it has the format: "Bearer <token>"
  // and split the string to get only the <token> part
  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");
  try {
    //2. verify token and extract payload that includes user id (⇒ `jwt.verify()`)
    let payload = jwt.verify(token, supersecret);
    //3. get requested data from DB and respond
    let result = await db(
      `SELECT * from userpalace WHERE id=${payload.user_id}`
    );
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

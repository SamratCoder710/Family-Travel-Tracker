import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "**password",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = '1';


async function retreiveUsers(){
  const result = await db.query("SELECT * from users");
  return result.rows;
}


async function checkVisisted(userId) {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id= $1",[userId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function fetchColor(userId) {
  const color = await db.query("SELECT color FROM users WHERE id= $1",[userId]);
  if(color.rowCount === 1){
    return color.rows[0].color;
  }
  return "teal";
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  const users = await retreiveUsers();
  const color = await fetchColor(currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color,
    userId:currentUserId
  });
});


app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const userId = req.body["userId"];
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,userId]
      );
      currentUserId = userId;
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  const {user,add} = req.body;
  if(user){
    const countries = await checkVisisted(user);
    const color = await fetchColor(user);
    const users = await retreiveUsers();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color,
      userId:user
    });
  }else if(add){
    res.render("new.ejs");
  }
  
});

app.post("/new", async (req, res) => {
  const {name,color} = req.body;
  const result = await db.query("INSERT into users (name,color) VALUES ($1,$2)",[name,color]);
  if(result.rowCount === 1){
    res.redirect("/");
  }else{
    console.log("Error while saving data to database");
    res.sendStatus(400);
  }
  
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});


app.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const result = await db.query(
      " select country_name from countries where LOWER(country_name) LIKE $1 || '%' ",
      [q.trim().toLowerCase()]
    );
    const suggestions = [];
    result.rows.forEach((country) => {
      suggestions.push(country["country_name"]);
    });
    res.json({
      suggestions
    });
  } catch (err) {
    res.json({
      error: "Error while querying data",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

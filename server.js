import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true })); //body parser declared
app.use(bodyParser.json());

// getting the home page
app.get("/", (req, res) => {
  res.render("home.ejs");
});
//getting the about page
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
// getting the all posts page
app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    const result = response.data;
    res.render("posts.ejs", { data: result });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("edit/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await axios.get(`${API_URL}/post/${id}`);
    const result = response.data;
    res.render("newpost.ejs", { data: result });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//getting the new post page
app.get("/newPost", (req, res) => {
  try {
    res.render("newpost.ejs");
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});
//getting the patch page
app.get("/edit/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await axios.get(`${API_URL}/post/${id}`);
    const result = response.data;
    res.render("newPost.ejs", { data: result });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//posting a new post
app.post("/newPost", async (req, res) => {
  console.log("called");
  try {
    console.log(req.body);
    const response = await axios.post(`${API_URL}/newPost`, req.body);

    console.log("called2");
    res.redirect("/posts");
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }

  //patching a post
    app.post("/edit/:id", async (req, res) => {
    console.log(req);


    try {
      console.log("called");
      console.log(req.body);
      const id = parseInt(req.params.id);
      const response = await axios.patch(`${API_URL}/edit/${id}`, req.body);
      const result = response.data;
      res.redirect("/posts");
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
  });
});
// delete a post
app.get("/delete/:id", async (req, res) => {
  console.log("called 0")
  try {
    console.log("called1");
    const id = parseInt(req.params.id);
    const response = axios.delete(`${API_URL}/delete/${id}`);
    console.log("called2");
    const result = response.data;
    res.redirect("/posts");
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.listen(port, (req, res) => {
  console.log("your server is running on port " + port);
});

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true })); //body parser declared
app.use(bodyParser.json());


const postsArray = [
  {
    id: 1,
    title: "Decentralized Finance (DeFi)",
    content:
      "It is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];
// getting all posts at once
app.get("/posts", (req, res) => {
  res.json(postsArray);
});


// getting a specific post
app.get("/post/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const foundPost = postsArray.find((post) => post.id === id);
  res.json(foundPost);
});


// posting a new post
app.post("/newPost", (req, res) => {
  console.log(req.body);

  const d = new Date();

  const newItem = {
    id: postsArray.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: d,
  };
  postsArray.push(newItem);
  res.json(newItem);
});

// editing a post
app.patch("/edit/:id", (req, res) => {
  console.log(req.body);
  const id = parseInt(req.params.id);
  const d = new Date();

  const existingPost = postsArray.find((post) => post.id === id);

  const replacementPost = {
    id: existingPost.id,
    title: req.body.title || existingPost.title,
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: d,
  };

  const searchIndex = postsArray.findIndex((post) => {
    post.id === id;
  });

  postsArray[searchIndex] = replacementPost;
  res.json(replacementPost);
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = postsArray.findIndex((post) => {
    post.id === id;
  });
  postsArray.splice(searchIndex, 1);
  res.json(postsArray);
});

app.listen(port, (req, res) => {
  console.log("your server is running on port " + port);
});

/* 
1.server set karna

2.import hote hai generally ....a)express...b)axios.....c)bodyparser

3.npm install all these packages

4.server se pehle index.js banao to get overall idea

5. in index setting......rem       a)url create 
                                   b)create logic with database
                                   c)return json

6.in axios setting ...A)always use try catch block   
                      B)always use async await

7.think server as     a)sending something back via res.render    
                      b)obtaining data

8. you might think ki kab localhost likhna hai kab seedha /.......
   if you are already in that server..dont write it..if you are 
   not for eg in aios wala part ...you want to go to diff port 
   so write it
*/

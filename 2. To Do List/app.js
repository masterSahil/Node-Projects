const express = require('express');
const path = require('path')
const PORT = 8020;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const todos = [
  {
    title: "Design dashboard UI",
    desc: "Create a modern and responsive admin dashboard layout",
  },
  {
    title: "Fix login API bug",
    desc: "Resolve 400 error issue in authentication route",
  },
  {
    title: "Deploy project",
    desc: "Deploy backend and frontend to production server",
  }
];

app.get("/", (req, res) => {
    res.render('index', { todos });
})

app.post("/add", (req, res) => {
    todos.push({
        title: req.body.title,
        desc: req.body.desc
    });
    res.redirect("/");
})
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos[id];
    if (todo) {
        res.render('edit', { todo, id })
    } else {
        res.redirect('/')
    }
})

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    todos[id].title = req.body.title;
    todos[id].desc = req.body.desc;
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const idx = req.body.idx;
    todos.splice(idx, 1);
    res.redirect('/');
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("Problem in Server");
    }
    console.log(`Server is running on http://localhost:${PORT}`)
})
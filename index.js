const express = require('express');
const app = express();
const connectDB = require('./db');
const Blog = require('./models/blog');
const path = require('path');
const { Op } = require('sequelize');
const methodOverride = require('method-override');

connectDB();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send("Connected");
})



app.get('/blogs', async (req, res) => {
    const blogs=await Blog.findAll();
    res.render('index', { blogs });
})

app.get('/blogs/new', (req, res) => {
    res.render('new');
})

app.post('/blogs', async (req, res) => {
    const blog=await Blog.create(req.body);
    // console.log(blog);
    res.redirect('/blogs');
})

app.get('/blogs/:id', async (req, res) => {
    const blog = await Blog.findOne({
        where: {
            id: {
                [Op.eq]: req.params.id
            }
        }
    });
    res.render('show',{blog})
})

app.get('/blogs/:id/edit', async(req, res) => {
    
    const blog=await Blog.findOne({
        where: {
            id: {
                [Op.eq]:req.params.id
            }
        }
    })

    res.render('edit',{blog})
})

app.patch('/blogs/:id', async(req, res) => {
    
    await Blog.update(req.body, {
        where: {
            id: {
              [Op.eq]:req.params.id
          }
        }
    });

    res.redirect(`/blogs/${req.params.id}`)
})

app.delete('/blogs/:id', async (req, res) => {
    
    await Blog.destroy({
        where: {
            id: {
              [Op.eq]:req.params.id
          }
        }
      });

    res.redirect('/blogs');
})



app.listen(8080, () => {
    console.log('server running at port 8080');
})
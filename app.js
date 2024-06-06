const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));

app.set('view engine', 'views');

let anime = [
{
    id: uuid(),
    title: "Haikyu",
    rating: 8.7,
    releasedYear: 2014,
    genre: "comedy, drama"
},
{
    id: uuid(),
    title: "Violet Evergarden",
    rating: 8.4,
    releasedYear: 2018,
    genre: "drama, family"
},
{
    id: uuid(),
    title: "Vinland Saga",
    rating: 8.8,
    releasedYear: 2019,
    genre: "action, adventure"
},
{
    id: uuid(),
    title: "YuYu Hakusho",
    rating: 8.5,
    releasedYear: 1992,
    genre: "action, adventure"
}
]

app.get('/anime', (req, res) => {
    res.render('home.ejs', {anime})
})

app.get('/anime/new', (req, res) => {
    res.render('new.ejs', {anime})
})

app.post('/anime', (req, res) => {
    const newAnime = req.body;
    console.log(req.body);
    anime.push({...newAnime, id: uuid()});
    res.redirect('/anime');
})

app.get('/anime/:id', (req, res) => {
    const {id} = req.params;
    const showAnime = anime.find(c => c.id === id);
    res.render('show.ejs', {showAnime})
})

app.get('/anime/:id/edit', (req, res) => {
    const {id} = req.params;
    const showAnime = anime.find(c => c.id === id);
    res.render('edit.ejs', {showAnime});
})

app.patch('/anime/:id', (req, res) => {
    const {id} = req.params;
    const {title, rating, releaseYear, genre} = {...req.body};
    console.log(req.body);
    const listAnimes = anime.find(a => a.id === id);
    console.log(listAnimes);
    listAnimes.title = title;
    listAnimes.rating = rating;
    listAnimes.releaseYear = releaseYear;
    listAnimes.genre = genre;
    res.redirect('/anime');
})

app.delete('/anime/:id', (req, res) => {
    const {id} = req.params;
    const newAnimes = anime.filter(a => a.id !== id);
    anime = newAnimes;
    res.redirect('/anime');
})

app.listen(5476, (req, res) => {
    console.log("listening on PORT 5476");
})



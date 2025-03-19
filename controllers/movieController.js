const connection = require("./../data/db");


function index(req, res) {
    const sql = "SELECT * FROM movies";
    connection.query(sql, (err, results) => {
        if (err) res.status(500).json({ error: "Failed to show movies" })
        const movies = results.map((movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        }))
        res.json(movies)
    })
}

function show(req, res) {
    const { id } = req.params;

    const detailMovie = "SELECT * FROM movies WHERE movies.id=?"

    const detailReview = "SELECT * FROM reviews WHERE movie_id=?"

    connection.query(detailMovie, [id], (err, movieResult) => {
        if (err) res.status(500).json({ error: "Failed to show the movie" })
        if (movieResult.length === 0) return res.status(404).json({ error: "Movie not found" })


        const movie = movieResult[0];

        connection.query(detailReview, [id], (err, reviewResult) => {
            if (err) res.status(500).json({ error: "Failed to show the reviews" })

            movie.review = reviewResult;

            res.json(movie)
        })
    })
}

// function storeReview(req, res) {


//     const { id } = req.params;


//     const { text, name, vote } = req.body;

//     const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'


//     connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
//         if (err) return res.status(500).json({ error: 'Database query failed' });
//         res.status(201);
//         res.json({ message: 'Review added', id: results.insertId });
//     });

// }

function storeReview(req, res) {

    const { id } = req.params;

    const { text, name, vote } = req.body;

    const insertReviesSql = 'INSERT INTO reviews (text, name, vote , movie_id) VALUES (?, ?, ?, ?)'

    connection.query(insertReviesSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });
}
module.exports = { index, show, storeReview };
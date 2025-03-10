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

module.exports = { index, show };
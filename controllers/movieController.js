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


module.exports = { index };
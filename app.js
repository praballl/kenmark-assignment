const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const con = require("./connections");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// ------------main code---------------

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", (req, res) => {

    var name = req.body.inputName;
    var description = req.body.inputDec;

    var sql = "INSERT INTO products (name,description) VALUES(?, ?);";

    con.query(sql, [name, description], (err, result) => {
        if (err) throw err;
        res.redirect("products")

    })
});


app.get("/products", (req, res) => {

    var sql = "SELECT * FROM products;";

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        res.render("products", { products: result })
    })
});

// ---------deleting-------------
app.get("/delete-products", (req, res) => {

    var id = req.query.id;

    var sql = "DELETE FROM products WHERE id=?;";

    con.query(sql, [id], (err, result) => {
        if (err) console.log(err);
        res.redirect("products");
    })
});
//-------------updating------------

app.get("/update-product", (req, res) => {

    var id = req.query.id;

    var sql = "SELECT * FROM products WHERE id=?;";

    con.query(sql, [id], (err, result) => {
        if (err) console.log(err);
        res.render("update-product", { products: result })
    })
});

app.post("/update-product", (req, res) => {

    var id = req.body.id;
    var name = req.body.inputName;
    var description = req.body.inputDec;

    var sql = "UPDATE products SET name=?, description=? WHERE id=?;";

    con.query(sql, [name, description, id], (err, result) => {
        if (err) console.log(err);
        res.redirect("products")
    })
});

// ---------searching-----------
app.get("/search-products", (req, res) => {

    var sql = "SELECT * FROM products;";

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        res.render("search-products", { products: result })
    })
});

app.get("/search", (req, res) => {

    var name = req.query.name;
    var id = req.query.id;

    var sql = "SELECT * FROM products WHERE name LIKE '%" + name + "%'AND id LIKE '%" + id + "%'";

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        res.render("search-products", { products: result })
    })
});


app.listen(process.env.PORT, () => { console.log("server started at 5000!") })


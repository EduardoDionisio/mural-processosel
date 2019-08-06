var express = require('express');
var router = express.Router();

const pg = require('../bd');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: "Mural" });
});

/* GET - Buscar recados */
router.get('/select', function(req, res, next) {
    var query = `SELECT * FROM info;`

    pg.query(query, [], (err, ans) => {
        if (err) {
            return res.status(500).send({ erro: 'Erro!' })
        } else {

            res.status(200).send({ dados: ans.rows });
        }
    })
});

/* POST - Salvar recado */
router.post('/insert', function(req, res, next) {
    var query = `INSERT INTO info(titulo, mensagem) VALUES ('${req.body.tit}', '${req.body.msg}')`;

    pg.query(query, [], (err, ans) => {
        if (err) {
            return res.status(500).send({ erro: "Erro ao inserir" })
        } else {
            res.status(200).send({ message: "Inserido com sucesso!" });
        }
    })
});

/* DELETE - Deletar o recado */
router.delete('/delete', function(req, res, next) {
    var query = `DELETE FROM info WHERE id = ${req.body.idRecado}`;

    pg.query(query, [], (err, ans) => {
        if (err) {
            return res.status(500).send({ erro: "Erro ao deletar" })
        } else {
            res.status(200).send({ message: "Deletado com sucesso!" });
        }
    })
});

module.exports = router
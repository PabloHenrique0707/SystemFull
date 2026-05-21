const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
app.use(express.json());

app.get('/usuarios', (req, res) => {
    const sql = "select * from usuarios";
    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.menssage });
        }
        res.json({data: rows});
    });
});

app.post('/usuarios', (req, res) => {
    const {nome, email} = req.body;
    const sql = `insert into usuarios (nome, email) values (?,?)`;

    db.run(sql, [nome, email], function(err) {
        if (err) {
            return res.status(400).json({ erro: err.menssage});
        
        }
        res.json ({id:this.lasID, mensagem: "usuario cadastrado!"});
    });

});

app.listen(PORT, () => {
    console.log('servidor rodando em http://localhost:${PORT}');
});

const db = new sqlite3.database('./meubanco.db', (err) => {
    if (err) {
        console.erro("erro ao conectar ao banco:", err.menssage);
    } else {
        console.log("conectado ao banco de dados SQLite!");
    }
});

const sql = `CREATE TABLE IF NOT EXISTS usuarios ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXTO NOT NULL,
    email TEXT UNIQUE NOT NULL
)`;

db.run(sql, (err) => {
    if (err) console.error("erro ao criar tabela:", err.menssage);
    else console.log("tabela 'usuarios' prontapara uso!");

});
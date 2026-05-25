const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("servidor ativo e operante!");
});

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

const cors = require('cors');
app.use(cors()); 

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

 app.delete('/usuarios/:id', (req,res) => {
        const id = req.params.id;
        const sql = `delete from usuarios where id =?`;
        
        db.run(sql, id, function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json ({mensagem: "removido!", linhasafetadas: this.changes });
        });
    });

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { nome, email } = req.body;
    const sql = `update usuarios set nome =?, email =? where id =?`;

    db.run(sql, [nome, email, id], function (err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: "atualizado com sucesso!", alteracoes: this.changes});
    });
});

async function cadastrarusuario(dados) {
    const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(dados)
    })};


    if (response.ok) {
        const result = await response.json();
        alert(`sucesso! usuario id ${result.id} cadastrado.`);

    } else {
        alert("erro no cadastro");

    }

    async function carregarusuarios() {
        const response = await fetch('http://localhost:3000/usuarios');
        const { data } = await response.json();
        const lista = document.getElementById('lista');
        lista.innerHTML = '';

        data.array.forEach(user => {
            const item = document.createElement('li');
            item.textContent = `${user.nome} - ${user.email}`;
            lista.appendChild(item);

            const btnexcluir = document.createElement('button');
            btnexcluir.textContent = 'excluir';
            btnexcluir.onclick = async () => {
                await fetch (`http://localhost:3000/usuarios/${user.id}`, {method: 'delete' });
                carregarusuarios(); 

            };
            item.appendChild(btnexcluir);
        });
    }
    window.onload = carregarusuarios;

    let idedicao = null;
    
    function prepararedicao(user) {
        document.getElementById('nome').value = user.nome;
        document.getElementById('email').value = user.email;
        idedicao = user.id;
    }
   
if (idedicao) {

} else {

}

try {
    const res = await fetch('...');
    if (!res.ok) throw new error("falha na comunicação");

} catch (erro) {
    console.error("erro copturado:", erro.message);
    alert("nao foi possivel conectar ao servidor");
}



const express = require('express');
const cors = require('cors');
const app = express();
const porta = 3000;
app.use(cors());

const data = [
    {"id": 1, "nome":"carne de siri", "tipo":"alimento", "preco": 20.00 },
    {"id": 2, "nome":"camarão fresco", "tipo":"alimento", "preco": 35.50 },
    {"id": 3, "nome":"posta de salmão", "tipo":"alimento", "preco": 45.75 },
    {"id": 4, "nome":"pão de alho", "tipo":"alimento", "preco": 12.00 },
    {"id": 5, "nome":"queijo coalho", "tipo":"alimento", "preco": 18.90 },
    {"id": 6, "nome":"azeitona verde", "tipo":"alimento", "preco": 8.50 },
    {"id": 7, "nome":"arroz arbóreo", "tipo":"alimento", "preco": 22.30 },
    {"id": 8, "nome":"filé mignon", "tipo":"alimento", "preco": 75.00 },
    {"id": 9, "nome":"tomate cereja", "tipo":"alimento", "preco": 9.99 },
    {"id": 10, "nome":"manjericão fresco", "tipo":"alimento", "preco": 5.25 }
];

app.get('/produtos', (req, res) => {
    setTimeout(() => {
        // ROTA MODIFICADA PARA SIMULAR ERRO
        if (Math.random() < 0.5) { 
            console.log("API /produtos: Sucesso!");
            res.status(200).json(data);
        } else {
            console.log("API /produtos: Erro simulado!");
            
            res.status(500).json({ RES: "Erro simulado no endpoint /produtos" });
        }
    }, 4000); 
});

app.get('/maior', (req, res) => {
    setTimeout(() => {
        if (data) {
            let produtocaro = data[0];
            for (let i = 0; i < data.length; i++) {
                if (data[i].preco > produtocaro.preco) {
                    produtocaro = data[i];
                }
            }
            res.status(200).json(produtocaro);
        } else {
            res.status(500).json({ RES: "Erro na base de dados" });
        }
    }, 4000);
});

app.get('/menor', (req, res) => {
    setTimeout(() => {
        if (data) {
            let produtobarato = data[0];
            for (let i = 0; i < data.length; i++) {
                if (data[i].preco < produtobarato.preco) {
                    produtobarato = data[i];
                }
            }
            res.status(200).json(produtobarato);
        } else {
            res.status(500).json({ RES: "Erro na base de dados" });
        }
    }, 4000);
});

app.get('/media', (req, res) => {
    setTimeout(() => {
        let somatotal = 0;
        if (data) {
            for (const produto of data) {
                somatotal += produto.preco;
            }
            let media = somatotal / data.length;
            res.status(200).json({ media_dos_precos: parseFloat(media.toFixed(2)) });
        } else {
            res.status(500).json({ RES: "Erro na base de dados" });
        }
    }, 4000);
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}. Simulação de erro ATIVADA para '/produtos'.`);
});
const express = require('express');
const cors = require('cors');

const app = express();

const PORTA = 3000;

app.use(cors());

const alunos = [
  { nome: 'Ana Carolina', curso: 'Ciência da Computação', ira: 8.5 },
  { nome: 'Bruno Gomes', curso: 'Engenharia de Software', ira: 10.0 },
  { nome: 'Carla Dias', curso: 'Sistemas de Informação', ira: 9.1 },
  { nome: 'Daniel Farias', curso: 'Ciência da Computação', ira: 6.9 },
  { nome: 'Eduarda Lima', curso: 'Redes de Computadores', ira: 9.5 }
];

app.get('/alunos', (req, res)=>{
    console.log('Recebida requisicao get em /alunos');
    res.json(alunos)
});

app.get('/alunos/media-ira', (req, res)=>{
    console.log('Recebida requisicao get em /alunos/media-ira');

    if(alunos.length === 0){
        return res.json({media:0});
    }

    const somaDosIras = alunos.reduce((total, aluno)=> total + aluno.ira, 0);
    const Media = somaDosIras / alunos.length;
    
    res.json({media:Media})
});

app.delete('/alunos/nome/delete/:nome', (req, res) =>{
    console.log("Recebida requisicao delete em /alunos/nome/delete");

     const nomeToRemove = req.params.nome;
     const index = alunos.findIndex(aluno => aluno.nome === nomeToRemove)

     if (index !== -1){
        const alunoRemovido = alunos.splice(index, 1)

        res.json({
           mensagem: `Aluno '${nomeToRemove}' removido com sucesso!`,
           aluno: alunoRemovido[0] 
        });
     }else{
        res.status(404).json({ erro: `Aluno com o nome '${nomeToRemove}' não encontrado.` });
     }
})
    app.listen(PORTA, () =>{
        console.log(`Servidor rodano em http://localhost:${PORTA}`)
    })

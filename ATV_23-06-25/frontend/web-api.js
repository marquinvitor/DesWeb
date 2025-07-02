document.addEventListener('DOMContentLoaded', () => {
      // Configurações iniciais
      const urlBase = 'http://localhost:3000';
      const tabelaCorpo = document.getElementById('tabela-alunos-corpo');
      const spanMedia = document.getElementById('media-ira-valor');

      function carregarAlunos() {
        fetch(`${urlBase}/alunos`)
          .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar alunos');
            return response.json();
          })
          .then(alunos => {
            tabelaCorpo.innerHTML = ''; 
            alunos.forEach(aluno => {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.ira.toFixed(1)}</td>
                <td>
                  <button class="btn-delete" data-nome="${aluno.nome}">Deletar</button>
                </td>
              `;
              tabelaCorpo.appendChild(tr);
            });
          })
          .catch(error => {
            console.error('Falha ao buscar alunos:', error);
            tabelaCorpo.innerHTML = '<tr><td colspan="4">Não foi possível carregar os dados. Verifique se o servidor está rodando.</td></tr>';
          });
      }

      function carregarMedia() {
        fetch(`${urlBase}/alunos/media-ira`)
          .then(response => {
            if (!response.ok) throw new Error('Erro na requisição de média');
            return response.json();
          })
          .then(data => {
            spanMedia.textContent = data.media.toFixed(2);
          })
          .catch(error => {
            console.error('Falha ao buscar a média:', error);
            spanMedia.textContent = "Erro!";
          });
      }


      tabelaCorpo.addEventListener('click', (event) => {
        
        if (event.target.classList.contains('btn-delete')) {
          if (!confirm('Tem certeza de que deseja deletar este aluno?')) {
            return; 
          }

          const botaoClicado = event.target;
          const nomeDoAluno = botaoClicado.dataset.nome;
          const urlEncodedName = encodeURIComponent(nomeDoAluno); 

          fetch(`${urlBase}/alunos/nome/delete/${urlEncodedName}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (!response.ok) {
              return response.json().then(err => { throw new Error(err.erro || 'Erro desconhecido') });
            }
            return response.json();
          })
          .then(data => {
            console.log(data.mensagem); 
            botaoClicado.closest('tr').remove(); 
            carregarMedia();
          })
          .catch(error => {
            console.error('Erro ao deletar aluno:', error);
            alert(`Não foi possível deletar o aluno. Erro: ${error.message}`);
          });
        }
      });

      
      carregarAlunos();
      carregarMedia();
    });
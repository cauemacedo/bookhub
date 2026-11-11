const formulario = document.querySelector("#form-livro");
const campoNome = document.querySelector("#nome");
const campoAutor = document.querySelector("#autor");
const lista = document.querySelector("#lista-livros");
const mensagem = document.querySelector("#mensagem");

function adicionarLivro(evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const autor = campoAutor.value.trim();

  if (!nome || !autor) {
    mensagem.textContent = "Preencha o nome do livro e o autor.";
    return;
  }

  const livro = document.createElement("li");
  livro.textContent = nome + " — " + autor;
  lista.appendChild(livro);

  mensagem.textContent = "";
  formulario.reset();
  campoNome.focus();
}

formulario.addEventListener("submit", adicionarLivro);

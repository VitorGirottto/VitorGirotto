// Atualizar nome do arquivo selecionado
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("grammar_file")
  const fileNameDisplay = document.getElementById("file-name")

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const fileName = e.target.files[0]?.name || "Selecione um arquivo .txt"
      fileNameDisplay.textContent = fileName
    })
  }
})

// Criar arquivo de exemplo
function createExampleFile() {
  const content = `<S> ::= a<A> | b<A> | ε
<A> ::= a<A> | b<A> | ε`

  const blob = new Blob([content], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "gramatica_exemplo.txt"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

// Controle de tabs
function showTab(tabId) {
  // Esconder todas as tabs
  const tabs = document.querySelectorAll(".tab-content")
  tabs.forEach((tab) => tab.classList.remove("active"))

  // Remover active dos botões
  const buttons = document.querySelectorAll(".tab-btn")
  buttons.forEach((btn) => btn.classList.remove("active"))

  // Mostrar tab selecionada
  const selectedTab = document.getElementById(tabId)
  if (selectedTab) {
    selectedTab.classList.add("active")
  }

  // Ativar botão correspondente
  event.target.classList.add("active")
}
// assets/script.js

// Mostrar nome do arquivo no label
const fileInput = document.getElementById('grammar_file');
if (fileInput) {
    fileInput.addEventListener('change', function () {
        const label = document.getElementById('file-name');
        if (!label) return;
        if (this.files && this.files.length > 0) {
            label.textContent = this.files[0].name;
        } else {
            label.textContent = 'Selecione um arquivo .txt';
        }
    });
}

// Troca de abas na visualização dos autômatos
function showTab(id, btn) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.remove('active'));
    const tab = document.getElementById(id);
    if (tab) tab.classList.add('active');

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

window.showTab = showTab;

// Cria arquivo de exemplo para download
function createExampleFile() {
    const content =
`<S> ::= a<A> | b<A> | ε
<A> ::= a<A> | b<A> | ε
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url  = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'example_grammar.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

window.createExampleFile = createExampleFile;

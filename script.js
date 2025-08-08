//pegando os elementos

const inputTarefa = document.getElementById("tarefa");

const botaoAdicionar = document.getElementById("adicionar");

const lista = document.getElementById("lista");


function criarItem(texto){
    const li = document.createElement("li");
    li.textContent = texto;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "❌";
    botaoRemover.style.marginLeft = "10px";
    
botaoRemover.addEventListener("click", function(){
    lista.removeChild(li);
    salvarTarefas();
}); 

li.appendChild(botaoRemover);
lista.appendChild(li);

}

function salvarTarefas(){
    const itens = []
    document.querySelectorAll("#lista li").forEach(li => {
        const texto = li.firstChild.nodeValue.trim();
        itens.push(texto);
    });

    localStorage.setItem("tarefas",JSON.stringify(itens));
}

function carregarTarefas() {
    const salvas = JSON.parse(localStorage.getItem("tarefas")|| "[]");
    salvas.forEach(texto => criarItem(texto));
}

botaoAdicionar.addEventListener("click", function() {
    const texto = inputTarefa.value.trim();

 if (texto ==="") {
    alert("Digite uma tarefa");
    return;
 }
    criarItem(texto);   
    salvarTarefas();
    inputTarefa.value = "";
})

inputTarefa.addEventListener("keypress", function(e){
    if (e.key === "Enter"){
        botaoAdicionar.click();
    }
});

carregarTarefas();
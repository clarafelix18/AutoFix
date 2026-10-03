function entrar() {

    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    if (usuario == "admin" && senha == "123456") {
        window.location.href = "sistema.html";
    } else {
        document.getElementById("erro").innerText =
            "Usuário ou senha incorretos.";
    }
}


function sair() {
    window.location.href = "index.html";
}


function mostrar(pagina) {

    let secoes = document.querySelectorAll("main section");

    secoes.forEach(function(secao) {
        secao.classList.add("oculto");
    });

    document.getElementById(pagina)
        .classList.remove("oculto");
}


function adicionarCliente() {

    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;

    if (!nome || !cpf) {
        alert("Preencha nome e CPF.");
        return;
    }

    document.getElementById("listaClientes").innerHTML +=
        "<li>" + nome + " - " + cpf +
        " - " + telefone + "</li>";

    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("telefone").value = "";
}


function buscar() {

    let busca =
        document.getElementById("busca").value.toLowerCase();

    let clientes =
        document.querySelectorAll("#listaClientes li");

    clientes.forEach(function(cliente) {

        if (cliente.innerText.toLowerCase().includes(busca)) {
            cliente.style.display = "list-item";
        } else {
            cliente.style.display = "none";
        }

    });
}


function adicionarVeiculo() {

    let placa = document.getElementById("placa").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let ano = document.getElementById("ano").value;

    if (!placa || !modelo) {
        alert("Preencha os campos.");
        return;
    }

    document.getElementById("listaVeiculos").innerHTML +=
        "<li>" + placa + " - " +
        marca + " " + modelo +
        " - " + ano + "</li>";
}


function adicionarOS() {

    let servico =
        document.getElementById("servico").value;

    let valor =
        document.getElementById("valor").value;

    let status =
        document.getElementById("status").value;

    if (!servico || !valor) {
        alert("Preencha o serviço e o valor.");
        return;
    }

    document.getElementById("listaOS").innerHTML +=
        "<li>" + new Date().toLocaleDateString() +
        " - " + servico +
        " - R$ " + valor +
        " - " + status + "</li>";
}

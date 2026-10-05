/* LOGIN */

function entrar() {

    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    if (usuario === "admin" && senha === "123456") {

        window.location.href = "sistema.html";

    } else {

        document.getElementById("erro").innerText =
            "Usuário ou senha incorretos.";
    }
}


/* SAIR */

function sair() {
    window.location.href = "index.html";
}


/* MENU */

function mostrar(pagina) {

    let secoes = document.querySelectorAll("main section");

    secoes.forEach(function(secao) {
        secao.classList.add("oculto");
    });

    document.getElementById(pagina).classList.remove("oculto");

    carregarClientes();

    if (pagina === "veiculos") {
        carregarVeiculos();
    }

    if (pagina === "ordens") {
        carregarOS();
    }
}


/* CLIENTES */

function pegarClientes() {

    return JSON.parse(
        localStorage.getItem("clientes")
    ) || [];
}


function salvarClientes(clientes) {

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );
}


function adicionarCliente() {

    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;

    if (!nome || !cpf) {
        alert("Preencha nome e CPF.");
        return;
    }

    let clientes = pegarClientes();

    clientes.push({
        id: Date.now(),
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email
    });

    salvarClientes(clientes);

    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";

    carregarClientes();
}


function carregarClientes() {

    let clientes = pegarClientes();
    let lista = document.getElementById("listaClientes");

    if (!lista) return;

    let busca = document.getElementById("busca").value.toLowerCase();

    lista.innerHTML = "";

    clientes.forEach(function(cliente) {

        if (
            cliente.nome.toLowerCase().includes(busca) ||
            cliente.cpf.toLowerCase().includes(busca)
        ) {

            lista.innerHTML += `
                <li>
                    <b>${cliente.nome}</b><br>
                    CPF: ${cliente.cpf}<br>
                    Telefone: ${cliente.telefone}<br>
                    E-mail: ${cliente.email}

                    <button onclick="excluirCliente(${cliente.id})">
                        Excluir
                    </button>

                    <button onclick="editarCliente(${cliente.id})">
                        Editar
                    </button>
                </li>
            `;
        }
    });

    document.getElementById("totalClientes").innerText =
        clientes.length;

    atualizarSelectClientes();
}


function excluirCliente(id) {

    if (!confirm("Deseja excluir este cliente?")) {
        return;
    }

    let clientes = pegarClientes();

    clientes = clientes.filter(function(cliente) {
        return cliente.id !== id;
    });

    salvarClientes(clientes);

    carregarClientes();
}


function editarCliente(id) {

    let clientes = pegarClientes();

    let cliente = clientes.find(function(c) {
        return c.id === id;
    });

    if (!cliente) return;

    let nome = prompt("Nome:", cliente.nome);

    if (nome === null) return;

    let telefone = prompt("Telefone:", cliente.telefone);

    if (telefone === null) return;

    let email = prompt("E-mail:", cliente.email);

    if (email === null) return;

    cliente.nome = nome;
    cliente.telefone = telefone;
    cliente.email = email;

    salvarClientes(clientes);

    carregarClientes();
}


/* CLIENTES NOS SELECTS */

function atualizarSelectClientes() {

    let clientes = pegarClientes();

    let selectVeiculo =
        document.getElementById("clienteVeiculo");

    let selectOS =
        document.getElementById("clienteOS");

    if (selectVeiculo) {

        selectVeiculo.innerHTML =
            '<option value="">Selecione o cliente</option>';

        clientes.forEach(function(cliente) {

            selectVeiculo.innerHTML += `
                <option value="${cliente.id}">
                    ${cliente.nome}
                </option>
            `;
        });
    }

    if (selectOS) {

        selectOS.innerHTML =
            '<option value="">Selecione o cliente</option>';

        clientes.forEach(function(cliente) {

            selectOS.innerHTML += `
                <option value="${cliente.id}">
                    ${cliente.nome}
                </option>
            `;
        });
    }
}


/* VEÍCULOS */

function pegarVeiculos() {

    return JSON.parse(
        localStorage.getItem("veiculos")
    ) || [];
}


function salvarVeiculos(veiculos) {

    localStorage.setItem(
        "veiculos",
        JSON.stringify(veiculos)
    );
}


function adicionarVeiculo() {

    let placa = document.getElementById("placa").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let ano = document.getElementById("ano").value;
    let cliente = document.getElementById("clienteVeiculo").value;

    if (!placa || !marca || !modelo || !ano || !cliente) {

        alert("Preencha todos os campos.");
        return;
    }

    let veiculos = pegarVeiculos();

    veiculos.push({
        id: Date.now(),
        placa: placa,
        marca: marca,
        modelo: modelo,
        ano: ano,
        clienteId: Number(cliente)
    });

    salvarVeiculos(veiculos);

    document.getElementById("placa").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("ano").value = "";

    carregarVeiculos();
}


function carregarVeiculos() {

    let veiculos = pegarVeiculos();
    let clientes = pegarClientes();

    let lista = document.getElementById("listaVeiculos");

    if (!lista) return;

    lista.innerHTML = "";

    veiculos.forEach(function(veiculo) {

        let cliente = clientes.find(function(c) {
            return c.id === veiculo.clienteId;
        });

        lista.innerHTML += `
            <li>
                <b>${veiculo.placa}</b> -
                ${veiculo.marca} ${veiculo.modelo} -
                ${veiculo.ano}<br>

                Cliente:
                ${cliente ? cliente.nome : "Não encontrado"}

                <button onclick="excluirVeiculo(${veiculo.id})">
                    Excluir
                </button>
            </li>
        `;
    });

    document.getElementById("totalVeiculos").innerText =
        veiculos.length;
}


function excluirVeiculo(id) {

    if (!confirm("Deseja excluir este veículo?")) {
        return;
    }

    let veiculos = pegarVeiculos();

    veiculos = veiculos.filter(function(veiculo) {
        return veiculo.id !== id;
    });

    salvarVeiculos(veiculos);

    carregarVeiculos();
}


/* ORDENS */

function pegarOS() {

    return JSON.parse(
        localStorage.getItem("ordens")
    ) || [];
}


function salvarOS(ordens) {

    localStorage.setItem(
        "ordens",
        JSON.stringify(ordens)
    );
}


function carregarVeiculosOS() {

    let clienteId =
        Number(document.getElementById("clienteOS").value);

    let select =
        document.getElementById("veiculoOS");

    let veiculos = pegarVeiculos();

    select.innerHTML =
        '<option value="">Selecione o veículo</option>';

    veiculos.forEach(function(veiculo) {

        if (veiculo.clienteId === clienteId) {

            select.innerHTML += `
                <option value="${veiculo.id}">
                    ${veiculo.placa} - ${veiculo.modelo}
                </option>
            `;
        }
    });
}


function adicionarOS() {

    let cliente =
        Number(document.getElementById("clienteOS").value);

    let veiculo =
        Number(document.getElementById("veiculoOS").value);

    let servico =
        document.getElementById("servico").value;

    let valor =
        document.getElementById("valor").value;

    let data =
        document.getElementById("dataOS").value;

    let status =
        document.getElementById("status").value;

    if (!cliente || !veiculo || !servico || !valor || !data) {

        alert("Preencha todos os campos.");
        return;
    }

    let ordens = pegarOS();

    ordens.push({
        id: Date.now(),
        clienteId: cliente,
        veiculoId: veiculo,
        servico: servico,
        valor: valor,
        data: data,
        status: status
    });

    salvarOS(ordens);

    document.getElementById("servico").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("dataOS").value = "";

    carregarOS();
}


function carregarOS() {

    let ordens = pegarOS();
    let clientes = pegarClientes();
    let veiculos = pegarVeiculos();

    let lista = document.getElementById("listaOS");

    if (!lista) return;

    ordens.sort(function(a, b) {
        return new Date(b.data) - new Date(a.data);
    });

    lista.innerHTML = "";

    ordens.forEach(function(os) {

        let cliente = clientes.find(function(c) {
            return c.id === os.clienteId;
        });

        let veiculo = veiculos.find(function(v) {
            return v.id === os.veiculoId;
        });

        lista.innerHTML += `
            <li>
                <b>${os.data}</b><br>

                Cliente:
                ${cliente ? cliente.nome : "Não encontrado"}<br>

                Veículo:
                ${veiculo
                    ? veiculo.placa + " - " + veiculo.modelo
                    : "Não encontrado"}<br>

                Serviço: ${os.servico}<br>
                Valor: R$ ${os.valor}<br>
                Status: ${os.status}

                <button onclick="excluirOS(${os.id})">
                    Excluir
                </button>
            </li>
        `;
    });

    document.getElementById("totalOS").innerText =
        ordens.length;
}


function excluirOS(id) {

    if (!confirm("Deseja excluir esta ordem?")) {
        return;
    }

    let ordens = pegarOS();

    ordens = ordens.filter(function(os) {
        return os.id !== id;
    });

    salvarOS(ordens);

    carregarOS();
}
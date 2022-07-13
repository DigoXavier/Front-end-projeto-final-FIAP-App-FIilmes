function efetuarLogin(){
    var bodyObj = {
        "email": document.getElementById('txtEmail').value,
        "senha": document.getElementById('txtSenha').value
    }

    var envelope = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyObj)
    }

    fetch("http://localhost:8080/login", envelope)
        .then(res=> res.json())
        .then(res => {
            localStorage.setItem("usuarioLogado", JSON.stringify(res));
            window.location = "principal.html"
        })
        .catch(err => {
            alert("Usuario ou senha inválida");
        });

}

function carregarUsuario(){
    var usuarioLogado = localStorage.getItem("usuarioLogado");
    
    if(usuarioLogado == null){
        window.location = "login.html";
    }
    else{

        //Desserializar o objeto JSON
        var objUsuario = JSON.parse(usuarioLogado);

        //Exibir foto de perfil
        document.getElementById("divFoto").innerHTML=
            "<img width ='40%' heigh='100%' src=" + objUsuario.foto + "/>";

        //Exibir as infos do usuário 
        document.getElementById("divDados").innerHTML = 
            "<h3>Nome: " + objUsuario.nome + "</h3><br/>" +
            "<h3>Email: " +objUsuario.email + "</h3><br/>" +
            "<h3>Id: " +objUsuario.id + "</h3><br/>" ; 
    }
}
function criarUsuario(){
    var bodyObj = {
        "email": document.getElementById('txtEmail').value,
        "senha": document.getElementById('txtSenha').value,
        "nome": document.getElementById('txtNome').value,
        "foto": document.getElementById('txtFoto').value
    }

    var envelope = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyObj)
    }

    fetch("http://localhost:8080/usuario", envelope)
        .then(res=> res.json())
        .then(res => {
            alert("Usuario cadaastrado com sucesso. ID criado: " + res.id)
            window.location = "principal.html"
        })
        .catch(err => {
            alert("Erro ao criar usuario");
        });

}
function listarUsuarios(){
   fetch("http://localhost:8080/usuario")
        .then(res=> res.json())
        .then(res => exibirGrid(res))
        .catch(err => {
            alert("Erro ao listar usuario");
        });
}

function exibirGrid(lista){
    var grid = "";
    grid = grid + "<table class='table table-striped'> "
    grid = grid + "<thread> <tr> ";
    grid = grid + "<th-socped='col'>Id</th>";
    grid = grid + "<th-socped='col'>Nome</th>";
    grid = grid + "<th-socped='col'>Email</th>";
    grid = grid + "<th-socped='col'>Foto</th>";
    grid = grid + "</tr></thread><tbody>";
    for(i = 0; i < lista.length; i++){
        console.log(grid)
        grid += "<tr>" +
            "<th socped='row>"+ lista[i].id + "</th>" +
            "<th socped='row>"+ lista[i].nome + "</th>" +
            "<th socped='row>"+ lista[i].email + "</th>" +
            "<th socped='row>"+ lista[i].foto + "</th>" +
        "</tr>";
    }
    grid = grid + "</tbody></table>";
    document.getElementById("divDados").innerHTML = grid;
}
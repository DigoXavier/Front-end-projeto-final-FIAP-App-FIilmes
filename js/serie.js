function atualizarDados(){
    recuperarProvedoras();
    recuperarSeries();
}

function recuperarProvedoras(){
    fetch("http://localhost:8080/provedoras")
        .then(res => res.json())
        .then(res => preencherdrop(res)) 
}

function preencherdrop(lista){
    var saida ="";
    for(cont=0;cont<lista.length;cont++){
        saida +=
        "<option value='"+ lista[cont].id + "'>" + lista[cont].nome + "</option>";
    }
    document.getElementById("txtprovedora").innerHTML=saida
}

function recuperarseries(){
    fetch("http://localhost:8080/serie")
    .then(res => res.json())
    .then(res => preenchertabela(res))
}

function preenchertabela(lista){
    var saida =
    "<table class= 'table table-striped'>"+
    "<thead> <tr>" +
    "<th scope='col'>#</th>" +
    "<th scope='col'>Série</th>" +
    "<th scope='col'>Gênero</th>" +
    "<th scope='col'>Provedora</th>" +
    "</tr></thead><tbody>";
    for(cont=0;cont<lista.length;cont++){
        saída+=
        "<tr>" +
        "th scope ='row'>" + lista[cont].id + "</th>" +
        "<td>" + lista[cont].titulo + "</td>" +
        "<td>" + lista[cont].genero + "</td>" +
        "<td>" + lista[cont].provedora.nome + "</td" +
        "</tr>";
    }
    saida += "</tbody></table>";
    document.getElementById("series").innerHTML=saida;
}

function grava(){
    var lancamento="true";
    if(document.getElementById("optnao").checked){
        lancamento="false";
    }
    var objeto_json = {
        "titulo":document.getElementById("txttitulo").value,
        "genero":document.getElementById("txtgenero").value,
        "sinopse":document.getElementById("txtsinopse").value,
        "lancamento": lancamento,
        "provedora": {
            "id" : document.getElementById("txtprovedora").value
        }
    }
    var cabecalho = {
        method: "POST",
        body: JSON.stringify(objeto_json),
        headers:{
            "Content-type":"application/json"
        }
    }
    fetch("http://localhost:8080/novaserie", cabecalho)
    .then(res=> {
        window.alert("Gravado com sucesso");
        window.location="serie.html";
    })
    .catch(err => {
        window.alert("Não foi possível gravar a série");
    })
}
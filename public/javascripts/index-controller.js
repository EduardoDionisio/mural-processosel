$(function() {
    $("#myBtn").click(function() {
        $("#myModal").modal();
    });
});

function buscarDados() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/select')

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            switch (this.status) {
                case 200:
                    console.log(JSON.parse(this.response))
                    apresentarDados(JSON.parse(this.response))
                    break;
                case 304:
                    JSON.parse(this.response)
                    apresentarDados(JSON.parse(this.response))
                    break;
                case 500:
                    alert(JSON.parse(this.response).erro);
                    break;

                default:
                    alert(JSON.parse(this.response).erro);
                    break;
            }
        }
    }
    xhttp.send()
}

function salvarDados() {
    //Referencias
    var tit = $('#titulo').val();
    var msg = $('#mensagem').val();

    var object = {
        tit: tit,
        msg: msg
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            switch (this.status) {
                case 200:
                    apresentarDados(JSON.parse(this.response))

                    break;

                case 304:
                    apresentarDados(JSON.parse(this.response))
                    break;

                case 500:
                    alert("Erro interno!")
                    break;

                case 404:
                    alert("Erro na rota!")
                    break;

                default:
                    alert("Erro interno na aplicação. Olhe os logs!")
                    break;
            }
        }
    }

    xhttp.open("POST", '/insert', true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(object));
}

function apresentarDados(rows) {
    //Pegar referencia da tabela de usuários
    const table = document.querySelector('#dadosTabela tbody');

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    for (var i = 0; i < rows.dados.length; i++) {
        var newRow = table.insertRow(i);
        var count = 0;
        //var actionCell = newRow.insertCell(count);

        //Id recado
        var idCell = newRow.insertCell(count);
        var idValue = document.createTextNode(rows.dados[i].id);
        idCell.appendChild(idValue);
        count++;

        //Titulo recado
        var tituloCell = newRow.insertCell(count);
        var tituloValue = document.createTextNode(rows.dados[i].titulo);
        tituloCell.appendChild(tituloValue);
        count++;

        //Mensagem recado
        var mensagemCell = newRow.insertCell(count);
        var mensagemValue = document.createTextNode(rows.dados[i].mensagem);
        mensagemCell.appendChild(mensagemValue);
        count++;

        // botao excluir
        var excluirCell = newRow.insertCell(count)
        var excluirElement = document.createElement('input')
        excluirElement.setAttribute('type', 'button')
        excluirElement.setAttribute('value', 'Excluir')
        excluirElement.setAttribute('title', 'Excluir recado')
        excluirElement.classList.add('btn')
        excluirElement.classList.add('btn-outline')
        excluirElement.classList.add('btn-danger')
        excluirElement.classList.add('dim')
        excluirElement.onclick = deleteItem(rows.dados[i])
        excluirCell.appendChild(excluirElement)
        count++;
    }
}

function deleteItem(item) {
    return function() {

        var xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', '/delete')

        var object = {
            idRecado: item.id
        }

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                switch (this.status) {
                    case 200:
                        alert(JSON.parse(this.response).message)
                        buscarDados()
                        break;

                    case 304:
                        alert(JSON.parse(this.response).message)
                        buscarDados()
                        break;
                }
            }
        }
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify(object));
    }
}
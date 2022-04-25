const porta = 3003
// É necessário declarar uma "porta" quando uma aplicação tem acesso a rede, a fim de selecionar o processo que vai atender a requisição

const express = require('express')
// Importação do Express

const bodyParser = require('body-parser')

const app = express()
// Instânciando o 'Express' chamando a função 'express()' e atribuindo o resultado a constante 'app' 

const bancoDeDados = require('./bancoDeDados')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/produtos', (req, res, next) => { // Get é uma forma de requisisão
    res.send(bancoDeDados.getProdutos()) // 'Send' converte para JSON
})

app.get('/produtos/:id', (req, res, next) => {
    res.send(bancoDeDados.getProdutos(req.params.id))
})

app.post('/produtos/', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) //JSON
})

app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.excluirProduto(req.params.id)
    res.send(produto) //JSON
})


app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}.`)
})


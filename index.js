const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const PORT = 3000
const hostname = 'localhost'

const { SerialPort } = require('serialport')
const readline = require('readline')

const arduino = new SerialPort({path: 'COM6', baudRate: 9600})
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/*----- config express ----- */
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
/* ---------config handlebars-----------*/
app.engine('handlebars',exphbs.engine())
app.get('view engine', 'handlebars')
/* ------------------------ */

/* ----------Arduino-------------- */
function ligarLed(){
    arduino.write('L')
}
function desligarLed(){
    arduino.write('D')
}
/* ------------------------ */
app.post('/liga_led', (req,res)=>{
    console.log('Rota liga funcionando')
    ligarLed(
        res.render(interface)
    )
})

app.post('/desliga_led', (req,res)=>{
    console.log('Rota desliga funcionando')
   desligarLed(
        res.render(interface)
    )
})

app.get('/', (req,res)=>{
    res.render('interface')
})
/* ------------------------ */
app.listen(PORT,hostname, ()=>{
    console.log(`Servidor Rodando ${hostname}:${PORT}`)
})
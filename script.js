const listaDeNumeros = Array.from(document.getElementsByClassName('numeros'))

let display = document.querySelector("#display")
let clear = document.querySelector("#clear")
clear.addEventListener('click', limpar_tela)

let displayvalor = 0
let token = null

let parteum = 0
let operacao = 1
let partedois = 0
let resultado = 0

listaDeNumeros.map((element) => {
    element.addEventListener('click', (event) =>{
        if (token) {
            display.value = null
            displayvalor = (event.target.value)
            display.value = display.value + displayvalor
            console.log(display.value)
            partedois = display.value
            token = null
        }

        else{

            displayvalor = (event.target.value)
            display.value = display.value + displayvalor
            parteum = display.value

        }

    })
})

function limpar_tela(){
    display.value = ""
}

const listaDeOperacoes = Array.from(document.getElementsByClassName('operacoes'))

listaDeOperacoes.map((element) => {
    element.addEventListener('click', (event) =>{
        if (!token) {
            display.value = null
            displayvalor = (event.target.innerText)
            display.value = displayvalor
            operacao = display.value
            token = true            
        }
    })
})


document.querySelector("#igual").addEventListener('click', async ()=>{
    if(operacao == "+"){
        resultado = parseFloat(parteum) + parseFloat(display.value)
        await postResultado(resultado)
        display.value = resultado
        console.log(resultado)
        display.value = null

    }

    if(operacao == "X"){

        display.value = null
        resultado = parteum * partedois
        await postResultado(resultado)
        display.value = resultado
        console.log(resultado)

    }

    if(operacao == "-"){

        display.value = null
        resultado = parteum - partedois
        await postResultado(resultado)
        display.value = resultado
        console.log(resultado)

    }

    if(operacao == "/"){

        display.value = null
        resultado = parteum / partedois
        await postResultado(resultado)
        display.value = resultado
        console.log(resultado)

    }

})

async function postResultado(resultado){
    fetch("http://localhost:3000/novo",{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },            
        body: JSON.stringify({
            "resultado": resultado
        })
        }).then((resposta)=>{
            if(resposta.status != 200){
                console.log(resposta.json())
        }
    }).then(()=>{
         getResultados()
    })
}

async function getResultados(){
    const historico = document.querySelector('#resultados')
    historico.innerHTML = ''
    fetch("http://localhost:3000/todos").then((res)=>{
        res.json().then((data)=>{
            data.map((item)=>{
                const p = document.createElement('p')
                p.innerText = item
                historico.append(p)
            })
        })
    })
}
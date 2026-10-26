import { useState } from 'react'
import Display from './components/Display.jsx'
import Botao from './components/Botao.jsx'
import { somar, subtrair, multiplicar, dividir } from './utils/operacoes.js'

const NUMEROS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']

const OPERADORES = ['+', '-', '*', '/']

// Calcula a operação entre dois números usando as funções puras de operacoes.js.
// É o único ponto de despacho de operadores: quando uma nova operação for
// adicionada, incluir o case aqui e adicioná-la também em OPERADORES.
// Operador sem correspondência cai no default, devolvendo o segundo número.
function calcular(a, b, operador) {
  switch (operador) {
    case '+':
      return somar(a, b)
    case '-':
      return subtrair(a, b)
    case '*':
      return multiplicar(a, b)
    case '/':
      return dividir(a, b)
    default:
      return b // operador desconhecido: devolve o segundo número sem calcular
  }
}

export default function App() {
  const [display, setDisplay] = useState('0')
  const [anterior, setAnterior] = useState(null)
  const [operador, setOperador] = useState(null)
  const [novoNumero, setNovoNumero] = useState(true)

  function digitarNumero(n) {
    if (novoNumero) {
      setDisplay(n)
      setNovoNumero(false)
    } else {
      setDisplay(display === '0' ? n : display + n)
    }
  }

  function digitarPonto() {
    if (novoNumero) {
      setDisplay('0.')
      setNovoNumero(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  function mostrarErro() {
    setDisplay('Erro')
    setAnterior(null)
    setOperador(null)
    setNovoNumero(true)
  }

  function escolherOperador(op) {
    if (display === 'Erro') return
    const atual = Number(display)
    if (anterior !== null && operador && !novoNumero) {
      try {
        const resultado = calcular(anterior, atual, operador)
        setDisplay(String(resultado))
        setAnterior(resultado)
      } catch {
        mostrarErro()
        return
      }
    } else {
      setAnterior(atual)
    }
    setOperador(op)
    setNovoNumero(true)
  }

  function igual() {
    if (anterior === null || !operador) return
    try {
      const resultado = calcular(anterior, Number(display), operador)
      setDisplay(String(resultado))
      setAnterior(null)
      setOperador(null)
      setNovoNumero(true)
    } catch {
      mostrarErro()
    }
  }

  function limpar() {
    setDisplay('0')
    setAnterior(null)
    setOperador(null)
    setNovoNumero(true)
  }

  // TODO: histórico de operações

  return (
    <div className="calculadora">
      <h1>Calculadora</h1>
      <Display valor={display} />
      <div className="teclado">
        <div className="numeros">
          {NUMEROS.map((n) => (
            <Botao key={n} valor={n} onClick={digitarNumero} />
          ))}
          <Botao valor="." onClick={digitarPonto} />
          <Botao valor="C" onClick={limpar} tipo="limpar" />
          <Botao valor="=" onClick={igual} tipo="igual" />
        </div>
        <div className="operadores">
          {OPERADORES.map((op) => (
            <Botao key={op} valor={op} onClick={escolherOperador} tipo="operador" />
          ))}
        </div>
      </div>
    </div>
  )
}

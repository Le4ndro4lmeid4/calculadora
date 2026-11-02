// Histórico das operações concluídas, exibido acima do display.
// Recebe apenas a lista de strings pronta (ex.: "2 + 3 = 5") — a lógica
// de registro fica no App.
export default function Historico({ itens }) {
  return (
    <div className="historico">
      {itens.map((item, i) => (
        <div key={i} className="historico-item">
          {item}
        </div>
      ))}
    </div>
  )
}

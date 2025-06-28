import { useState } from 'react'
import Button from './components/common/Botao/index.jsx'
import TabelaNotas from './hooks/TabelaNotas/index.jsx'

function App() {
  

  return (
      <div>
        
        <TabelaNotas 
          notas={[
            { disciplina: 'Matemática', nota: 0 },
            { disciplina: 'Português', nota: 0 },
            { disciplina: 'História', nota: 0 },
          ]}
          onNotaChange={(index, value) => {
            console.log(`Nota da disciplina ${index + 1} alterada para: ${value}`);
          }}
          onSalvar={() => {
            console.log('Notas salvas com sucesso!');
          }}></TabelaNotas>

      </div>
  )
}

export default App

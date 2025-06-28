import React from "react";
import PropTypes from "prop-types";
import './table.css'; 
import Input from "../../components/common/Input/index.jsx";
import Button from "../../components/common/Botao/index.jsx";

const TabelaNotas = ({ notas, onNotaChange, onSalvar }) => {
  return (
    <div className="tabela-notas">
      <table>
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={index}>
              <td>{nota.disciplina}</td>
              <td>
                <Input
                  type="number"
                  placeholder="Digite a nota"
                  value={nota.nota}
                  onChange={(e) => onNotaChange(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={onSalvar}>Salvar Notas</Button>
    </div>
  );
}

TabelaNotas.propTypes = {
  notas: PropTypes.arrayOf(
    PropTypes.shape({
      disciplina: PropTypes.string.isRequired,
      nota: PropTypes.number.isRequired,
    })
  ).isRequired,
  onNotaChange: PropTypes.func.isRequired,
  onSalvar: PropTypes.func.isRequired,
};

export default TabelaNotas;

import { HistoryContainer, HistoryListContainer, Status } from './styles';

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryListContainer>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa 1</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="green">Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa 1</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="yellow">Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa 1</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="green">Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa 1</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="red">Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa 1</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status statusColor="green">Concluido</Status></td>
            </tr>
          </tbody>
        </table>
      </HistoryListContainer>
    </HistoryContainer>
  );
}

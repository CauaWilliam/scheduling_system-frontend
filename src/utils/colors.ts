// Paleta de cores para agendamentos (inspirada no iOS)
const appointmentColors = [
  '#007AFF', // Azul iOS
  '#34C759', // Verde
  '#FF9500', // Laranja
  '#FF3B30', // Vermelho
  '#AF52DE', // Roxo
  '#FF2D55', // Rosa
  '#5AC8FA', // Azul claro
  '#FFCC00', // Amarelo
  '#5856D6', // Roxo escuro
  '#00C7BE', // Ciano
];

/**
 * Gera uma cor aleatória para um agendamento
 * @param seed - Opcional: um valor para gerar a mesma cor consistentemente
 * @returns Uma cor hexadecimal
 */
export function getRandomAppointmentColor(seed?: string): string {
  if (seed) {
    // Usa o seed para gerar um índice consistente
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % appointmentColors.length;
    return appointmentColors[index];
  }
  // Retorna uma cor aleatória
  return appointmentColors[Math.floor(Math.random() * appointmentColors.length)];
}


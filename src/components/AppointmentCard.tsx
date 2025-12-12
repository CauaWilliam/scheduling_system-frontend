import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { User, Users } from 'lucide-react';
import type { Appointment } from '../types/appointment';

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

export function AppointmentCard({ appointment, onClick }: AppointmentCardProps) {
  const startTimeFormatted = format(appointment.startTime, 'HH:mm', { locale: ptBR });
  const endTimeFormatted = format(appointment.endTime, 'HH:mm', { locale: ptBR });

  return (
    <div
      className="rounded-lg p-2.5 md:p-3 mb-2 text-white relative overflow-hidden shadow-sm cursor-pointer hover:opacity-90 active:opacity-80 transition-opacity"
      style={{ backgroundColor: appointment.color }}
      onClick={onClick}
    >
      {/* Barra vertical esquerda (mais escura, estilo iPhone) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
        style={{ 
          backgroundColor: appointment.color,
          opacity: 0.8,
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Conteúdo */}
      <div className="pl-3 md:pl-4">
        <h4 className="font-semibold text-xs md:text-sm mb-1">{appointment.title}</h4>
        <p className="text-[10px] md:text-xs opacity-90 mb-2 md:mb-2.5">
          {startTimeFormatted} – {endTimeFormatted}
        </p>
        
        {/* Informações adicionais */}
        <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs opacity-90">
          <div className="flex items-center gap-1 md:gap-1.5">
            <User className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>{appointment.numberOfPeople}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5">
            <Users className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>{appointment.assignedStaff}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, X } from 'lucide-react';
import type { Appointment } from '../types/appointment';
import { AppointmentCard } from './AppointmentCard';

interface AppointmentsPanelProps {
  selectedDate: Date | null;
  appointments: Appointment[];
  onClose: () => void;
  onAddAppointment: () => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

export function AppointmentsPanel({ 
  selectedDate, 
  appointments,
  onClose,
  onAddAppointment,
  onAppointmentClick
}: AppointmentsPanelProps) {
  const formattedDate = selectedDate 
    ? format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : null;
  const capitalizedDate = formattedDate 
    ? formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    : null;

  // Filtrar agendamentos pela data selecionada
  const dayAppointments = selectedDate
    ? appointments.filter(apt => isSameDay(apt.startTime, selectedDate))
    : [];

  // Ordenar por horário de início
  const sortedAppointments = [...dayAppointments].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );

  return (
    <div className="w-full bg-card border-t border-border flex flex-col md:max-h-[400px] max-h-[50vh]">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Agendamentos
          </h3>
          {capitalizedDate && (
            <p className="text-sm text-muted-foreground mt-1">
              {capitalizedDate}
            </p>
          )}
        </div>
        {selectedDate && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-accent transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3 md:p-4 overflow-y-auto">
        {selectedDate ? (
          sortedAppointments.length > 0 ? (
            <div>
              {sortedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onClick={() => onAppointmentClick(appointment)}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-8">
              Nenhum agendamento para este dia
            </div>
          )
        ) : (
          <div className="text-sm text-muted-foreground text-center py-8">
            Selecione uma data para ver os agendamentos
          </div>
        )}
      </div>

      {/* Footer com botão de adicionar */}
      {selectedDate && (
        <div className="p-3 md:p-4 border-t border-border">
          <button
            onClick={onAddAppointment}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Adicionar Agendamento
          </button>
        </div>
      )}
    </div>
  );
}


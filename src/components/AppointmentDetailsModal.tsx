import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X, User, Users, Clock } from 'lucide-react';
import type { Appointment } from '../types/appointment';

interface AppointmentDetailsModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export function AppointmentDetailsModal({ appointment, onClose }: AppointmentDetailsModalProps) {
  if (!appointment) return null;

  const startTimeFormatted = format(appointment.startTime, "HH:mm 'de' dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const endTimeFormatted = format(appointment.endTime, 'HH:mm', { locale: ptBR });
  const capitalizedStartTime = startTimeFormatted.charAt(0).toUpperCase() + startTimeFormatted.slice(1);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        <div
          className="bg-card border-t md:border border-border rounded-t-2xl md:rounded-lg shadow-xl max-w-md w-full h-[90vh] md:max-h-[90vh] overflow-hidden flex flex-col md:m-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header com cor do agendamento */}
          <div
            className="p-4 text-white relative"
            style={{ backgroundColor: appointment.color }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-white/20 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold pr-8">{appointment.title}</h2>
          </div>

          {/* Conteúdo */}
          <div className="p-4 md:p-6 overflow-y-auto flex-1">
            {/* Horário */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Horário</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-7">
                {capitalizedStartTime} até {endTimeFormatted}
              </p>
            </div>

            {/* Clientes */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">
                  Clientes ({appointment.clientNames.length})
                </h3>
              </div>
              <div className="ml-7 space-y-2">
                {appointment.clientNames.length > 0 ? (
                  appointment.clientNames.map((name, index) => (
                    <div
                      key={index}
                      className="text-sm text-foreground bg-muted/50 rounded-md px-3 py-2"
                    >
                      {name}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum cliente cadastrado</p>
                )}
              </div>
            </div>

            {/* Funcionários */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">
                  Funcionários Designados ({appointment.staffNames.length})
                </h3>
              </div>
              <div className="ml-7 space-y-2">
                {appointment.staffNames.length > 0 ? (
                  appointment.staffNames.map((name, index) => (
                    <div
                      key={index}
                      className="text-sm text-foreground bg-muted/50 rounded-md px-3 py-2"
                    >
                      {name}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum funcionário designado</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


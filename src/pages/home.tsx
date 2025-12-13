import { useState } from 'react';
import { AnnualCalendar } from '../components/AnnualCalendar';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { AppointmentsPanel } from '../components/AppointmentsPanel';
import { AppointmentDetailsModal } from '../components/AppointmentDetailsModal';
import type { Appointment } from '../types/appointment';
import { getRandomAppointmentColor } from '../utils/colors';
// Dados de exemplo para demonstração
const createSampleAppointments = (): Appointment[] => {
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const sampleDate = new Date(2025, 11, 12); // 12 de dezembro de 2025
  
  return [
    // Agendamento para hoje (para teste fácil)
    {
      id: 'today-1',
      title: 'Reunião de Teste',
      startTime: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 15, 0),
      endTime: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 16, 30),
      numberOfPeople: 5,
      assignedStaff: 2,
      color: getRandomAppointmentColor('today-1'),
      clientNames: ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Ferreira'],
      staffNames: ['Roberto Alves', 'Juliana Lima'],
    },
    // Agendamentos para 12 de dezembro de 2025
    {
      id: '1',
      title: 'Aniversário Cauã',
      startTime: new Date(sampleDate.getFullYear(), sampleDate.getMonth(), sampleDate.getDate(), 18, 0),
      endTime: new Date(sampleDate.getFullYear(), sampleDate.getMonth(), sampleDate.getDate(), 19, 0),
      numberOfPeople: 15,
      assignedStaff: 2,
      color: getRandomAppointmentColor('1'),
      clientNames: [
        'Cauã Silva',
        'Lucas Mendes',
        'Fernanda Rocha',
        'Rafael Souza',
        'Beatriz Almeida',
        'Gabriel Martins',
        'Isabela Pereira',
        'Thiago Rodrigues',
        'Larissa Gomes',
        'Felipe Castro',
        'Mariana Dias',
        'Bruno Nunes',
        'Camila Ribeiro',
        'Diego Carvalho',
        'Amanda Freitas',
      ],
      staffNames: ['Paula Santos', 'Marcos Oliveira'],
    },
    {
      id: '2',
      title: 'Reunião de Equipe',
      startTime: new Date(sampleDate.getFullYear(), sampleDate.getMonth(), sampleDate.getDate(), 14, 30),
      endTime: new Date(sampleDate.getFullYear(), sampleDate.getMonth(), sampleDate.getDate(), 16, 0),
      numberOfPeople: 8,
      assignedStaff: 1,
      color: getRandomAppointmentColor('2'),
      clientNames: [
        'Patricia Lima',
        'Ricardo Barbosa',
        'Vanessa Araújo',
        'André Monteiro',
        'Renata Campos',
        'Gustavo Lopes',
        'Tatiana Moreira',
        'Leonardo Azevedo',
      ],
      staffNames: ['Sandra Costa'],
    },
    {
      id: '3',
      title: 'Consulta Médica',
      startTime: new Date(sampleDate.getFullYear(), sampleDate.getMonth(), sampleDate.getDate(), 10, 0),
      endTime: new Date(sampleDate.getFullYear(), sampleDate.getMonth(), sampleDate.getDate(), 11, 0),
      numberOfPeople: 1,
      assignedStaff: 1,
      color: getRandomAppointmentColor('3'),
      clientNames: ['Eduardo Mendonça'],
      staffNames: ['Dr. Carlos Henrique'],
    },
  ];
};

export function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments] = useState<Appointment[]>(createSampleAppointments());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClosePanel = () => {
    setSelectedDate(null);
  };

  const handleAddAppointment = () => {
    console.log('Adicionar agendamento para:', selectedDate);
    // Aqui você pode abrir um modal ou formulário para adicionar agendamento
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={handleMenuClick} />

        {/* Conteúdo principal - Calendário e Painel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Calendário */}
          <div className="flex-1 overflow-y-auto">
            <AnnualCalendar 
              year={2025}
              selectedDate={selectedDate || undefined}
              onDateSelect={handleDateSelect}
            />
          </div>

          {/* Painel de agendamentos - abaixo do calendário (desktop e mobile) */}
          <AppointmentsPanel
            selectedDate={selectedDate}
            appointments={appointments}
            onClose={handleClosePanel}
            onAddAppointment={handleAddAppointment}
            onAppointmentClick={handleAppointmentClick}
          />
        </div>
      </div>

      {/* Modal de detalhes do agendamento */}
      <AppointmentDetailsModal
        appointment={selectedAppointment}
        onClose={handleCloseModal}
      />
    </div>
  );
}


import { useState, useEffect, useRef } from 'react';
import { 
  startOfYear, 
  eachMonthOfInterval, 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  getMonth
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';

interface AnnualCalendarProps {
  year?: number;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export function AnnualCalendar({ 
  year = new Date().getFullYear(), 
  selectedDate,
  onDateSelect 
}: AnnualCalendarProps) {
  const isMobile = useMobile();
  const [currentYear, setCurrentYear] = useState(year);
  const [selected, setSelected] = useState<Date | undefined>(selectedDate);
  const [currentPage, setCurrentPage] = useState(0); // Para desktop (grid)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const yearStart = startOfYear(new Date(currentYear, 0, 1));
  const months = eachMonthOfInterval({
    start: yearStart,
    end: new Date(currentYear, 11, 31)
  });

  // Desktop: Dividir meses em páginas de 8 (4x2 grid)
  const MONTHS_PER_PAGE = 8;
  const totalPages = Math.ceil(months.length / MONTHS_PER_PAGE);
  const startIndex = currentPage * MONTHS_PER_PAGE;
  const endIndex = startIndex + MONTHS_PER_PAGE;
  const currentMonths = months.slice(startIndex, endIndex);

  useEffect(() => {
    // Scroll para o mês atual no mobile
    if (isMobile && scrollContainerRef.current) {
      const currentMonth = getMonth(new Date());
      // Aguardar um pouco para garantir que o container tenha dimensões
      setTimeout(() => {
        if (scrollContainerRef.current) {
          const monthWidth = scrollContainerRef.current.offsetWidth;
          scrollContainerRef.current.scrollTo({
            left: currentMonth * monthWidth,
            behavior: 'auto'
          });
        }
      }, 100);
    }
  }, [isMobile, currentYear]);

  const handleDateClick = (date: Date) => {
    setSelected(date);
    onDateSelect?.(date);
  };

  const handlePreviousYear = () => {
    setCurrentYear(prev => prev - 1);
    setCurrentPage(0); // Reset para primeira página ao mudar de ano
  };

  const handleNextYear = () => {
    setCurrentYear(prev => prev + 1);
    setCurrentPage(0); // Reset para primeira página ao mudar de ano
  };

  // Desktop: navegação de páginas
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  // Handler de scroll para mobile (opcional - pode ser usado para indicadores futuros)
  const handleScroll = () => {
    // Pode ser usado no futuro para mostrar indicador de qual mês está visível
  };

  return (
    <div className="w-full bg-background p-2 md:p-3">
      {/* Header com navegação de ano */}
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <button
          onClick={handlePreviousYear}
          className="p-1 rounded-md hover:bg-accent transition-colors"
          aria-label="Ano anterior"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        
        <div className="border border-border rounded-lg px-2 md:px-3 py-1 bg-card">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {currentYear}
          </h2>
        </div>
        
        <button
          onClick={handleNextYear}
          className="p-1 rounded-md hover:bg-accent transition-colors"
          aria-label="Próximo ano"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Desktop: Grid com todos os meses (8 por página) */}
      {!isMobile && (
        <div className="relative">
          {/* Grid com 8 meses (4x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {currentMonths.map((month) => (
              <MonthCalendar
                key={month.toString()}
                month={month}
                selectedDate={selected}
                onDateClick={handleDateClick}
              />
            ))}
          </div>

          {/* Navegação do carrossel (só aparece se houver mais de 8 meses) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="p-1 rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              
              <span className="text-[10px] text-muted-foreground">
                Página {currentPage + 1} de {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="p-1 rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Próxima página"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile: Carrossel horizontal com os 12 meses */}
      {isMobile && (
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onScroll={handleScroll}
        >
          {months.map((month) => (
            <div
              key={month.toString()}
              className="flex-shrink-0 w-full snap-center px-2"
            >
              <MonthCalendar
                month={month}
                selectedDate={selected}
                onDateClick={handleDateClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface MonthCalendarProps {
  month: Date;
  selectedDate?: Date;
  onDateClick: (date: Date) => void;
  isLarge?: boolean;
}

function MonthCalendar({ month, selectedDate, onDateClick, isLarge = false }: MonthCalendarProps) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, { locale: ptBR });
  const calendarEnd = endOfWeek(monthEnd, { locale: ptBR });
  
  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const monthName = format(month, 'MMMM', { locale: ptBR });
  const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className={`bg-card border border-border rounded-lg ${isLarge ? 'p-4' : 'p-2'} shadow-sm`}>
      {/* Cabeçalho do mês */}
      <h3 className={`${isLarge ? 'text-base md:text-lg' : 'text-sm'} font-semibold text-foreground mb-2 text-center`}>
        {capitalizedMonthName}
      </h3>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className={`${isLarge ? 'text-xs md:text-sm' : 'text-[9px]'} font-medium text-muted-foreground text-center py-0.5`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid de dias */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, month);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={day.toString()}
              onClick={() => onDateClick(day)}
              className={`
                aspect-square ${isLarge ? 'text-sm md:text-base' : 'text-[10px]'} rounded transition-colors
                ${!isCurrentMonth 
                  ? 'text-muted-foreground/40' 
                  : 'text-foreground hover:bg-accent hover:bg-blue-500'
                }
                ${isSelected 
                  ? 'bg-primary text-primary-foreground font-semibold' 
                  : ''
                }
                ${isToday && !isSelected
                  ? 'ring-1 ring-primary'
                  : ''
                }
                ${!isCurrentMonth && isSelected
                  ? 'opacity-50'
                  : ''
                }
              `}
              disabled={!isCurrentMonth}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}


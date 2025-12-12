import { useEffect, useRef, useState } from 'react';
import { Settings, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useMobile } from '../hooks/useMobile';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMobile();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-card border-b border-border shadow-sm flex-shrink-0">
      <div className="flex items-center gap-2 md:gap-3">
        {/* Botão menu para mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="w-8 h-8 md:w-10 md:h-10 rounded-md border border-border bg-muted flex items-center justify-center text-xs md:text-sm font-semibold text-muted-foreground">
          Logo
        </div>
        <div className="hidden sm:block">
          <p className="text-xs md:text-sm text-muted-foreground">Agendamentos</p>
          <h1 className="text-base md:text-lg font-semibold text-foreground">Dashboard</h1>
        </div>
        {isMobile && (
          <h1 className="text-base font-semibold text-foreground sm:hidden">Dashboard</h1>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsSettingsOpen((open) => !open)}
          className="p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Abrir configurações"
          aria-expanded={isSettingsOpen}
        >
          <Settings className="w-5 h-5" />
        </button>

        {isSettingsOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
            <nav className="flex flex-col">
              <button
                onClick={toggleTheme}
                className="px-4 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4" />
                    Modo escuro
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" />
                    Modo claro
                  </>
                )}
              </button>
              <button className="px-4 py-2 text-left text-sm hover:bg-accent transition-colors">
                Preferências
              </button>
              <button className="px-4 py-2 text-left text-sm hover:bg-accent transition-colors">
                Notificações
              </button>
              <button className="px-4 py-2 text-left text-sm hover:bg-accent transition-colors">
                Conta e segurança
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


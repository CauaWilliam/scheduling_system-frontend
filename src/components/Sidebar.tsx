import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-card border-r border-border p-4 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Botão fechar para mobile */}
        <div className="flex items-center justify-between mb-4 md:justify-start">
          <h2 className="text-lg font-semibold text-foreground">
            Opções
          </h2>
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md hover:bg-accent transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 flex-1">
          {/* Espaço para opções futuras */}
          <p className="text-sm text-muted-foreground">
            Opções serão adicionadas aqui
          </p>
        </div>
      </div>
    </>
  );
}


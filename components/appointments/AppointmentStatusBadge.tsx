export const AppointmentStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "SCHEDULED":
      return (
        <span className="rounded-full px-2.5 py-1 text-xs font-medium bg-chart-2 text-white/90 border border-success-200 mb-2 md:mb-0">
          <span className="border border-success">Confirmada</span>
        </span>
      );
    case "CANCELED":
      return (
        <span className="rounded-full px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-300 mb-2 md:mb-0">
          Cancelada
        </span>
      );
    case "COMPLETED":
      return (
        <span className="rounded-full px-2.5 py-1 text-xs font-medium bg-chart-2 text-white/90 border border-success-200 mb-2 md:mb-0">
          Concluída
        </span>
      );
    default:
      return (
        <span className="rounded-full px-2.5 py-1 text-xs font-medium bg-gray-200 text-gray-800 border border-gray-300 mb-2 md:mb-0">
          Não compareceu
        </span>
      );
  }
};
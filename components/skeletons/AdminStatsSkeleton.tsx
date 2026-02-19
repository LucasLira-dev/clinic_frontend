export const AdminStatsSkeleton = () => (
  <div className="mt-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 border rounded-lg shadow-md p-4 animate-pulse">
          <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 h-10 w-10" />
          <div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
)
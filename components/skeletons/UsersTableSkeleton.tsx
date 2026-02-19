export const UsersTableSkeleton = () => (
  <div className="w-full mt-12">
    <div className="rounded-lg border bg-card animate-pulse">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
      <div className="p-6">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4 py-3 border-b last:border-b-0">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
)
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Emir. Here is an overview of your mock APIs.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Endpoints</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">12</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">84,392</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Schemas</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">5</p>
        </div>
      </div>
    </div>
  );
}

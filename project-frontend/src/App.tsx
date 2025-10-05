// App.tsx

import DashboardComponent from './components/DashboardComponent';
import FormComponent from './components/FormComponent';

function App() {
  return (
    // Set a soft background color for the whole page
    <main className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10">
        {/* Improved header styling */}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Family Height Tracker
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-8">
        <DashboardComponent />
        <FormComponent />
      </div>
    </main>
  );
}

export default App;
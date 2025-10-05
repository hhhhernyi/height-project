// DashboardComponent.tsx

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 600 },
  { name: 'Apr', uv: 200 },
];

const DashboardComponent = () => {
  return (
    // Replaced border with background color, rounded corners, and a shadow
    <div className='w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6'>
      <h2 className='text-xl font-semibold text-slate-700 mb-4'>
        Height Trend (UV)
      </h2>
      
      <div className='w-full h-[350px]'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {/* Softer grid lines */}
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0',
              }}
            />
            <Legend />
            {/* Updated stroke color to match the theme (Indigo) */}
            <Line type="monotone" dataKey="uv" stroke="#4f46e5" strokeWidth={2} name="test" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardComponent;
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page B', uv: 300, pv: 2400, amt: 2400},{name: 'Page C', uv: 600, pv: 2400, amt: 2400},{name: 'Page d', uv: 200, pv: 2400, amt: 2400}, ];

const DashboardComponent = () => {
  return (
    <div>
        <div className='flex flex-col justify-center items-center h-[400px] w-[700px] border-2 border-black m-2 p-2'>
            <h2>dashboard component</h2>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
    <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="test" />
    <XAxis dataKey="name" />
    <YAxis width="auto" label={{ value: 'UV', position: 'insideLeft', angle: -90 }} />
    <Legend align="right" />
    <Tooltip />
  </LineChart>
        </div>
    </div>
  )
}

export default DashboardComponent
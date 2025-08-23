import DashboardComponent from './components/DashboardComponent'
import FormComponent from './components/FormComponent'

const App = () => {
  return (
    <div className='flex flex-col justify-center items-center w-[100%]'>
      <h1 className='mt-2'>Family Height Tracker</h1>
      <div className='flex sm:flex-col' >
        <DashboardComponent/>
      <FormComponent/>
      </div>
      
    </div>
  )
}

export default App
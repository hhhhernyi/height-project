// FormComponent.tsx

import React from 'react';

const FormComponent = () => {
  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted!");
    window.alert("Form submitted!");
  }

  return (
    // Replaced border with background, rounded corners, and shadow
    <div className='w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6'>
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
        <h2 className='text-xl font-semibold text-slate-700 text-center'>
          Enter Today's Height
        </h2>
        
        {/* Improved input group styling */}
        <div className="flex flex-col">
          <label htmlFor="hy-height" className="text-sm font-medium text-slate-600">HY height (cm):</label>
          <input 
            id="hy-height" 
            type="number" 
            className='mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
            placeholder='e.g., 170.5'
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="hp-height" className="text-sm font-medium text-slate-600">HP height (cm):</label>
          <input 
            id="hp-height" 
            type="number" 
            className='mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
            placeholder='e.g., 165.0'
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="hs-height" className="text-sm font-medium text-slate-600">HS height (cm):</label>
          <input 
            id="hs-height" 
            type="number" 
            className='mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
            placeholder='e.g., 120.2'
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="hr-height" className="text-sm font-medium text-slate-600">HR height (cm):</label>
          <input 
            id="hr-height" 
            type="number" 
            className='mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
            placeholder='e.g., 115.8'
          />
        </div>
        
        {/* Modern button style with hover and focus states */}
        <button 
          type='submit' 
          className='w-full mt-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
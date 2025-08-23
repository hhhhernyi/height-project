import React from 'react'

const FormComponent = () => {
    function handleSubmitForm(e:  React.FormEvent) {
        e.preventDefault()
        console.log("Form submitted")
    }
  return (
    <div>
        <form onSubmit={handleSubmitForm}>
             <div className='flex flex-col h-[400px] w-[80%] border-2 border-black justify-center items-center m-2 p-2'>
            <h2>form component</h2>
            <div>
                <label>HY height:
                    <input type="text" className='border-2 border-black bg-white rounded-xl m-2'/>
                </label>
            </div>
            <div>
                <label>HP height:
                    <input type="text" className='border-2 border-black bg-white rounded-xl m-2'/>
                </label>
            </div>
            <div>
                <label>HS height:
                    <input type="text" className='border-2 border-black bg-white rounded-xl m-2'/>
                </label>
            </div>
            <div>
                <label>HR height:
                    <input type="text" className='border-2 border-black bg-white rounded-xl m-2'/>
                </label>
            </div>
            <button type='submit' className='rounded-2xl border-2 border-black bg-amber-300 p-2 m-2'>Submit</button>
        </div>
        </form>
       
    </div>
  )
}

export default FormComponent
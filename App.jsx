import { useState,useCallback, useEffect, useRef } from 'react'


function App() {
  const [length,setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)

  const[charactersallowed, setcharacterallowed] = useState(false);

  const[Password, setpassword] = useState("")

  //useref hook

  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallowed) str += "0123456789" 
    if (charactersallowed) str += "!@#$%^&*()_+{}:;,.<>~`" 

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1);

      pass += str.charAt(char)
      
    }

    setpassword(pass)


  },[length, numberallowed,setcharacterallowed, setpassword])

  const copypasswordToclipboard = useCallback( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999)

    window.navigator.clipboard.writeText(Password)
  }, [Password])


  useEffect(()=>{
    passwordgenerator() 
   },[length,numberallowed,charactersallowed,passwordgenerator])

  return (
    
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 my-20 text-orange-500 bg-gray-800 h-48'>
        <h1 className = 'text-white text-center py-7'>Password generator</h1>
      <div className='flex-shadow rounded-lg overflow-hidden mb-8'>
        <input 
        type="text"
        value = {Password}
        className="outline-none w-full py-1 px-3 flex-auto "
        placeholder='password'
        readOnly
        ref = {passwordRef }

        
        />
        <button
        onClick={copypasswordToclipboard} 
        className='outline-none bg-blue-700 text-white px-5 py-0.5 shrink-0 flex'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type ="range"
          min = {6}
          max = {100}
          value = {length}
          className = 'cursor-pointer'
          onChange={(e) =>{setlength(e.target.value)}}
          />
          <label>length :{length} </label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type = "checkbox"
          defaultChecked = {numberallowed}
          id = "numberinput"
          onChange={ () =>{
            setnumberallowed((prev) => !prev);
            
          }}
          />
          <label htmlFor = "numberinput">Number</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input
          type = "checkbox"
          defaultChecked = {charactersallowed}
          id = "characterinput"
          onChange={() =>{
            setcharacterallowed((prev) => !prev);

          }}
          
          />
          <label htmlFor = "characterinput">Characters</label>
        </div>
      </div>
      </div>
    
  )
}

export default App


  
import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin w-[35px] h-[35px] border-4 rounded-[50%] border-[black] border-t-[white]"/>
    </div>
  )
}

export default Loader
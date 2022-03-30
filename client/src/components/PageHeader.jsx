import React from 'react'

const PageHeader = ({title}) => {
  return (
    <h1 className='w-full text-center font-bold md:text-[8rem] text-[3rem]'>{title}</h1>
  )
}

export default PageHeader
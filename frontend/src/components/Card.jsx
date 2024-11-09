import React from 'react'
import { Link } from 'react-router-dom'
function Card({ _id, name, weight, image }) {
  return (
    <Link to={_id}>
    <div className='w-[172px] h-[100px] flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <img src={image} alt={name} className='w-[52px] h-[49px] object-contain' />
        <h1 className='text-sm font-medium text-yellow-700 text-center'>{name}</h1>
      </div>
    </div>
    </Link>
  )
}

export default Card
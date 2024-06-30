"use client"
import AddTask from '@/components/addTask'
import React from 'react'

const page = ({params}:{params:{projectid:number}}) => {
  return (
    <AddTask projectid={params.projectid}/>
  )
}

export default page
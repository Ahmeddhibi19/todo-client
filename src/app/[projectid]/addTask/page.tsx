import AddTask from '@/components/addTask'
import React from 'react'

const page = ({params}:{params:{projectid:string}}) => {
  return (
    <AddTask projectid={params.projectid}/>
  )
}

export default page
import UpdateTask from '@/components/updateTask'
import React from 'react'

const page = ({params}:{params:{taskId:string}}) => {
  return (
    <UpdateTask taskId={params.taskId}/>
  )
}

export default page
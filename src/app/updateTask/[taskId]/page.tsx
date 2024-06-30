import UpdateTask from '@/components/updateTask'
import React from 'react'

const page = ({params}:{params:{taskId:number}}) => {
  return (
    <UpdateTask taskid={params.taskId}/>
  )
}

export default page
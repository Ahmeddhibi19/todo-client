"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import  store  from '@/redux/store';
import UpdateProject from '@/components/updateProject';

const Page = ({params}:{params:{projectId:number}}) => {
  //const { projectid } = params.projectId

//  if (!projectid) return null;

  return (
    <Provider store={store}>
      <UpdateProject projectId={params.projectId} />
    </Provider>
  );
};

export default Page;

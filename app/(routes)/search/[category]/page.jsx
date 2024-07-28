"use client"
import BusinessList from '@/app/_components/BusinessList'
import GlobalApi from '@/app/_services/GlobalApi'
import React, { useEffect, useState } from 'react'

function BussinessByCategory({params}) {
    const [businessList, setBusinessList] = useState([])
    useEffect(()=>{
        params&&getBusinessList()
    },[params])

    const getBusinessList = ()=>{
        GlobalApi.getBusinessByCategory(params.category).then(res=>{
            setBusinessList(res?.businessLists);
        })
    }
  return (
    <div>
        <BusinessList title={params.category} businessList={businessList} />
    </div>
  )
}

export default BussinessByCategory
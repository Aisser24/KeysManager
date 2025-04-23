import React from 'react'
import { DataTable } from './DataTable'
import { columns } from './columns'

const Page = async () => {
    const res = await fetch('http://localhost:8000/api/tokens', {
        method: 'GET',
        cache: 'no-store'
    })
    const data = await res.json()

    return (
        <div className='mx-auto container py-10'>
            <div>
                <h1 className='text-3xl font-bold mb-5'>Tokens</h1>
            </div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
export const dynamic = 'force-dynamic'
export default Page
"use client"

import { DataTable } from './DataTable'
import { columns } from './columns'
import StatusToast from './StatusToast'
import { useEffect, useState } from 'react'
import TableSkeleton from '@/components/TableSkeleton'

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/tokens', {
                    method: 'GET',
                    cache: 'no-store'
                });
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Token:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTokens();
    }, []);

    return (
        <div className='mx-auto container py-10'>
            <StatusToast />
            <div>
                <h1 className='text-3xl font-bold mb-5'>Tokens</h1>
            </div>
            {
                loading ? (
                    <TableSkeleton />
                ) : (
                    <DataTable columns={columns} data={data}/>
                )
            }
        </div>
    )
}
export const dynamic = 'force-dynamic'
export default Page
"use client"

import TableSkeleton from "@/components/TableSkeleton";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { columns } from "./Columns";

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/assignments/active', {
                    method: 'GET',
                    cache: 'no-store'
                });
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Aufgaben:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    return (
        <div className='mx-auto container py-10'>
                <div>
                    <h1 className='text-3xl font-bold mb-5'>Assignments</h1>
                </div>
                {
                    loading ? (
                        <TableSkeleton />
                    ) : (
                        <DataTable data={data} columns={columns} />
                    )
                }
            </div>
    )
}

export default Page
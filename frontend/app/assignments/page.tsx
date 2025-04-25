"use client"

import TableSkeleton from "@/components/TableSkeleton";
import { useCallback, useEffect, useState } from "react";
import DataTable from "./DataTable";
import { columns } from "./Columns";
import StatusToast from "./StatusToast";
import { config } from "@/config/config";

export const fetchAssignmentsData = async () => {
    const res = await fetch(`${config.apiUrl}/assignments/active`, {
      method: 'GET',
      cache: 'no-store'
    });
    return await res.json();
  };  

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshData = useCallback(async () => {
        setLoading(true);
        try {
            const newData = await fetchAssignmentsData();
            setData(newData);
        } catch (error) {
            console.error("Fehler beim Abrufen der Aufgaben:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchAssignments = async () => {
            setLoading(true);
            try {
                const data = await fetchAssignmentsData();
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
            <StatusToast />
            <div>
                <h1 className='text-3xl font-bold mb-5'>Assignments</h1>
            </div>
            {
                loading ? (
                    <TableSkeleton />
                ) : (
                    <DataTable 
                        data={data}     
                        columns={columns} 
                        refreshData={refreshData}
                    />
                )
            }
        </div>
    )
}

export default Page
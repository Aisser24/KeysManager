"use client"

import { Button } from "@/components/ui/button";
import { Assignment } from "@/types/api";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { config } from "@/config/config";

type TableMeta = {
    refreshData?: () => void
}

const ReturnButton = ({ tokenId, mitarbeiterId, refreshData }: { tokenId: number, mitarbeiterId: number, refreshData: (() => void) | undefined }) => {
    const router = useRouter();
    
    const confirmDelete = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/assignments/return`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    mitarbeiter_id: mitarbeiterId,
                    token_id: tokenId
                }),
            });

            if (!response.ok) {
                throw new Error("Fehler beim Zurückgeben des Tokens");
            }

            if (refreshData) {
                refreshData();
            }

            router.push("/assignments?status=returned");
        } catch (error) {
            console.error("Fehler:", error);
            router.push("/assignments?status=error&action=return");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="className=h-8 w-8 p-0 cursor-pointer">
                    <TrashIcon className="h-4 w-4" /> 
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Assignment wirklich löschen?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Diese Aktion kann nicht rückgängig gemacht werden. Der Token wird hiermit als zurückgegeben gespeichert.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Abbrechen</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="cursor-pointer">Löschen</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export const columns: ColumnDef<Assignment>[] = [
    {
        accessorKey: "token_number",
        header: "Nr",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "token_description",
        header: "Token Beschreibung",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "token_type",
        header: "Token Typ",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "vorname",
        header: "Vorname",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "nachname",
        header: "Nachname",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "ausgabedatum",
        header: "Ausgabedatum",
        cell: (info) => info.getValue(),
    },
    {
        id: "buttons",
        cell: ({ row, table }) => {
            const meta = table.options.meta as TableMeta;

            return (
                <ReturnButton 
                    tokenId={row.original.token_id} 
                    mitarbeiterId={row.original.mitarbeiter_id} 
                    refreshData={meta?.refreshData}
                />
            )
        },
    },
];
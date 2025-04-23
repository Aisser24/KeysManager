"use client"

import { Token } from "@/types/api"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const EditButton = ({ tokenId }: { tokenId: number }) => {
    const router = useRouter()

    return (
        <Button
            variant="outline"
            className="h-8 w-8 p-0 cursor-pointer"
            onClick={() => {
                router.push(`/tokens/${tokenId}/edit`)
            }}
        >
            <PencilIcon className="h-4 w-4" />
        </Button>
    )
}

export const columns: ColumnDef<Token>[] = [
    {
        accessorKey: "token_id",
        header: "ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "token_number",
        header: "Token Nummer",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "token_type",
        header: "Token Typ",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "token_description",
        header: "Token Beschreibung",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "added_date",
        header: "Hinzugefügt am",
        cell: (info) => info.getValue(),
    },
    {
        id: "edit",
        cell: ({ row }) => <EditButton tokenId={row.original.token_id} />,
    }
]
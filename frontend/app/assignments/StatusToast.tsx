"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";
import { toast } from "sonner";

const StatusToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const status = searchParams.get('status');
        const action = searchParams.get('action');

        if (status === 'returned') {
            toast.success("Token erfolgreich zurückgegeben")
        } else if (status === 'created') {
            toast.success("Token erfolgreich zugewiesen")
        } else if (status === 'error') {
            let actionText = "";
            switch (action) {
                case 'return':
                    actionText = "Zurückgeben";
                    break;
                case 'create':
                    actionText = "Erstellen";
                default:
                    actionText = "Aktion";
            }

            toast.error(`Fehler beim ${actionText} des Tokens`)
        }

        const url = new URL(window.location.href);
        url.searchParams.delete('status');
        url.searchParams.delete('action');
        router.replace(url.pathname, { scroll: false });
    }, [searchParams, router]);

    return null;
}

export default StatusToast
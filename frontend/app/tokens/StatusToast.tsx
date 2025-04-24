"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const StatusToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const toastShownRef = useRef(false);

    useEffect(() => {
        const status = searchParams.get('status');
        const action = searchParams.get('action');

        if (!status || toastShownRef.current) return;

        toastShownRef.current = true;

        if (status === 'updated') {
            toast.success("Token erfolgreich aktualisiert")
        } else if (status === 'deleted') {
            toast.success("Token erfolgreich gelöscht")
        } else if (status === 'created') {
            toast.success("Token erfolgreich erstellt")
        } else if (status === 'error') {
            let actionText = "";
            switch (action) {
                case 'create':
                    actionText = "Erstellen";
                    break;
                case 'update':
                    actionText = "Aktualisieren";
                    break;
                case 'delete':
                    actionText = "Löschen";
                    break;
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
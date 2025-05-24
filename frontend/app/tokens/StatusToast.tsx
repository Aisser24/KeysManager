"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react";
import { toast } from "sonner";

const StatusToastContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const status = searchParams.get('status');
        const action = searchParams.get('action');

        // Hier Ihre spezifische Toast-Logik für Tokens
        if (status === 'deleted') {
            toast.success("Token erfolgreich gelöscht")
        } else if (status === 'created') {
            toast.success("Token erfolgreich erstellt")
        } else if (status === 'updated') {
            toast.success("Token erfolgreich aktualisiert")
        } else if (status === 'error') {
            let actionText = "";
            switch (action) {
                case 'delete':
                    actionText = "Löschen";
                    break;
                case 'create':
                    actionText = "Erstellen";
                    break;
                case 'update':
                    actionText = "Aktualisieren";
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

const StatusToast = () => {
    return (
        <Suspense fallback={null}>
            <StatusToastContent />
        </Suspense>
    );
}

export default StatusToast
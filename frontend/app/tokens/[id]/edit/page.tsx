import { Token } from "@/types/api";
import TokenEditForm from "./TokenEditForm";
import { config } from "@/config/config";

const Page = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    let data: Token | null = null;
    
    try {
        console.log("Fetching token data for ID:", id);
        console.log(`${config.apiUrlBackend}/tokens/${id}`);
        const res = await fetch(`${config.apiUrlBackend}/tokens/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });
        
        // Prüfen ob die Antwort erfolgreich war
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        data = await res.json();
        console.log("Fetched token data:", data);
        
        // Prüfen ob Token existiert
        if (!data) {
            return <div className="container mx-auto py-10">Token nicht gefunden.</div>;
        }
        
    } catch (error) {
        console.error("Error fetching token data:", error);
        return <div className="container mx-auto py-10">Fehler beim Laden des Tokens.</div>;
    }

    return (
        <div className="container mx-auto py-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Token bearbeiten</h1>
            <div className="w-full max-w-[600px]">
                <TokenEditForm token={data} />
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';
export default Page;
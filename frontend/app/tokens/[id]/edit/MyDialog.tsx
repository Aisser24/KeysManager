"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Token } from "@/types/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TokenEditForm = ({ token }: { token: Token }) => {
    const router = useRouter();
    const [tokenNumber, setTokenNumber] = useState(token.token_number || 0);
    const [tokenType, setTokenType] = useState(token.token_type || "");
    const [tokenDescription, setTokenDescription] = useState(token.token_description || "");

    const handleSave = async (tokenNumber: number, tokenType: string, tokenDescription: string) => {
        const response = await fetch(`http://localhost:8000/api/tokens/${token.token_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token_number: tokenNumber,
                token_type: tokenType,
                token_description: tokenDescription,
            }),
        });

        if (response.ok) {
            alert("Token erfolgreich aktualisiert!");
            router.push("/tokens");
        } else {
            alert("Fehler beim Aktualisieren des Tokens.");
        }
    };
    
    const handleCancel = () => {
        router.push("/tokens");
    };

    return (
        <div className="block">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Token Nummer</label>
                    <Input
                        type="number"
                        value={tokenNumber}
                        onChange={(e) => setTokenNumber(Number(e.target.value))}
                        placeholder="Token Nummer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Token Typ</label>
                    <Input
                        value={tokenType}
                        onChange={(e) => setTokenType(e.target.value)}
                        placeholder="Token Typ"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Token Beschreibung</label>
                    <Input
                        value={tokenDescription}
                        onChange={(e) => setTokenDescription(e.target.value)}
                        placeholder="Token Beschreibung"
                    />
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={handleCancel}>
                    Abbrechen
                </Button>
                <Button onClick={() => handleSave(tokenNumber, tokenType, tokenDescription)}>
                    Speichern
                </Button>
            </div>
        </div>
    )
}

export default TokenEditForm
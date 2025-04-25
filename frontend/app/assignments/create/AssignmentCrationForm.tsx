"use client"

import { Mitarbeiter, Token } from '@/types/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { config } from '@/config/config';

const AssignmentCrationForm = () => {
    const router = useRouter();
    const [mitarbeiter, setMitarbeiter] = useState<Mitarbeiter[]>([]);
    const [tokens, setTokens] = useState<Token[]>([]);
    const [selectedMitarbeiterId, setSelectedMitarbeiterId] = useState<string>("");
    const [selectedTokenId, setSelectedTokenId] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMitarbeiter();
        fetchTokens();
    }, [])

    const fetchMitarbeiter = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/mitarbeiter`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setMitarbeiter(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Mitarbeiter:", error);
        }
    }

    const fetchTokens = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/tokens/available/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                setTokens([]);
                return;
            }

            setTokens(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Tokens:", error);
        }
    }

    const handleSave = async () => {
        if (!selectedMitarbeiterId || !selectedTokenId) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${config.apiUrl}/assignments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mitarbeiter_id: parseInt(selectedMitarbeiterId),
                    token_id: parseInt(selectedTokenId),
                }),
            });

            if (response.ok) {
                router.push("/assignments?status=created");
            } else {
                router.push("/assignments?status=error&action=create");
            }
        } catch (error) {
            console.error("Fehler beim Erstellen des Assignments:", error);
            router.push("/assignments?status=error&action=create");
        }
    }

    const handleCancel = () => {
        router.push("/assignments");
    }

    return (
        <div className="block">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mitarbeiter</label>
                    <Select value={selectedMitarbeiterId} onValueChange={setSelectedMitarbeiterId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Mitarbeiter auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {mitarbeiter.map((ma) => (
                                <SelectItem key={ma.mitarbeiter_id} value={ma.mitarbeiter_id.toString()}>
                                    {ma.vorname} {ma.nachname} ({ma.position})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Token</label>
                    <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Token auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {tokens.length > 0 ? (
                                tokens.map((token) => (
                                    <SelectItem key={token.token_id} value={token.token_id.toString()}>
                                        #{token.token_number} - {token.token_type} {token.token_description ? `(${token.token_description})` : ''}
                                    </SelectItem>
                                ))
                            ) : (
                                <div className="relative flex items-center justify-center py-3 text-sm text-gray-500 italic">
                                    Keine Tokens verfügbar
                                </div>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <Button variant="secondary" onClick={handleCancel} className="cursor-pointer" disabled={isLoading}>
                        Abbrechen
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        className="cursor-pointer" 
                        disabled={!selectedMitarbeiterId || !selectedTokenId || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Wird erstellt...
                            </>
                        ) : (
                            "Erstellen"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AssignmentCrationForm
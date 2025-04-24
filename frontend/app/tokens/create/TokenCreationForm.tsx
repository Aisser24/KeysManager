"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const TokenCreationForm = () => {
    const router = useRouter();
    const [tokenNumber, setTokenNumber] = useState(0);
    const [tokenType, setTokenType] = useState("");
    const [tokenDescription, setTokenDescription] = useState("");
    const [tokenTypes, setTokenTypes] = useState([]);
    const [isCustomType, setIsCustomType] = useState(false);

    useEffect(() => {
        fetchTokenTypes();
    }, []);

    const fetchTokenTypes = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/tokens/types/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setTokenTypes(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Token-Typen:", error);
        }
    };

    const handleTokenTypeChange = (value: string) => {
        if (value === "custom") {
            setIsCustomType(true);
            setTokenType("");
        }
        else {
            setIsCustomType(false);
            setTokenType(value);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/tokens", {
                method: 'POST',
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
                router.push("/tokens?status=created");
            } else {
                router.push("/tokens?status=error&action=create");
            }
        } catch (error) {
            console.error("Fehler beim Erstellen des Tokens:", error);
            router.push("/tokens?status=error&action=create");
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
                    {!isCustomType ? (
                        <Select value={tokenType} onValueChange={handleTokenTypeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Token-Typ auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                                {tokenTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                                <SelectItem value="custom">Neuen Typ hinzufügen...</SelectItem>
                            </SelectContent>
                        </Select>
                    ) : (
                        <div className="space-y-2">
                            <Input
                                value={tokenType}
                                onChange={(e) => setTokenType(e.target.value)}
                                placeholder="Eigenen Token-Typ eingeben"
                            />
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setIsCustomType(false)}
                                className="mt-1"
                            >
                                Zurück zur Auswahl
                            </Button>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Token Beschreibung</label>
                    <Input
                        value={tokenDescription}
                        onChange={(e) => setTokenDescription(e.target.value)}
                        placeholder="Token Beschreibung"
                    />
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <Button variant="secondary" onClick={handleCancel}>
                        Abbrechen
                    </Button>
                    <Button onClick={handleSave}>
                        Erstellen
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TokenCreationForm
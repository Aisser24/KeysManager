"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Token } from "@/types/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

const TokenEditForm = ({ token }: { token: Token }) => {
    const router = useRouter();
    const [tokenNumber, setTokenNumber] = useState(token.token_number || 0);
    const [tokenType, setTokenType] = useState(token.token_type || "");
    const [tokenDescription, setTokenDescription] = useState(token.token_description || "");
    const [tokenTypes, setTokenTypes] = useState<string[]>([]);
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
    }

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
            router.push("/tokens?status=updated");
        } else {
            router.push("/tokens?status=error&action=update");
        }
    };
    
    const handleCancel = () => {
        router.push("/tokens");
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/tokens/${token.token_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                router.push("/tokens?status=deleted");
            } else {
                router.push("/tokens?status=error&action=delete");
            }
        } catch (error) {
            console.error("Fehler beim Löschen des Tokens:", error);
            router.push("/tokens?status=error&action=delete");
        }
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
            </div>
            {/* <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={handleCancel}>
                    Abbrechen
                </Button>
                <Button onClick={() => handleSave(tokenNumber, tokenType, tokenDescription)}>
                    Speichern
                </Button>
            </div> */}
            <div className="mt-6 flex justify-between">
                <div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                Löschen
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Token wirklich löschen?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Diese Aktion kann nicht rückgängig gemacht werden. Der Token wird dauerhaft aus der Datenbank entfernt.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction onClick={confirmDelete}>Löschen</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <div className="flex space-x-3">
                    <Button variant="secondary" onClick={handleCancel}>
                        Abbrechen
                    </Button>
                    <Button onClick={() => handleSave(tokenNumber, tokenType, tokenDescription)}>
                        Speichern
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TokenEditForm
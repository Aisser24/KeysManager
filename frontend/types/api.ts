export type Token = {
    token_id: number;
    token_number: number;
    token_type: string;
    token_description: string;
    added_date: string; // ISO-Datum im Format "YYYY-MM-DD"
};

export type Assignment = {
    token_id: number;
    mitarbeiter_id: number;
    ausgabedatum: string; // ISO-Datum im Format "YYYY-MM-DD";
    vorname: string;
    nachname: string;
    token_type: string;
    token_number: number;
    token_description: string;
}

export type Mitarbeiter = {
    mitarbeiter_id: number;
    vorname: string;
    nachname: string;
    email: string;
    position: string;
}
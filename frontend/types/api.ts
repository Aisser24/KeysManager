export type Token = {
    token_id: number;
    token_number: number;
    token_type: string;
    token_description: string;
    added_date: string; // ISO-Timestamp im Format "YYYY-MM-DD HH:mm:ss";
};

export type Assignment = {
    token_id: number;
    mitarbeiter_id: number;
    ausgabedatum: string; // ISO-Timestamp im Format "YYYY-MM-DD HH:mm:ss";
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
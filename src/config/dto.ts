export type ConfigInput = {
    name: string;
    method: "POST";
    body: Record<string, string>;
    customValidation?: string;
}
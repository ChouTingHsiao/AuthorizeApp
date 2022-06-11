export interface Dialog {

    title: string;
    button: string[];
    method: string;
    data?: unknown;
    onChanges?: (event) => void;
    confirm?: () => void;

}

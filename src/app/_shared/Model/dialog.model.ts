export interface Dialog {
    title: string;
    button: string[];
    method: string;
    data?: any;
    onChanges?: (event) => void;
}

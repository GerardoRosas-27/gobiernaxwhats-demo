
export interface UserVarsModel {
    _id: string;
    user_id: string;
    data_vars: VarsModel[];
}

export interface VarsModel {
    _id?: string;
    key: string;
    value?: string;
}
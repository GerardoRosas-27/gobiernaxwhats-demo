
export interface PropsProduct{
    id: string;
    newProduct: boolean;
}

export interface DataProps<T>{
    data: T;
}
export interface CustomProps<M,T>{
    M: T;
}
export interface PropsEvents<T,M>{
    data: T;
    event: (m:M) => void;
}
export interface PropsPropertis<T,M>{
    data: T;
    addPropertis: (m:M) => void;
}
export interface Event<T>{
    event: (t:T) => void;
}

export interface EventReturn<T,M>{
    event: (t:T) => M;
}
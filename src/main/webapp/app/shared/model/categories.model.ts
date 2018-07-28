export interface ICategories {
    id?: number;
    type?: string;
}

export class Categories implements ICategories {
    constructor(public id?: number, public type?: string) {}
}

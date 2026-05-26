
export class DataFactory<T extends object> {
    private readonly defaults: T

    constructor(defaults: T) {
        this.defaults = defaults
    }

    create(overrides?: Partial<T>): T {
        return {
            ...this.defaults,
            ...overrides
        } as T
    }

    createMany(count: number, overrides?: Partial<T>): T[] {
        let items:T[] =[]
        for(let i=0; i< count; i++){
            items.push(this.create(overrides));
        }
        return items;
        // your job — return array of `count` items
        // each one created with create(overrides)
    }
}
/**
 * A generic factory for creating typed test data objects by merging a set of
 * default values with optional per-call overrides. Useful for keeping test
 * fixtures concise while still allowing individual fields to be customised.
 *
 * @typeParam T - The shape of the object this factory produces; must be a non-primitive object type
 *
 * @example
 * const userFactory = new DataFactory<User>({
 *   id: 1,
 *   name: 'Jane Doe',
 *   email: 'jane@example.com'
 * });
 *
 * const user = userFactory.create({ name: 'John' });
 * // { id: 1, name: 'John', email: 'jane@example.com' }
 *
 * const users = userFactory.createMany(3, { email: 'bulk@example.com' });
 * // Array of 3 users, each with email overridden
 */
export class DataFactory<T extends object> {
    private readonly defaults: T

    constructor(defaults: T) {
        this.defaults = defaults
    }

   /**
     * Creates a single instance of `T` by merging the factory defaults with
     * any provided overrides. Overrides take precedence over defaults.
     *
     * @param overrides - Optional partial object whose fields replace the
     * corresponding defaults
     * @returns A fully populated object of type `T`
     *
     * @example
     * const user = userFactory.create({ name: 'John' });
     */
    create(overrides?: Partial<T>): T {
        return {
            ...this.defaults,
            ...overrides
        } as T
    }

    /**
     * Creates an array of `count` instances of `T`, each produced by
     * {@link create} with the same optional overrides applied to every item.
     *
     * @param count - The number of objects to generate
     * @param overrides - Optional partial object applied uniformly to every
     * generated item
     * @returns An array of `count` objects of type `T`
     *
     * @example
     * const users = userFactory.createMany(5, { email: 'test@example.com' });
     * // 5 users all sharing the same overridden email
     */
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
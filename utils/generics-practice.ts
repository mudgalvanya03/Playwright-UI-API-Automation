// Hello this file is not a part of Framework Testing, this is just a practice file for generics when author had to start working on APIClient files

function identity<T>(name:T):T{
    return name;
}

let nameString = identity('Hello');
let nameNumber= identity(5);
let namebool = identity(true);

console.log(`variable values using generics -> ${nameString} ${nameNumber} ${namebool}`);

function getFirstElement<T>(value:T[]):T{
    return value[0];
}

let valueNum = getFirstElement([1,2,3]);
let valueString = getFirstElement(['a','b','c']);

console.log(`Array Generics -> ${valueNum} ${valueString}`);

interface apiResponse<T>{
    success: boolean;
    data: T;
}

const apiResponsestring: apiResponse<string>= {
    success: true,
    data: 'Hello'
}
const apiResponseNumber: apiResponse<number>={
    success: true,
    data:100
}

console.log(`Iterface Generics-> ${apiResponsestring} ${apiResponseNumber}`)

function getKeys<T extends object>(obj: T): string[]{
    return Object.keys(obj)
}

const blah1 = getKeys({
    name: 'Vanya',
    age: 25
});

console.log(`Generics Constraints -> ${blah1}`);

function extractField<T extends object, K extends keyof T>(obj: T, key: K): T[K]{
    return obj[key];
}

const blah2= extractField({
    name: 'Vanya',
    age: 25
}, 'name');

console.log(`Generics using keyof ${blah2}`);

function transformer<Input, Output>(value: Input, transform: (value:Input) =>Output):Output{
    return transform(value);
}
const result= transformer( 42, (s) => String(s));

console.log(`Transfromer function -> ${result}`);

function safeExtract<T extends object, K extends keyof T>( obj: T, key: K, fallback: T[K]):T[K]{
    if(obj[key] === undefined){
        return fallback
    }
    else{
        return obj[key]
    }
}

const blah3 = safeExtract({name: 'vanya'}, 'name', 'unknown')

console.log(`Mix Everything ${blah3}`)

interface PaginatedResponse<T>{
    data: T[],
    page: number,
    total: number
    totalPages: number
}
/*
function paginate<T>(items: T[], page: number, perPage: number):PaginatedResponse<T>{
    const total = items.length;
    const totalPages = Math.ceil(total / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
        data: paginatedItems,
        page: page,
        total: total,
        totalPages: totalPages
    };   

} */

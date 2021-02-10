
function objectToArray(obj) {

    const keys = Object.keys(obj);

    const length = keys.length - 1;

    let key = '';

    const array = [];

    for (let i = 0; i <= length; i++) {

        key =  keys[i];

        array.push(obj[key]);

    }

    return array;

}

function entityToArray(entity: any) {

    const entities = 'entities';

    return objectToArray(entity[entities]);

}

function cloneArray(array: any[]): any[] {

    let newArray: any[] = [];

    if (typeof array[0]  === 'object' ) {

        array.forEach(val => newArray.push(Object.assign({}, val)));

    } else {

        newArray = Object.assign([], array);

    }

    return newArray;

}

function clone(obj: any): any {

    const cloneObj: any = {};

    for (const attribute in obj) {

        if ( Array.isArray(obj[attribute]) ) {

            cloneObj[attribute] = cloneArray(obj[attribute]);

        } else if (typeof obj[attribute] === 'object') {

            cloneObj[attribute] = clone(obj[attribute]);

        } else {

            cloneObj[attribute] = obj[attribute];

        }

    }

    return cloneObj;

}

export { objectToArray, entityToArray, clone };

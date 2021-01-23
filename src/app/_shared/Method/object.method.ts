
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

export { objectToArray, entityToArray };

export function objectsDiff(oldObj, newObj) {
    const newKeys = Object.keys(newObj);
    const oldKeys = Object.keys(oldObj);

    return {
        added: newKeys.filter((key) => !(key in oldObj)),
        removed: oldKeys.filter((key) => !(key in newObj)),
        modified: newKeys.filter(
            (key) => key in oldObj && newObj[key] !== oldObj[key]
        ),
    };
}

//TODO: implement more robust solution by checking the order of the elements
export function arraysDiff(oldArr, newArr) {
    return {
        added: newArr.filter((elt) => !oldArr.includes(elt)),
        removed: oldArr.filter((elt) => !newArr.includes(elt)),
    };
}

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

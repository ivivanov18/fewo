export function withoutNulls(arr) {
    return arr.filter((item) => item != null);
}

//TODO: implement more robust solution by checking the order of the elements
export function arraysDiff(oldArr, newArr) {
    return {
        added: newArr.filter((elt) => !oldArr.includes(elt)),
        removed: oldArr.filter((elt) => !newArr.includes(elt)),
    };
}

export const ARRAY_DIFF_OP = {
    ADD: "add",
    REMOVE: "remove",
    MOVE: "move",
    NOOP: "noop",
};

export function arraysDiffSequence(
    oldArray,
    newArray,
    equalsFn = (a, b) => a === b
) {
    const sequence = [];
    const array = new ArrayWithOriginalIndices(oldArray, equalsFn);

    for (let i = 0; i < newArray.length; i++) {
        // removal case
        if (array.isRemoval(index, newArray)) {
            sequence.push(array.removeItem(index));
            index--;
            continue;
        }
        // addition case
        // move case
        // noop case
    }

    return sequence;
}

class ArrayWithOriginalIndices {
    #array = [];
    #originalIndices = [];
    #equalsFn;

    constructor(array, equalsFn) {
        this.#array = [...array];
        this.#originalIndices = array.map((_, i) => i);
        this.#equalsFn = equalsFn;
    }

    get length() {
        return this.#array.length;
    }

    isRemoval(index, newArray) {
        if (index > this.length) {
            return false;
        }

        const item = this.#array[index];
        const indexInNewArray = newArray.findIndex((elt) =>
            this.#equalsFn(item, elt)
        );

        return indexInNewArray === -1;
    }

    removeItem(index) {
        const operation = {
            index,
            op: ARRAY_DIFF_OP.REMOVE,
            item: this.#array[index],
        };

        this.#array.splice(index, 1);
        this.#originalIndices.splice(index, 1);

        return operation;
    }
}

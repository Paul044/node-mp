export function getCompareFunctionByProperty(propName) {
    return function compare(a, b) {
        if (a[propName] < b[propName]) {
            return -1;
        }
        if (a[propName] > b[propName]) {
            return 1;
        }
        return 0;
    };
}

const {ul, li, button} = tu.tags
function list(data) {
    const uldom = ul({}, "");
    for (let i = 0; i < data.length; i++) {
        const lidom = li({}, data[i]);
        uldom.appendChild(lidom)
    }
    return uldom
}
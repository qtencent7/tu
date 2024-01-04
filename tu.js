const tagNs = new Proxy(function (name, ...args) {
    const [param, param2, ...param3] = args

    const element = document.createElement(name);
    for (const key in param) {
        element.addEventListener(key.slice(2), args[0][key])
    }
    if (typeof param2 === 'object') {
        param2.binding = element
        element.textContent = param2.value
        if (args[2]) {
            for (const sub of param3) {
                param2.subdom.push(sub)
            }
        }
    } else {
        element.textContent = param2
    }
    if (args[2])
    {
        for (const tag of param3) {
            element.appendChild(tag)
        }
    }
    return element
}, {
    get: function(tag, name, receiver) {
        return tag.bind(undefined, name)
    }
})
let stateProto = {
    get value() {
        return this._value
    },
    set value(v) {
        if (v !== this._value) {
            this.binding.innerText = v
            for (sub of this.subdom) {
                this.binding.appendChild(sub)
            }
            this._value = v
        }
    },
}
function state(value) {
    return {
        __proto__: stateProto,
        subdom: [],
        binding: null,
        _value: value
    }
}
const tu = {tags: tagNs, state}
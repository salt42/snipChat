/**
 * Created by salt on 15.10.2017.
 */
(function() {
    "use strict";

    let types = new Map();

    window.jsonFormRegisterType = function(type, gen, read) {
        types.set(type, {
            gen: gen,
            read: read
        });
    };

    window.jsonForm = function jsonForm(container, data, conf = {}) {
        let metaData = conf.meta || null;

        function getValue(path, data) {
            if (!data) return null;
            if (typeof path === "string") path = path.split("/");
            let lastRef = data;
            for(let i = 0; i < path.length - 1; i++) {
                if (!isNaN(parseInt(path[i])) ) continue;
                if (!lastRef[path[i]]) return;
                lastRef = lastRef[path[i]];
            }
            if (!lastRef[path[path.length - 1] ]) return;
            return lastRef[path[path.length - 1]];
        }
        function generate(data, fragment, path = "") {
            let label,
                span,
                input,
                fieldset,
                legend;

            for (let key in data) {
                let nextPath = (path === "")? path + key: path + "/" + key;
                let meta = getValue(nextPath, metaData);
                let valueType = typeof data[key];

                if (Array.isArray(data[key]) ) {
                    valueType = "array";
                }
                if (meta && meta.type) {
                    valueType = meta.type;
                }

                switch (valueType) {
                    case 'string':
                    case 'number':
                        label = document.createElement('label');
                        label.setAttribute("name", key);
                        span = document.createElement('span');
                        span.innerHTML = key;
                        input = document.createElement('input');
                        input.dataset.name = key;
                        input.dataset.type = valueType;
                        input.setAttribute("type", valueType);
                        input.setAttribute("placeholder", " input value !");
                        input.setAttribute("value", data[key]);
                        input.setAttribute("name", key);
                        input.setAttribute("step", "any");
                        label.appendChild(span);
                        label.appendChild(input);
                        fragment.appendChild(label);

                        break;
                    case 'boolean':
                        label = document.createElement('label');
                        label.setAttribute("name", key);
                        span = document.createElement('span');
                        span.innerHTML = key;
                        input = document.createElement('input');
                        input.setAttribute("type", "checkbox");
                        input.dataset.name = key;
                        input.dataset.type = typeof data[key];
                        if (data[key]) {
                            input.setAttribute("checked", true);
                        } else {
                            input.removeAttribute("checked")
                        }
                        input.setAttribute("name", key);
                        label.appendChild(span);
                        label.appendChild(input);
                        fragment.appendChild(label);
                        break;
                    case 'array':
                        //handle as array
                        fieldset = document.createElement('fieldset');
                        fieldset.dataset.name = key;
                        fieldset.dataset.type = "array";
                        legend = document.createElement('legend');
                        legend.innerHTML = key;

                        let ul = document.createElement('ul');
                        fieldset.appendChild(ul);
                        fieldset.appendChild(legend);
                        fragment.appendChild(fieldset);
                        //create array structure
                        for(let i = 0; i < data[key].length; i++) {
                            let li = document.createElement('li');
                            li.dataset.arrayindex = i;
                            ul.appendChild(li);
                            let o = {};
                            if (typeof data[key][i] === "object" && !Array.isArray(data[key][i])) {
                                let fieldset = document.createElement('fieldset');
                                fieldset.dataset.name = i;
                                fieldset.dataset.type = "object";
                                li.appendChild(fieldset);
                                o = data[key][i];
                                generate(o, fieldset, nextPath + "/" + i);
                            } else {
                                o[i] = data[key][i];
                                generate(o, li, nextPath + "/" + i);
                            }
                        }
                        break;
                    case 'object':
                            //handle as object
                        fieldset = document.createElement('fieldset');
                        fieldset.dataset.name = key;
                        fieldset.dataset.type = "object";
                        legend = document.createElement('legend');
                        legend.innerHTML = key;
                        fieldset.appendChild(legend);
                        fragment.appendChild(fieldset);
                        generate(data[key], fieldset, nextPath);
                        break;
                    default:
                        if (types.has(valueType)) {
                            let type = types.get(valueType)
                            if (type.gen && typeof type.gen === "function") {
                                type.gen(meta, key, data, fragment, path);
                            }
                        } else {
                            console.error("[jsonForm] type '"+ valueType +"' not found");
                        }
                }
            }
        }
        function parseData(data, root) {
            let elements = root.querySelectorAll(":scope > *[data-type], :scope > label > *[data-type], :scope > ul > li > *[data-type], :scope > ul > li > label > *[data-type]");

            for(let i = 0; i < elements.length; i++) {
                let ele = elements[i];
                let type = ele.dataset.type,
                    name = ele.dataset.name;

                if (!type || !name) continue;
                switch (type) {
                    case "object":
                        data[name] = {};
                        parseData(data[name], ele);
                        break;
                    case "boolean":
                        data[name] = ele.checked;
                        break;
                    case "array":
                        data[name] = [];
                        let childs = ele.querySelectorAll(":scope > ul > li[data-arrayindex]");
                        for(let ii = 0; ii < childs.length; ii++) {
                            let d = {};
                            parseData(d, childs[ii]);
                            data[name][ii] = d[ii];
                        }
                        break;
                    case "string":
                        data[name] = ele.value;
                        break;
                    case "number":
                        data[name] = parseFloat(ele.value);
                        break;
                    default:
                        if (types.has(type)) {
                            let typeObj = types.get(type)
                            if (typeObj.read && typeof typeObj.read === "function") {
                                data[name] = typeObj.read(ele);
                            }
                        } else {
                            console.error("[jsonForm] type '"+ type +"' not found");
                        }
                }
            }
            return data;
        }
        function create(data) {
            container.innerHTML = "";
            let fragment = document.createDocumentFragment();
            let form = document.createElement('form');
            let fieldset = document.createElement('fieldset');
            fieldset.dataset.name = conf.name || "root";
            fieldset.dataset.type = "object";
            let legend = document.createElement('legend');
            legend.innerHTML = conf.name || "root";
            fieldset.appendChild(legend);
            form.appendChild(fieldset);
            fragment.appendChild(form);
            generate(data, fieldset);
            container.appendChild(fragment);
        }

        //init
        create(data);

        return {
            getData: () => {
                let form = container.querySelector("form");
                return parseData({}, form);
            },
            setData: (data) => {
                create(data);
            }
        };
    };


    jsonFormRegisterType("select", function(meta, key, data, parent, path){
        if (!meta.options) {
            console.error("type 'select' needs options");
            return;
        }
        let label = document.createElement('label');
        let span = document.createElement('span');
        span.innerHTML = key;
        let select = document.createElement('select');
        select.dataset.name = key;
        select.dataset.type = 'select';
        select.setAttribute("name", key);
        for (let i = 0; i < meta.options.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = meta.options[i];
            option.setAttribute("value", meta.options[i]);
            select.appendChild(option);
        }
        select.value = data[key];

        label.appendChild(span);
        label.appendChild(select);
        parent.appendChild(label);
    }, function(element) {
        return element.value;
    });
})();

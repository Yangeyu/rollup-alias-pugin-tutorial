// 导出的方法
function aliasPath(config) {
    const entries = normalizeOptions(config.options);
    return {
        name: 'aliasPath',
        resolveId(source) {
            const entry = entries.find(e => e.match(source));
            entry && (source = entry.replace(source));
            return source;
        }
    };
}
const objectToString = Object.prototype.toString;
const isOpitionsArr = (target) => Array.isArray(target);
// 标准化参数
const normalizeOptions = (options) => {
    const entries = [];
    if (objectToString.call(options) === '[object Object]') {
        Object.entries(options).forEach(([k, v]) => entries.push(new Entry(k, v)));
    }
    if (isOpitionsArr(options)) {
        options.forEach(i => entries.push(new Entry(i.alias, i.replacement)));
    }
    return entries;
};
class Entry {
    alias;
    replacement;
    constructor(alias, replacement) {
        this.alias = alias;
        this.replacement = replacement;
    }
    match(target) {
        return target.startsWith(this.alias);
    }
    replace(target) {
        return target.replace(this.alias, this.replacement);
    }
}

export { aliasPath as default };

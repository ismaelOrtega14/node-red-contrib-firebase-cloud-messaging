/**
 * Format a string that contains {number} with the params in order
 *
 * @param {string} text String with {numbers} to subtitute
 * @param  {...any} params String to substitute in order
 * @return {string} The string formated
 */
function formatText(text, ...params) {
    return text.replace(/{(\d+)}/g, function (match, number) {
        return typeof params[number] != 'undefined' ? params[number] : match
    })
}

/**
 * Deep merges source object into target
 *
 * @param {object} target Object into the merging is done
 * @param {object} source Object to add into targer
 */
function deepMerge(target, source) {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (
                source[key] instanceof Object &&
                key in target &&
                target[key] instanceof Object
            ) {
                // If both values are objects, recursively merge them
                deepMerge(target[key], source[key])
            } else {
                // Otherwise, assign the source value to the target key
                target[key] = source[key]
            }
        }
    }
}

module.exports = {
    formatText,
    deepMerge,
}

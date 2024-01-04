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

module.exports = {
    formatText,
}

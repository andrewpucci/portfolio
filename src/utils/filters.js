const { DateTime } = require('luxon');

module.exports = {
  dateToFormat(date, format) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
      String(format),
    );
  },

  obfuscate(str) {
    const chars = [];
    for (let i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return chars.join('');
  },

  stripSpaces(str) {
    return str.replace(/\s/g, '');
  },

  stripProtocol(str) {
    return str.replace(/(^\w+:|^)\/\//, '');
  },

  squash(text) {
    const content = String(text);

    // remove all html elements
    let re = /(<.+?>)/gi;
    let plain = content.replace(re, '');
    re = /(&.+?;)/gi;
    plain = plain.replace(re, '');

    // remove duplicated words
    const words = plain.split(' ');
    const deduped = [...(new Set(words))];
    const dedupedStr = deduped.join(' ');

    // remove short and less meaningful words
    let result = dedupedStr.replace(/\b(\.|,|the|a|an|and|am|all|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi, '');
    // remove newlines, and punctuation
    result = result.replace(/\.|,|\?|-|—|\n/g, '');
    // remove repeated spaces
    result = result.replace(/[ ]{2,}/g, ' ');

    return result;
  },
};

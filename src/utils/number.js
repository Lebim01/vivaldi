export const moneyFormat = function(value, n = 2, x) {
    var _value = value || 0
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return _value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
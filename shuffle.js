// n : the max length of the return arr.
Array.prototype.shuffle = function (n) {
    var params = [].slice.call(arguments);
    var index = -1,
        result = this,
        length = result.length,
        lastIndex = length - 1;

    while (++index < n) {
        var rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
            value = result[rand];

        result[rand] = result[index];
        result[index] = value;
    }
    result.length = n;
    return result;
}
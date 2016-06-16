/*
* async([
*   function(done){
*       done({a:1})
*   },
*   function(done){
*       done({b:1})
*   }
* ], function(retA, retB){
*   retA // {a: 1}
*   retB // {b: 1}
* })
*
*
* */


module.exports = function(jobs, cb){
    let arr = new Array(jobs.length),
        result = new Array(jobs.length);
    for(let i=0, len=jobs.length; i<len; i++){
        jobs[i]((function(j){
            return function(ret) {
                arr[j] = true;
                result[j] = ret;
                for (let k = 0; k < len; k++) {
                    if (!arr[k]) return;
                }
                cb && cb.apply(null, result);
            }
        })(i));
    }
    if(!jobs.length){
        cb && cb();
    }
};
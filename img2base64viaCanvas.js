var preSendImgIM = function(x, w, fcb) {
    try {
        var o = 1000;
        var e = 200;
        var k = 1024 * 300;
        var s = 1024 * 8;

        var y = x.fileId;

        var v = document.getElementById(y);
        var z = v.files[0];
        var D = window.URL || window.webkitURL;
        var u = D.createObjectURL(z);
        var E = this;
        var A = new Image();
        A.src = u;
        A.onload = function() {
            var J = this;
            var K = {
                type: 1
            };
            var I;
            if (J.width > J.height) {
                I = J.width
            } else {
                I = J.height
            }
            var H;
            var G;
            if (I > o) {
                K.file = Tool.resizeIMG(J, o, 0.8, k).clearBase64
            } else {
                K.file = Tool.resizeIMG(J, I, 0.8, k).clearBase64
            }
            if (I > e) {
                var F = Tool.resizeIMG(J, e, 1, s);
                H = F.base64;
                G = F.clearBase64
            } else {
                var F = Tool.resizeIMG(J, e, 1, s);
                H = F.base64;
                G = F.clearBase64
            }
            w && w(G);
            /*Ajax.request(j + "/UploadFile", {
             data: K,
             header: {
             UKEY: f
             },
             success: function(L) {
             if (L.status == IM_STATUS.SUCCESS) {
             x.url = L.url;
             x.thumb = G;
             x.msgType = IM_CONSTANT.MSG_TYPE.IMG;
             x.content = "";
             E.send(x, function(M) {
             w.call(h, j + "/" + x.url, H)
             }, C)
             } else {
             C.call(h, L.status)
             }
             }
             })*/
        }
    } catch(e) {
        fcb && fcb();
    }
}

var Tool = {
    resizeIMG: function(d, a, l, m) {
        var g = d;
        var k = g.width
            , e = g.height
            , c = k / e;
        k = a || k;
        e = k / c;
        var b = document.createElement("canvas");
        var n = b.getContext("2d");
        $(b).attr({
            width: k,
            height: e
        });
        n.drawImage(g, 0, 0, k, e);
        var f = b.toDataURL("image/jpeg", l || 0.8);
        var j;
        if (navigator.userAgent.match(/iphone/i)) {
            j = new MegaPixImage(d);
            j.render(b, {
                maxWidth: k,
                maxHeight: e,
                quality: l || 0.8
            });
            f = b.toDataURL("image/jpeg", l || 0.8)
        }
        var i;
        if (navigator.userAgent.match(/Android/i)) {
            i = new JPEGEncoder();
            f = i.encode(n.getImageData(0, 0, k, e), l * 100 || 80)
        }
        while (m && m > 0 && f.length > m) {
            l = l - 0.2;
            f = b.toDataURL("image/jpeg", l || 0.8);
            if (navigator.userAgent.match(/iphone/i)) {
                j = new MegaPixImage(d);
                j.render(b, {
                    maxWidth: k,
                    maxHeight: e,
                    quality: l || 0.8
                });
                f = b.toDataURL("image/jpeg", l || 0.8)
            }
            if (navigator.userAgent.match(/Android/i)) {
                i = new JPEGEncoder();
                f = i.encode(n.getImageData(0, 0, k, e), l * 100 || 80)
            }
        }
        var o = {
            base64: f,
            clearBase64: f.substr(f.indexOf(",") + 1)
        };
        return o
    }
}
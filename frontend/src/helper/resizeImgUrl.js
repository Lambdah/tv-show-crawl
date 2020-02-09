
function resizeImgUrl(url, sizeWidth){
    var pattList = [
        /cf-images\.us-east-1\.prod\.boltdns\.net/i,
        /images2\.9c9media\.com/i
    ];

    var i=0;
    for (;i < pattList.length; i++){
        if(pattList[i].test(url)){
            break;
        }
    }

    switch(i){
        case 0:
            let sizeLength = Math.round(sizeWidth / 1.777778);
            return url.replace(/\d\d\dx\d\d\d/i, sizeWidth + "x" + sizeLength);
        case 1:
            return url.replace(/size=\d\d\d/i, 'size=' + sizeWidth);
        default:
            return null;
    }
}

module.exports = resizeImgUrl;
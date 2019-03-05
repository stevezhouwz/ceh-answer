/**
 * Created by zhou on 2017/5/3.
 * 自适应js
 */
window.myWidth = 0;
selfAdaption();
function selfAdaption(correctScale){
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');
    dpr = window.devicePixelRatio || 1;

    rem = $(window).width() * dpr / 10;
    scale = 1 / dpr;

    if(!window.myWidth){
        window.myWidth = $(window).width();
    }
    rem = window.myWidth * dpr / 10;
    if(correctScale){
        scale = correctScale;
    }else{
        scale = 1 / dpr;
    }

    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * window.myWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

    // 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px !important;}';
//            alert("metaEl:"+" "+'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function(v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function(v) {
        v = parseFloat(v);
        return v / rem;
    };

    window.dpr = dpr;
    window.rem = rem;
}



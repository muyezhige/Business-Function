/**
 * @description 根据数组列表，循环拼接DOM结构，每4个span，外围包裹一个DIV节点。
 * @param {String} [tpl] 拼接后输出的最终模板
 */

let list = []; // 接口返回的数据
let anchorArray = ['<div class="swiper-slide clearfix">'];
const step = 4;
for (let [index, elem] of list.entries()) {
    let num = index + 1;
    anchorArray.push("<span></span>");

    if (num % step == 0) {
        if (num >= list.length) {
            anchorArray.push('</div>');
        } else {
            anchorArray.push('</div><div class="swiper-slide clearfix">');
        }
    } else {
        if (num >= list.length) {
            anchorArray.push('</div>');
        }
    }
}
let tpl = anchorArray.join("");

/**
 * @description 倒计时，剩余天、小时、分、秒。
 */

let aHour = 60 * 60;
let aDay = aHour * 24;

//将0-9的数字前面加上0，例1变为01
function checkTime(i){ 
    if(i < 10) { 
        i = "0" + i; 
    }
    return i; 
} 

function showCountDown(endTimeStamp, divname) {
    // 当前时间
    let now = new Date();
    // 当前时间与指定时间的毫秒差
    let milli = endTimeStamp - now.getTime();
    // 毫秒转秒
    let seconds = parseInt(milli / 1000);
    // 计算剩余天数
    let day = Math.floor(seconds / aDay);
    // 计算剩余小时数
    let hour = Math.floor((seconds - day * aDay) / aHour);
    // 计算剩余分钟数
    let minute = Math.floor((seconds - day * aDay - hour * aHour) / 60);
    // 计算剩余秒数
    let second = Math.floor(seconds - day * aDay - hour * aHour - minute * 60);

    let $ele = document.getElementById(divname);
    $ele.innerHTML = "距离活动开始还有：" + checkTime(day) + "天" + checkTime(hour) + "时" + checkTime(minute) + "分" + checkTime(second) + "秒";
}

// 定时器，每1秒, 计算一次，并刷新区域dom
setInterval(function() {
    showCountDown(1539723925000, 'divdown');
}, 1000);

/**
 * @description 单击选中的button，在显示区域滚动居中显示
 * @param {string} [parentClass] 外围滚动区域的样式类名，通过它获取显示宽度
 * @param {Number} [index] 当前按钮的索引值
 * @param {Object} [mySwiper] 当前操作的swiper对象
 * @param {Array} [slidesGrid] 数组集合，包含了按钮各自居左的位置；
 * @param {Array} [slidesSizesGrid] 数组集合，包含了按钮各自的宽度；
 */
let scrollToCenter = function(parentClass, index, mySwiper) {
    let maxTranslate = mySwiper.maxTranslate();
    let translateX = 0,
        translateY = 0,
        translateZ = 0;

    translateX = -(mySwiper.slidesGrid[index + 1] - ($(parentClass).width() + mySwiper.slidesSizesGrid[index]) / 2);

    if (-translateX > -maxTranslate) {
        translateX = maxTranslate;
    }

    if (translateX > 0 ) {
        translateX = 0;
    }

    mySwiper.setWrapperTransition(250);
    mySwiper.setWrapperTranslate(translateX);
};
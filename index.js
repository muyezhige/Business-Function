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

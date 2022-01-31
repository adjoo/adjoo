$(document).ready(function () {

    //lazy image
    function replaceAttrAndClassOfElement(item, itemSelector, targetAttributeName, sourceAttributeName) {
        var sourceAttributeValue = item.attr(sourceAttributeName);
        item.removeAttr(sourceAttributeName);
        item.removeClass(itemSelector);
        item.attr(targetAttributeName, sourceAttributeValue);
    }
    const lazyImageClassName = '.js_lazy_image';
    const lazyImageSrcAttr = 'data-src';
    setTimeout(function(){
        $(window).trigger('scroll');
    }, 0);
    $(window).scroll( function() {
        let winScrollVal = $(this).scrollTop() + $(this).height() + 300; //высота до низа окна
        let targetPos;//позиция цели
        let targetAttr;
        $(lazyImageClassName).each(function() {
            targetPos = $(this).offset().top;
            if (targetPos < winScrollVal) {
                //сработает когда пользователь доскроллит к элементу с классом .lazy
                replaceAttrAndClassOfElement($(this), lazyImageClassName, 'src', lazyImageSrcAttr)
            }
        });
    });


    //плавный скролл по странице
    $("a[href^='#'].js_scroll").click(function () { //ссылка с указателем на ID и классом js_scroll
        var _href = $(this).attr("href");
        var currPosition = $(this).offset().top;
        var targetPosition = $(_href).offset().top;
        var scrollDuration = Math.abs(targetPosition - currPosition) / 5;
        var keyframes = {scrollTop: targetPosition + "px"};
        var options = [scrollDuration, 'swing',];
        $("html, body").animate(keyframes, options);
        return false;
    });

    /*постраничный скролл сайта*/
    fullPageScroll({});


})


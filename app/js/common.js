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
    fullPageScroll({})
    /*селектор контейнера страниц,селектор контейнера кнопок*/
    function fullPageScroll(options){
        /*инициализация */
        const markersContainer = options.markersContainerSelector ? $(markersContainerSelector) : $('.fullPageScroll__container');
        const sectionSelector = options.pageSelector ? options.pageSelector : '.fullPageScroll__section';
        const markerSelector = options.markerSelector ? options.markerSelector : '.fullPageScroll__scrollButton';
        let arrayPages = [];
        let arrayMarkers = [];
        /*заполнение массива строк*/
        $(sectionSelector).each(function(i){
            arrayPages.push($(this));
        });
        $(markerSelector).each(function(i){
            arrayMarkers.push($(this));
        });
        /*класс хранит текущий элемент*/
        let currentItem = {
            _item: 0,
            _length: arrayPages.length,
            getItem: function(){return this._item},
            setItem: function(step, target){
                this._item = step ? this._item + step : this._item;
                this._item = (target+1) ? target : this._item;
                this._item = (this._item < 0)? 0 : this._item;
                this._item = (this._item >= this._length)? this._length -1 : this._item ;
            },
        };
        updateVisibility();

        //вешаем событие по клику на маркеры страниц
        arrayMarkers.forEach((item, i)=>{
            item.on("click", (e)=>{
                currentItem.setItem(0, i);
                updateVisibility();
            })
        })
        markersContainer.bind('mousewheel', function(e){
            if(e.originalEvent.wheelDelta /100 > 0) {
                currentItem.setItem(-1);
                updateVisibility();
            }
            else{
                currentItem.setItem(1);
                updateVisibility();
            }
        });

        //markersContainer.touchInit();
        markersContainer.swipe((e)=>{
            if(e == "up") {
                currentItem.setItem(1);
                updateVisibility();
            }
            else{
                currentItem.setItem(-1);
                updateVisibility();
            }
        }, {mouse: false})


        /*изменяет активную страницу и кнопку на основании currentItem*/
        function updateVisibility(){
            arrayPages.forEach((item, i)=>{
                if (i==currentItem.getItem()){
                    item.css('max-height', '')
                        .css('min-height', '')
                        .css('opacity', '')
                        .css('padding', '')
                        .addClass('active');
                }else{
                    item.css('max-height', '0px')
                        .css('min-height', '0px')
                        .css('opacity', '0')
                        .css('padding', '0px')
                        .removeClass('active');
                }
            });
            arrayMarkers.forEach((item, i)=>{
                if (i==currentItem.getItem()){
                    item.addClass('active');
                }else{
                    item.removeClass('active');
                }
            });
        };

    };


})


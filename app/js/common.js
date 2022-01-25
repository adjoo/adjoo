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


    //маска ввода номера телефона
    $(function () {
        $("input[name=phone]").mask("+7 (999) 999-99-99");
    });

    //попап окна
    const popupLinkClassSelector = '.popup'         //селектор ссылки на MagnificPopup
    const popupWindowClass = 'mfp_popup_window'     //основной класс контейнера MagnificPopup
    const linkWhereAttr = 'link_name';              //атрибут ссылки на MagnificPopup, указывающий место вызова
    const linkWhereAttrDefaultValue = 'кнопка Заказать звонок1';    //значение по умолчанию для поля Where в форме заказать звонок
    const formWhereInputSelector = 'input[name="where"]';   //селектор поля Where в форме заказать звонок
    const lazyImageInPopupClassName = '.js_lazy_image_popup'; //селектор lazy картинки в MagnificPopup
    $(popupLinkClassSelector).magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,
        mainClass: popupWindowClass,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 600,
        zoom: {
            enabled: true,
            duration: 600
        },
        callbacks: {
            //указываем место на странице, откуда вызвано попап-окно
            open: function () {
                //помечаем место вызова
                const placeOfCall = this.currItem.el[0].getAttribute(linkWhereAttr) || linkWhereAttrDefaultValue; //название кнопки вызова формы
                const targetPopupForm = this.container; //попап форма
                const inputWhereElement = targetPopupForm.find(formWhereInputSelector)[0]; //инпут со значением места вызова формы
                if (inputWhereElement){inputWhereElement.setAttribute('value' ,placeOfCall)}

                //загружаем lazy-картинки при открытии окна
                $(this.container).find(lazyImageInPopupClassName).each(function() {
                    replaceAttrAndClassOfElement($(this), lazyImageInPopupClassName, 'src', lazyImageSrcAttr)
                });

            },
        },
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

    //отправка формы обратной связи
    const ajaxFormClass = ".js_form";
    const popupGreetionWindowId = "#js_popup_greeting";
    $(ajaxFormClass).on('submit', function (event) {
        console.log($(this));
        $.ajax({
            url: "mailer.php", //url страницы
            type: "POST", //метод отправки
            dataType: "html", //формат данных
            data: $(this).serialize(),  // Сеарилизуем объект
            success: function () { //Данные отправлены успешно
                console.log('ajax sucсesfull');
                $(popupGreetionWindowId).children(".success").show();
                $(popupGreetionWindowId).children(".fail").hide();
                $.magnificPopup.open({items: {src: popupGreetionWindowId, type: "inline"}});
                setTimeout(function () {
                    $(popupGreetionWindowId).delay(600).fadeOut(300);
                    setTimeout(function () {
                        $.magnificPopup.close()
                    }, 900);//тайминг исчезновения окна
                }, 2000);//тайминг показа окна спасибо за заявку
                setTimeout(function () {/*document.location.reload(false)*/
                    ;
                }, 2000);
            },
            error: function () { // Данные не отправлены
                console.log('ajax error');
                $(popupGreetionWindowId).children(".success").hide();
                $(popupGreetionWindowId).children(".fail").show();
                $.magnificPopup.open({items: {src: popupGreetionWindowId, type: "inline"}});
                setTimeout(function () {
                    $(popupGreetionWindowId).delay(600).fadeOut(300);
                    setTimeout(function () {
                        $.magnificPopup.close()
                    }, 900);//тайминг исчезновения окна
                }, 2000);//тайминг показа окна спасибо за заявку
                setTimeout(function () {/*document.location.reload(false)*/
                        ;
                    }
                    , 2000);
            }
        });
        return false;
    });

    //несколько каруселей на странице
    const sliderContainersClasses = ['.section_1','#popup_gallery_1',
        '#popup_gallery_2','#popup_gallery_3','#popup_gallery_4',
        '#popup_gallery_5','#popup_gallery_6','#popup_gallery_7','#popup_gallery_8']; //корневой элемент где есть карусели (секция)
    const sliderWrapperClass = '.jsSliderWr'; //класс карусели
    const sliderButtonPrevClass = '.jsSliderPrevBtn'; //класс кнопки назад
    const sliderButtonNextClass = '.jsSliderNextBtn'; // и вперед

    sliderContainersClasses.forEach(element => { //для каждого родителя карусели
        let currCarousel = $(element).find(sliderWrapperClass); //текущая карусель
        let currCarouselPrevBtn = $(element).find(sliderButtonPrevClass); //и кнопки
        let currCarouselNextBtn = $(element).find(sliderButtonNextClass); //вперед назад
        currCarousel.jcarousel(
            {
                wrap: 'circular',
                animation:
                    {
                        duration: 600,
                        complete: function () {
                        }
                    }
            })
            .jcarousel('scroll', '0') //убран глюк потери первого элемента
        ;
        $(currCarouselPrevBtn).click(function() {
            $(currCarousel).jcarousel('scroll', '-=1');
        });
        $(currCarouselNextBtn).click(function() {
            $(currCarousel).jcarousel('scroll', '+=1');
        });
    })
    const sliderContainersAutoscrollClasses = ['.section_1',]; //корневой элемент где есть карусели с автоскроллом
    sliderContainersAutoscrollClasses.forEach(element => { //для каждого родителя карусели
        let currCarousel = $(element).find(sliderWrapperClass); //текущая карусель
        currCarousel.jcarouselAutoscroll(  //автоскролл
            {
                interval: 6000,
                target: '+=1',
                autostart: true,
            }
        );
    });





    //fullPageScroll постраничный скролл
    const fullPageMainContainer = $('.fullPageScroll__container');
    const fullPageNavButtonsContainer = $('.fullPageScroll__scrollNav');
    const fullPageSectionSelector = '.fullPageScroll__section';
    let fullPageSections = [];
    $(fullPageSectionSelector).each(function(){
        fullPageSections.push($(this));
    });
    let fullPageActiveSection = {
        item: fullPageSections[0],
        numIndex: 0,
    };
    fullPageActiveSection.item.addClass('active');

    const fullPageMarkerSelector = '.fullPageScroll__scrollButton';
    let fullPageMarkers = [];
    $(fullPageMarkerSelector).each(function(el){
        fullPageMarkers.push($(this));
        $(this).attr('for', fullPageSections[el].attr('id'));
    });
    let fullPageActiveMarker = {
        item: fullPageMarkers[0],
        numIndex: 0,
    };
    fullPageActiveMarker.item.addClass('active');

    //объект параметров вызова для функции fullPageScrollTo
    let fullPageScrollOptions = {
        pagesWrapper: fullPageMainContainer,
        pagesItems: fullPageSections,
        navItems: fullPageMarkers
    }

    //вешаем событие по клику на маркеры страниц
    fullPageMarkers.forEach((item)=>{
        item.on("click", (e)=>{
            let markerTarget = $(e.target).attr('for');
            fullPageScrollTo(markerTarget, fullPageScrollOptions)
        })
    });


    fullPageMainContainer.bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
            fullPageScrollTo(1, fullPageScrollOptions)
        }
        else{
            fullPageScrollTo(-1, fullPageScrollOptions)
        }
    });

    //fullPageScrollNext(2, fullPageScrollOptions)







    /**
     * Выполняет скролл элемента до нужного
     * @function fullPageScrollTo(){}
     * @param id целевой страницы
     * @param {pagesWrapper,pagesItems,navItems} контейнер - wrapper, массив страниц, массив маркеров
     * @returns 0
     */
    function fullPageScrollTo(targetPageId, options) {
        targetPageId = targetPageId||0;
        options.pagesWrapper = options.pagesWrapper||$('html');
        options.pagesItems = options.pagesItems||null;
        options.navItems = options.navItems||null;

        options.navItems.forEach((item)=>{
            if (item.attr('for') == targetPageId){
                item.addClass('active');
            }else{
                item.removeClass('active');
            }
        });

        options.pagesItems.forEach(function(item){
            if (item.attr('id') != targetPageId){
                item.css('max-height', '0px')
                    .css('min-height', '0px')
                    .css('padding', '0px')
                    .removeClass('active');
            } else {
                item.css('max-height', '')
                    .css('min-height', '')
                    .css('padding', '')
                    .addClass('active');
            }
        });

    };

    function fullPageScrollNext(directionStep, options) {
        directionStep = directionStep||1; //1 == down,-1 == up
        let currentPageId = $(fullPageSectionSelector + '.active').attr('id');
        let currentPageNum =  currentPageId.split('section_')[1];
        let targetPageNum = +currentPageNum + directionStep;
        let targetPageId = 'section_' + targetPageNum;
        options.pagesWrapper = options.pagesWrapper||$('html');
        options.pagesItems = options.pagesItems||null;
        options.navItems = options.navItems||null;

        options.navItems.forEach((item)=>{
            if (item.attr('for') == targetPageId){
                item.addClass('active');
            }else{
                item.removeClass('active');
            }
        });

        options.pagesItems.forEach(function(item){
            if (item.attr('id') != targetPageId){
                item.css('max-height', '0px')
                    .css('min-height', '0px')
                    .css('padding', '0px')
                    .removeClass('active');
            } else {
                item.css('max-height', '')
                    .css('min-height', '')
                    .css('padding', '')
                    .addClass('active');
            }
        });

    };

    function fullPageScrollRerender(obj){

    }









})


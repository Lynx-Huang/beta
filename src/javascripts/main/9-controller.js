$(window).load(function() {
    $('.load').fadeOut(500);
    // 滾動css動態
    new WOW().init();
    //跑馬燈
})

$(function() {
    /*-------------------------------*/
    /*---手機選單---*/
    /*-------------------------------*/
    var RWD = navigator.userAgent,
        winWidth = $(window).width(),
        anoWidth = 0,
        nowstatus = 0, // 0 = mobile / 1 = desktop
        nowIndex,
        nowNavIndex,
        pos,
        filter,
        fixbar,
        winNow,
        posRef,
        jsrwd,
        body = $("html, body"),
        $mask,
        scrollNow,
        $header = $('header'),
        $nav = $('nav'),
        needMask = false;

    if (needMask) {
        var $mask = $('<div class="mask"></div>').hide();
        $('.page').after($mask);
    }

    //$(".video").fitVids();
    //document.createElement("picture");

    $('.nav-toggle').on('click', MENU);
    $('.mask').on('click', MENU);

    
/*---------------------------------------------------------*/
    var $backToTop = $(".back-to-top");
    $backToTop.hide();


    $(window).on('scroll', function() {
    if ($(this).scrollTop() > 100) {
        $backToTop.fadeIn();
    } else {
        $backToTop.fadeOut();
    }
    });

    $backToTop.on('click', function(e) {
        $("html, body").animate({scrollTop: 0}, 500);
    });
    $(window).scroll(function(){
        var  last = $("body").height()-$(window).height()-200
        if($(window).scrollTop() >= last){
            $(".back-to-top").addClass('wht')
        }
        else {
            $(".back-to-top").removeClass('wht')
        }
    })
/*---------------------------------------------------------*/

    $(window).scroll(function() {
        scrollNow = $(window).scrollTop();
        console.log(scrollNow);
        if (scrollNow > 80) {
            $header.addClass('fixed');
            $nav.addClass('fixed');
            $('.nav').addClass('active');
        } else {
            $header.removeClass('fixed');
            $nav.removeClass('fixed');
            $('.nav').removeClass('active');
        }
    });

    $(window).resize(function() {
        if (needMask) {
            $mask.hide();
        }
        $('.nav-toggle').removeClass('show');
        $('.page').removeClass('show');
        $('html,body').removeClass('show');
        $('.nav').removeClass('show');
    });

    $(".lazy").lazyload({
        threshold: 500,
        effect: "fadeIn"
    });

    function MENU() {
        if (needMask) {
            $mask.fadeToggle(300);
        }
        $('.page').toggleClass('show');
        $('html,body').toggleClass('show');
        $('.nav-toggle').toggleClass('show');
        $('.nav').toggleClass('show');
        $('.more-menu').toggleClass('show')
            //$header.toggleClass('fixed');
        return false;
    }
});

function globalDevice(e) {
    var RWD = navigator.userAgent;
    if (RWD.match(/iPhone|iPad|iPod|Android|BlackBerry/i)) {
        return "1";
    } else {
        return "0";
    }
}
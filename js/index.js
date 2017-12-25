$(document).ready(function() {
    (function() {
        var height = $('.answer_total1').height() - 5;

        $('.answer_total').css("bottom", "-" + height + "px");
    })();
    //顶部微信关注
    $(".weixin").hover(function() {
        $(this).find("span").addClass("zhuan");
        $(this).find(".code").stop().show();
        $(this).find(".code").css('overflow', 'visible');
    }, function() {
        $(this).find("span").removeClass("zhuan");
        $(this).find(".code").stop().hide();
        $(this).find(".code").css('overflow', 'inherit');
    });

    //右侧top
    $('.retop').on('click', function() {
        $('html,body').animate({ scrollTop: 0 }, 300);
    });
    //答题二维码
    $('.nav_main span img').on('click', function() {
        var isAttr = $('.nav_main span img').attr('src');

        if (isAttr == "images/nav_erweima.jpg") {
            $('.nav_main span img').attr('src', "images/erwei_03.png");
        } else {
            $('.nav_main span img').attr('src', "images/nav_erweima.jpg");
        }
    });

    //获取/失去 textarea焦点变色
    $('textarea.textbox_main').on('focus blur', function(e) {
        var that = $(this);
        e.type == 'focus' ? that.addClass('active') : that.removeClass('active');
    });


    //点击手动前去评分弹出提示框
    $('#confirm_btn1').click(function() {
        $('#msgSave').show();
        $('#assignMsg').hide();
        setTimeout(function() {
            $('#msgSave').hide();
        }, 500);
    });
    //点击放弃评分并交卷
    $('#confirm_btn2').click(function() {
        $('#msgSave').show();
        $('#assignMsg').hide();
        setTimeout(function() {
            $('#msgSave').hide();
        }, 500);
    });
    //交卷
    $('#submit_do').on('click', function() {      
        $('#assignMsg').show();
    });

    //暂停做题
    $('#pause_do').on('click', function() {
        $('#msgPause').show();
        // $('html,body').css({'overflowY':'hidden'});//锁定浏览器滚动条
        if (window.timers.length > 0) {
            for (var i = 0; i < window.timers.length; i++) {
                clearInterval(window.timers[i]);
            }
        }
    });

    //继续答题
    $('.margin_center').on('click', function() {
        $('#msgPause').hide();
        // $('html,body').css({'overflowY':'auto'});//锁定浏览器滚动条
        window.timers = [];
        window.timers.push(setInterval(updateTime, 1000));
    });


    //下次做题
    $('#next_do').on('click', function() {
        $('#msgSave').show();

        //数据提交在此写入代码,暂时用定时器展示
        setTimeout(function() {
            $('#msgSave').hide();
        }, 1000);


    });



    //关闭按钮
    $('.assign_close,.sheet_close,.solve_close').on('click', function(e) {
        var that = $(this),
            Class = that.attr('class');
        if (Class == 'assign_close') { //交卷窗口关闭
            $('.assignMsg').hide();
        } else if (Class == 'solve_close') { //答疑窗口关闭
            $('.solveMsg').hide();
        } else { //答题卡窗口关闭
            $('.sheetMsg').hide();
            $('html,body').css({ 'overflowY': 'auto' }); //解锁浏览器滚动条
        }
    });
   

    //打开在线答疑
    $('.answer_online').on('click', function() {
        $('.solveMsg').show();
    });

    //在线答疑提交
    $('.solve_btn a').on('click', function() {
        //答疑提交逻辑请这里编写
        alert('请到index.js文件里编写代码');
    });

    //打印试卷
    $("#print_sj").click(function() {
        $(".answer").jqprint();
    });

    //鼠标拖动事件（响应计算器拖动）
    $("#Main h3").SliderObject($("#Main"));


    //打开/关闭计算器
    $('#clator,.close_cal').on('click', function(e) {
        if (e.target.className == 'close_cal') {
            $('#Main').hide();
            $('body').css({
                '-moz-user-select': 'auto',
                '-khtml-user-select': 'auto',
                'userSelect': 'auto'
            });

        } else {
            $('#Main').show();

            /*拖动选项框的时候避免选中文字*/
            $('body').css({
                'mozUserSelect': 'none',
                'khtmlUserSelect': 'none',
                'userSelect': 'none'
            });
        }
    });
	
    //做单选题自动跳转到下一题
        $('.jump li').on('click', function() {
            var that = $(this),
				positionCss = $('.itemSelect').css('position'),
				that_top = that.closest('.answerCenter').offset().top,
				that_hight = that.closest('.answerCenter').height(),
				currHeight = that_top + that_hight;
			console.log(currHeight,$(document).scrollTop(),$(document).height());
            if (positionCss == 'static') {				
                $('html,body').animate({
                    scrollTop: currHeight - 76
                }, 100);
            } else {
                $('html,body').animate({					
                    scrollTop: currHeight-16
                }, 100);
				
            }
        });
		
    //点击答题卡显示隐藏
    var isTrue = true,
        answerHeight = $('.answer_total1').height() - 5,
        anwser1 = $('.answer_one1 a img'),
        answer_one1 = $('.answer_one1').height(),       
        thisScroll = $(window).scrollTop(),
        winHeight = $(window).height(),
        currHeight = thisScroll + winHeight;
    anwser1.on('click', function() {
        var positionCss = $('.answer_total').css('position'),
			imgName = anwser1.attr("src");
        if (positionCss == 'static') {
            if (isTrue) {
                anwser1.attr("src", "images/answer1.png");
                $('.answer_total').css({
                    'height': 'auto',
                    'paddingBottom': '0',
                    'overflow': 'hidden'
                });                
                isTrue = false;
            } else {                
                anwser1.attr("src", "images/answer.png");
                $('.answer_total').css({
                    'height': answer_one1 + 5,
                    'paddingBottom': '0',
                    'overflow': 'hidden'
                });               
                isTrue = true;
            }
        } else {
            if (isTrue) {								
				if(imgName == 'images/answer1.png'){					
					anwser1.attr("src", "images/answer.png");
                	$(".answer_total").animate({
                    	bottom: "-" + answerHeight + "px"
                	}, 100);				
				}else{					
					anwser1.attr("src", "images/answer1.png");
                	$(".answer_total").animate({
                    	bottom: "0px"
                	}, 100);
				}                
                isTrue = false;
            } else {
				if(imgName == 'images/answer.png'){
					anwser1.attr("src", "images/answer1.png");
                	$(".answer_total").animate({
                    	bottom: "0px"
                	}, 100);				
				}else{	
					anwser1.attr("src", "images/answer.png");
                	$(".answer_total").animate({
                   		bottom: "-" + answerHeight + "px"
                	}, 100);								
				}
                isTrue = true;
            }
        }
    });


    //点击答题卡选项显示隐藏
    $('.answer_Three1 ul li a').on('click', function() {
        var why = $(this);
        var wIndex = why.parent().index();
        var sheet_list = $('.sheet_list');
        why.parent().addClass('active1').siblings('li').removeClass('active1');
        sheet_list.eq(wIndex).show().siblings('.sheet_list').hide();
    });
    //获取答题卡已经作答的题数

    //监控滚动条显示/隐藏 答题卡
    $(window).scroll(function() {
        var mainHei = $('.main').offset().top + $('.main').height(),
            thisScroll = $(window).scrollTop(),
            winHeight = $(window).height(),
            currHeight = thisScroll + winHeight,
            bottomCss = $('.answer_total').css('bottom'),
            positionCss = $('.answer_total').css('position');
        if (positionCss == 'fixed') {
            if (currHeight >= mainHei - 20) {
                $('.answer_total').css({
                    'position': 'static'
                });
                anwser1.attr("src", "images/answer1.png");
                isTrue = false;
                $('html,body').animate({ scrollTop: currHeight }, 50);
            }
        } else {
            if (isTrue){
                if (currHeight < mainHei - 20) {
                    $('.answer_total').css({
                        'bottom': bottomCss,
                        'position': 'fixed',
                        'paddingBottom': '0',
                        'height': 'auto'
                    });
                }
            } else {
                if (currHeight < mainHei - 20) {
                    $('.answer_total').css({
                        'bottom': bottomCss,
                        'position': 'fixed',
                        'paddingBottom': '0'
                    });
                    if (bottomCss != "0px") {
                        anwser1.attr("src", "images/answer.png");
                    }
                    isTrue = true;
                }
            }
        }

    });








});


$(window).load(function() {

    //执行考试倒计时
    window.limit_time = parseInt($('#showtime').attr('limit_time')); // 单位：秒
    window.timers = [];
    window.timers.push(setInterval(updateTime, 1000));


});


//倒计时函数
function updateTime() {
    if (window.limit_time == 300) {
        //小于5分钟提示
        $('#msgTimes').show();
    }
    if (window.limit_time == 0) {
        // 停止计时，并自动弹出交卷窗口
        for (var i = 0; i < window.timers.length; i++) {
            clearInterval(window.timers[i]);
        }
        window.timers = [];
        window.limit_time = 0;
        $('#submit_do').click();
    }
    // 转换
    var fillZero = function(num, n) {
        var str = '' + num; //数字转换为字符串
        while (str.length < n) {
            str = '0' + str;
        }
        return str;
    };
    var iRemain = window.limit_time;
    //剩余小时
    var iHour = fillZero(parseInt(iRemain / 3600), 2);
    iRemain %= 3600; //剩下的秒数
    //剩余分钟
    var iMin = fillZero(parseInt(iRemain / 60), 2);
    iRemain %= 60;
    //剩余秒
    var iSec = fillZero(parseInt(iRemain), 2);
    var sTime = iHour + ':' + iMin + ':' + iSec;
    $('#showtime').val(sTime);
    window.limit_time--;
}
//注册一个Jquery的鼠标拖动函数,参数为要拖动的对象
$.fn.extend({
    SliderObject: function(objMoved) {
        var mouseDownPosiX;
        var mouseDownPosiY;
        var InitPositionX;
        var InitPositionY;
        var obj = $(objMoved) == undefined ? $(this) : $(objMoved);
        $(this).mousedown(function(e) {
            //当鼠标按下时捕获鼠标位置以及对象的当前位置
            mouseDownPosiX = e.pageX;
            mouseDownPosiY = e.pageY;

            InitPositionX = obj.css("left").replace("px", "");
            InitPositionY = obj.css("top").replace("px", "");
            obj.mousemove(function(e) { //这个地方改成$(document).mousemove貌似可以避免因鼠标移动太快而失去焦点的问题
                //貌似只有IE支持这个判断，Chrome和Firefox还没想到好的办法
                //if ($(this).is(":focus")) {
                var tempX = parseInt(e.pageX) - parseInt(mouseDownPosiX) + parseInt(InitPositionX);
                var tempY = parseInt(e.pageY) - parseInt(mouseDownPosiY) + parseInt(InitPositionY);
                obj.css("left", tempX + "px").css("top", tempY + "px");
                //};
                //当鼠标弹起或者离开元素时，将鼠标弹起置为false，不移动对象
            }).mouseup(function() {
                obj.unbind("mousemove");
            }).mouseleave(function() {
                obj.unbind("mousemove");
            });
        });
    }
});
;
(function(win, $) {
    //定义全局变量
    var Win = $(win),
        select_module = $('select_module'),
        select_module_index = $('#select_module_index'),
        select_module_li = $('#select_module li'),
        contentmain = $('.contentmain'),
        entry_next = $('#entry_next'),
        /*已取消*/
        itemSelect = $('.itemSelect'),
        S_checkBox = $('.S_checkBox'),
        M_checkBox = $('.M_checkBox'),
        text_submit = $('.text_submit'),
        compat = $('.compat'),
        compat_li = $('.compat li'),
        M_compat = $('.M_compat'),
        M_compat_li = $('.M_compat li'),
        form_input = $('#form-input'),
        sheet_item = $('.sheet_item'),
        selectorStyle = ".S_checkBox li,.M_checkBox li,.text_submit,.compat li,.M_compat li",
        classMainStyle = ".contentmain",
        doc = $(document);   
    //构造函数
    function question() {
        //初始化隐藏域input
        this.input_daan(form_input);
        //监控顶部选项卡和右侧顶部菜单是否随滚动条滚动
        this.init_sheet('.itemSelect');
        this.init_sheet('.side');
        //顶部选项卡切换
        this.selectfn(select_module_li);
        //底部进入下部分
        /*this.selectfn.call(this,entry_next);*/
        //单选项
        this.select_option(S_checkBox);
        //多选项
        this.select_option(M_checkBox);
        //简答题
        this.select_textarea(text_submit);
        //配伍选择题_单选
        this.select_compat(compat_li);
        //配伍选择题_多选
        this.select_compat(M_compat_li);
        //答题卡点击事件
        this.answerSheet();
        //已做试题计数
        this.cumCount(selectorStyle, classMainStyle);
    }

    question.prototype = {

        fn: {
            removeComma: function(e, opt) { //多选项清除逗号daanString,opt
                var eLen = e.length,
                    val = e + ',' + opt;
                //console.log(val);
                if (e == '') {
                    return opt;
                } else {
                    return val;
                }
            },
            removeVal: function(e, opt) { //多选项取消值
                var elen = e.length,
                    val = e.indexOf(opt) == 0 ? e.replace(opt + ',', '') : e.replace(',' + opt, '');

                if (elen == 1) {
                    return e = '';
                } else {
                    return val;
                }

            },

            clickTab: function(ele, i, ele2, ele3, thatIndex, group) { //答题卡点击编号跳转逻辑 select_module_li(#select_module li),                
                var s_m_len = ele.length; //获取ele的jquery库的长度               
                select_module_index.val(i); //修改input的输入框的值               
                $('html,body').css({ 'overflowY': 'auto' }); //解锁浏览器滚动条
                ele.eq(i).addClass('active').siblings().removeClass('active'); //设置标题头部的显示隐藏
                ele2.eq(i).show(0).siblings('.contentmain').hide();
                var itemSelectHeight = itemSelect.height(), //获取intemselect的高度相当于获取四个选框的高度
                    offset = contentmain.eq(i).find('.answer').eq(thatIndex).offset(),
                    itemSelectStyle = itemSelect.css('position'),
                    pos;
                if (group == '4') {                   
                    offset = contentmain.eq(i).find('.answer_bottom').eq(thatIndex).offset();
                }
                itemSelectStyle == 'fixed' ?
                    pos = offset.top - itemSelectHeight - 10 :
                    pos = offset.top - itemSelectHeight - (itemSelectHeight + 10);
                $('body,html').scrollTop(pos);               
            },
            card: function(e, checkClass, val, textareaTerm) { //that表示当前对象,checkClass 当前对象上的ul的class属性 S_checkBox,btn 自定义属性的值
              
                checkClass == 'S_checkBox' ? //
                    (e.hasClass('active') ?
                        sheet_item.find('li').eq(val - 1).removeClass('answered') :
                        sheet_item.find('li').eq(val - 1).addClass('answered')
                    ) : '';

                checkClass == 'M_checkBox' ? //
                    (e.hasClass('active') ?
                        sheet_item.find('li').eq(val - 1).removeClass('answered') :
                        sheet_item.find('li').eq(val - 1).addClass('answered')
                    ) : '';
                checkClass.indexOf('M_compat') > -1 ?
                    (e.hasClass('active') ?
                        sheet_item.find('li').eq(val - 1).removeClass('answered') :
                        sheet_item.find('li').eq(val - 1).addClass('answered')
                    ) : '';
                checkClass.indexOf('compat') > -1 ?
                    (e.hasClass('active') ?
                        sheet_item.find('li').eq(val - 1).removeClass('answered') :
                        sheet_item.find('li').eq(val - 1).addClass('answered')
                    ) : '';
               
                checkClass.indexOf('textbox_main') > -1 ?
                    (e.prev().val() == "" ?
                        sheet_item.find('li').eq(val - 1).removeClass('answered') :
                        sheet_item.find('li').eq(val - 1).addClass('answered')
                    ) : '';               
            }

        },
        input_daan: function(item) { //初始化隐藏域input
            var con_len = contentmain.length, //多选题按钮
                group,
                str;            
            var b = contentmain[0];           
            if (con_len > 1) { //如果这个这四个对象大于1
                for (var i = 0; i < con_len; i++) { //循环这个con_len对象
                    var conTentMainEq = contentmain.eq(i), //找到contentmain库中的第i个对象保存在conTenMainEq中

                        conFind = conTentMainEq.find('.answer'), //在
                        conFindLen = conFind.length;                   
                    group = conTentMainEq.attr('group');
                    for (var k = 0; k < conFindLen; k++) {
                        var conFindIndex = conFind.eq(k).children().attr('index');
                        if (group == 4) { //配伍选择题
                            var conFindIndexCompat = conFind.eq(k).find('.answer_bottom,.answer_b'),
                                conFindIndexCompatLen = conFindIndexCompat.length;
                            for (var p = 0; p < conFindIndexCompatLen; p++) {
                                var conFindIndexCompatIndex = conFindIndexCompat.eq(p).attr('index');
                                str = '<input type="hidden" name="daan[' + conFindIndexCompatIndex + ']" btn="' + conFindIndexCompatIndex + '" m="' + group + '" value="">';
                                item.append(str);
                            }
                        } else { //其他题型
                            str = '<input type="hidden" name="daan[' + conFindIndex + ']" btn="' + conFindIndex + '" m="' + group + '" value="">';
                            item.append(str);
                        }
                    }
                }
            } else {
                var conTentMainEq = contentmain,
                    conFind = conTentMainEq.find('.answer'),
                    conFindLen = conFind.length;
                group = conTentMainEq.attr('group');
                for (var k = 0; k < conFindLen; k++) {
                    var conFindIndex = conFind.eq(k).children().attr('index');
                    if (group == 4) { //配伍选择题
                        var conFindIndexCompat = conFind.eq(k).find('.answer_bottom,.answer_bottom1'),
                            conFindIndexCompatLen = conFindIndexCompat.length;
                        for (var p = 0; p < conFindIndexCompatLen; p++) {
                            var conFindIndexCompatIndex = conFindIndexCompat.eq(p).attr('index');
                            str = '<input type="hidden" name="daan[' + conFindIndexCompatIndex + ']" btn="' + conFindIndexCompatIndex + '" m="' + group + '" value="">';
                            item.append(str);
                        }
                    } else { //其他题型
                        str = '<input type="hidden" name="daan[' + conFindIndex + ']" btn="' + conFindIndex + '" m="' + group + '" value="">';
                        item.append(str);
                    }
                }
            }
        },
        init_sheet: function(item) { //监控顶部选项卡和右侧顶部菜单是否随滚动条滚动
            var itemSelect = $(item),
                itemTop = itemSelect.offset().top;
            Win.scroll(function() {
                var scroTop = Win.scrollTop();
                if (scroTop > itemTop - 10) {
                    itemSelect.css({ position: 'fixed', top: 0 });
                } else if (scroTop < itemTop) {
                    itemSelect.css({ position: 'static' });
                }
            });
        },
        selectfn: function(term) { //顶部选项卡切换
            var liLength = select_module_li.length;
            liLength == 1 ? entry_next.hide() : entry_next.show();
            term.on('click', function() {
                var that = $(this),
                    index = that.index();               
                that.attr('id') == 'entry_next' ?
                    (
                        index = parseInt(select_module_index.val()) + 1,
                        select_module_li.eq(index).addClass('active').siblings('li').removeClass('active')
                    ) :
                    that.addClass('active').siblings('li').removeClass('active');                
                contentmain.eq(index).show().siblings('.contentmain').hide();
                parseInt(index) === liLength - 1 ? entry_next.hide() : entry_next.show();
                $('body,html').animate({ scrollTop: 0 + 'px' }, 200);
            });
        },
        select_option: function(Select) { //单选、多选逻辑
            var self = this;
            Select.children('li').on('click', function() {
                var that = $(this),
                    closestTerm = that.closest('.answer'), //保存当前对象的那个组
                    index = closestTerm.index(), //获取当前对象的下标在元素库中的下标
                    closestContentmain = that.closest('.contentmain'), //获取父元素的
                    itemSelectHeight = itemSelect.height(), //获取高度
                    itemSelectStyle = itemSelect.css('position'), //获取定位方式
                    checkClass = that.closest('ul').attr('class'), //h获取当前对象的ul的class属性
                    closestContentmainOffset = closestContentmain.find('.answer').eq(index + 1).offset(), //找到当前祖先对象下的点击的高度
                    group = closestContentmain.attr('group'), //获取他的自定义属性的值
                    btn = that.closest('ul').attr('btn'), //获取当前点击对象的ul的btn自定义属性
                    opt = that.find('.opt2').text(), //获取文本内容
                    daan = $('input[name="daan[' + btn + ']"]'),

                    daanString = daan.val(), //获取选项
                    daanVal = self.fn.removeComma(daanString, opt),
                    pos;              

                if (closestContentmainOffset) {
                    pos = closestContentmainOffset.top - (itemSelectHeight + 10);
                }
                index == 0 ? (itemSelectStyle !== 'fixed' ? pos = pos - itemSelectHeight : '') : '';

                self.fn.card(that, checkClass, btn);

                that.hasClass('active') ?
                    (
                        that.removeClass('active'),
                        checkClass == 'M_checkBox' ?
                        (
                            daan.val(self.fn.removeVal(daanString, opt)) //递减多选题input值
                        ) :
                        daan.val('') //清空单选题input值
                    ) :
                    (
                        checkClass == 'M_checkBox' ?
                        (
                            that.addClass('active'),
                            daan.val(daanVal) //给多选题input赋值
                        ) :
                        (
                            that.addClass('active').siblings().removeClass('active'),
                            daan.val(opt) //给单选题input赋值                           
                        )
                    );

            });
        },
        select_textarea: function(Select) { //简答题逻辑
            var self = this;
            Select.on('click', function() {
                var that = $(this), //转换jquery对象
                    closestTerm = that.closest('.answer'), //找到answer这个class保存在这个中
                    index = closestTerm.index(), //获取下标
                    closestContentmain = that.closest('.contentmain'),
                    itemSelectHeight = itemSelect.height(),
                    itemSelectStyle = itemSelect.css('position'),
                    textareaTerm = that.prev('.textbox_main'),
                    checkClass = that.prev().attr('class'),
                    closestContentmainOffset = closestContentmain.find('.answer').eq(index + 1).offset(),
                    textareaVal = that.siblings('textarea').val(),
                    btn = that.closest('ul').attr('btn'),
                    daan = $('input[name="daan[' + btn + ']"]'),
                    aaa = that.prev().val(),
                    pos;                
                self.fn.card(that, checkClass, btn, textareaTerm);                
                index == 0 ? (itemSelectStyle !== 'fixed' ? pos = pos - itemSelectHeight : '') : '';
                daan.val(textareaVal);                
            });
        },
        select_compat: function(Select) { //配伍选择题_单选、多选
            var self = this;
            Select.on('click', function() {
                var that = $(this),
                    checkClass = that.closest('ul').attr('class'),
                    opt = that.find('.opt2').text(),
                    btn = that.closest('.answer_bottom ,.answer_bottom1').children('ul').attr('btn'),
                    daan = $('input[name="daan[' + btn + ']"]'),
                    daanString = daan.val();               
                var daanVal = self.fn.removeComma(daanString, opt);                
                self.fn.card(that, checkClass, btn);
                that.hasClass('active') ?
                    (
                        that.removeClass('active'),
                        checkClass.indexOf('M_compat') > -1 ?
                        (
                            daan.val(self.fn.removeVal(daanString, opt)) //递减多选题input值
                        ) :
                        daan.val('') //清空单选题input值
                    ) :
                    (
                        checkClass.indexOf('M_compat') > -1 ?
                        (
                            daan.val(daanVal),
                            that.addClass('active')

                        ) :
                        (
                            that.addClass('active').siblings().removeClass('active'),
                            daan.val(opt)
                        )
                    );
            });
        },
        answerSheet: function() { //答题卡点击事件
            var self = this;
            sheet_item.find('ul li').on('click', function() {
                var that = $(this), //转换dom对象为jquery对象
                    thatClosest = that.closest('.sheet_list'), //获取当前元素的上级的第一个class为sheet_list的第一个元素保存在thatClosest中
                    sheetMsg = $('.sheetMsg'), //找到class为.sheetMsg的元素保存在sheetMsg中相当于答题框
                    text = that.find('a').text(), //获取当前对象下的a元素的文本内容保存在text中
                    thatIndex = that.index(), // 获取当前点击的按钮的下标 相当于获取的是这一组的哪一个
                    listIndex = thatClosest.index(), //thatCosest的下标下标保存在listIndex中相当于获取的是那一组
                    group = thatClosest.attr('group'); //获取自定义属性group的值保存在group中相当于获取的是答案框子的那一排
                self.fn.clickTab(select_module_li, listIndex, contentmain, sheetMsg, thatIndex, group); //执行当前对象的原型对象的clickTab方法               
            });


        },
        cumCount: function(selectorStyle, classMainStyle) {
            contentmain.on('click', selectorStyle, function() {
                var that = $(this),
                    group = that.closest(classMainStyle).attr('group'),
                    selectorMainCum = $('.answer_four1'),
                    selectorShowCum = $('.itemSelect ul li.active span b'),
                    num = selectorMainCum.find('.sheet_list').eq(group - 1).find('.sheet_item ul li.answered').length;
                selectorShowCum.html(num);
            });
        }

    };

    win.exam = new question();
})(window, $);
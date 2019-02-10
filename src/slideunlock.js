function SliderUnlock(elm, options, success) {
	var me = this
	var $elm = me.checkElm(elm) ? $(elm) : $
	success = me.checkFn(success) ? success : function() {}
	var opts = {
		successLabelTip: '验证成功',
		duration: 200,
		swipestart: false,
		min: 0,
		max: $elm.width(),
		index: -1,
		IsOk: false,
		lableIndex: 0
	}
	opts = $.extend(opts, options || {})
	//$elm
	me.elm = $elm
	//opts
	me.opts = opts
	//是否开始滑动
	me.swipestart = opts.swipestart
	//最小值
	me.min = opts.min
	//最大值
	me.max = opts.max
	//当前滑动条所处的位置
	me.index = opts.index
	//是否滑动成功
	me.isOk = opts.isOk
	//滑块宽度
	me.labelWidth = me.elm.find('#label').width()
	//滑块背景
	me.sliderBg = me.elm.find('#slider_bg')
	//鼠标在滑动按钮的位置
	me.lableIndex = opts.lableIndex
	//success
	me.success = success
}

SliderUnlock.prototype.init = function() {
	var me = this
	me.updateView()
	me.elm
		.find('#label')
		.on('mousedown', function(event) {
			var e = event || window.event
			me.lableIndex = e.clientX - this.offsetLeft
			me.handerIn()
		})
		.on('mousemove', function(event) {
			me.handerMove(event)
		})
		.on('mouseup', function(event) {
			me.handerOut()
		})
		.on('mouseleave', function(event) {
			me.handerOut()
		})
}
SliderUnlock.prototype.clear = function() {
	var me = this
	me.elm
		.find('#label')
		.off('mousedown')
		.off('mousemove')
		.off('mouseup')
	me.init()
	me.index = -1
	me.sliderBg.animate({ width: 0 }, me.opts.duration)
	me.elm.find('#label').removeClass('label-active')
	me.elm
		.find('.label-arrow')
		.removeClass('move-label')
		.removeClass('success-label')
	me.elm
		.find('#label')
		.next('#drag-tips')
		.text('请拖住滑块，拖动到最右边完成验证')
		.removeClass('drag-tips-active')
	me.updateView()
}

/**
 * 鼠标/手指接触滑动按钮
 */
SliderUnlock.prototype.handerIn = function() {
	var me = this
	me.swipestart = true
	me.min = 0
	me.elm.find('#label').addClass('label-active')
	me.elm.find('.label-arrow').addClass('move-label')
	me.max = me.elm.width()
}

/**
 * 鼠标/手指移出
 */
SliderUnlock.prototype.handerOut = function() {
	var me = this
	//停止
	me.swipestart = false
	//me.move();
	if (me.index < me.max) {
		me.reset()
		me.opts.isMouseDown = false
	}
}

/**
 * 鼠标/手指移动
 * @param event
 * @param type
 */
SliderUnlock.prototype.handerMove = function(event, type) {
	var me = this
	if (me.swipestart) {
		event.preventDefault()
		event = event || window.event
		if (type == 'mobile') {
			me.index = event.originalEvent.touches[0].pageX - me.lableIndex
		} else {
			me.index = event.clientX - me.lableIndex
		}
		me.move()
	}
}

/**
 * 鼠标/手指移动过程
 */
SliderUnlock.prototype.move = function() {
	var me = this
	if (me.index + me.labelWidth >= me.max) {
		me.index = me.max - me.labelWidth - 2
		//停止
		me.swipestart = false
		//解锁
		me.isOk = true
	}
	if (me.index < 0) {
		me.index = me.min
		//未解锁
		me.isOk = false
	}
	if (me.index + me.labelWidth + 2 == me.max && me.max > 0 && me.isOk) {
		//解锁默认操作
		me.elm
			.find('#label')
			.unbind()
			.next('#drag-tips')
			.text(me.opts.successLabelTip)
			.addClass('drag-tips-active')
		me.elm
			.find('.label-arrow')
			.addClass('success-label')
			.removeClass('move-label')
		me.success()
	}
	me.updateView()
}

/**
 * 更新视图
 */
SliderUnlock.prototype.updateView = function() {
	var me = this
	me.sliderBg.css('width', me.index)
	me.elm.find('#label').css('left', me.index + 'px')
}

/**
 * 重置slide的起点
 */
SliderUnlock.prototype.reset = function() {
	var me = this

	me.index = -1
	me.sliderBg.animate({ width: 0 }, me.opts.duration)
	me.elm
		.find('#label')
		.animate({ left: me.index }, me.opts.duration)
		.next('#drag-tips')
		.animate({ opacity: 1 }, me.opts.duration)

	me.elm.find('#label').removeClass('label-active')
	me.elm.find('.label-arrow').removeClass('move-label')
	me.updateView()
}

/**
 * 检测元素是否存在
 * @param elm
 * @returns {boolean}
 */
SliderUnlock.prototype.checkElm = function(elm) {
	if ($(elm).length > 0) {
		return true
	} else {
		throw '参数无效'
	}
}

/**
 * 检测传入参数是否是function
 * @param fn
 * @returns {boolean}
 */
SliderUnlock.prototype.checkFn = function(fn) {
	if (typeof fn === 'function') {
		return true
	} else {
		throw '参数无效'
	}
}

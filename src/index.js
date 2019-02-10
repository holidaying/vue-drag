var app = new Vue({
	el: '#app',
	name: 'slideunlock',
	props: {
		isShow: {
			default: true
		},
		boxId: {
			type: String,
			default: 'slide-unlock'
		},
		className: {
			type: String,
			default: ''
		}
	},
	data: function() {
		return {
			success: false
		}
	},
	watch: {
		isShow: function(flag) {
			if (flag) {
				this.success = false
				slider && slider.clear()
			}
		}
	},
	methods: {
		slideSave: function() {
			this.success && this.$emit('passSuccess', true)
		},
		slideCancel: function() {
			this.$emit('closeSuccess', true)
		},
		closeSlider: function() {
			this.$emit('closeSuccess', true)
		}
	},
	mounted: function() {
		slider = new SliderUnlock(
			'#' + this.boxId,
			{},
			function() {
				this.success = true
			}.bind(this)
		)
		slider.init()
	}
})

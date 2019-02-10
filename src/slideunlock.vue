<template>
    <transition name="fade">
        <div class="popbox-container" v-show="isShow">
            <div class="ocx-masker">
                <iframe src="" frameborder="0"></iframe>
            </div>
            <div class="slide-unlock-container">
                <div class="header">删除确认<i class="icon-close" @click="closeSlider"></i></div>
                <div class="header-tips"><i class="icon-warning"></i> 删除后不可恢复，确定要删除吗？</div>
                <div class="slide-unlock" :class="className" :id="boxId">
                    <div class="slider_bg" id="slider_bg"></div>
                    <span class="drag-label" id="label"><i class="label-arrow"></i></span>
                    <span class="drag-tips" id="drag-tips">请拖住滑块，拖动到最右边完成验证</span>
                </div>
                <div class="dialog-footer">
                    <el-button size="8628" @click="slideSave" :class="{'green':success,'gray':!success}">确&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>
                    <el-button size="8628" class="gray" @click="slideCancel">取&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
var slider = null;
import SliderUnlock from "src/biz_components/slideunlock"
export default {
    name: "slideunlock",
    props: {
        isShow: {
            default: true
        },
        boxId: {
            type: String,
            default: "slide-unlock"
        },
        className: {
            type: String,
            default: ""
        }
    },
    data: function() {
        return {
            success: false
        }
    },
    watch: {
        'isShow': function(flag) {
            if (flag) {
                this.success = false;
                slider && slider.clear();
            }
        }
    },
    methods: {
        slideSave: function() {
            this.success && this.$emit("passSuccess", true);
        },
        slideCancel: function() {
            this.$emit("closeSuccess", true);
        },
        closeSlider: function() {
            this.$emit("closeSuccess", true);
        }
    },
    mounted: function() {
        slider = new SliderUnlock('#' + this.boxId, {}, function() {
            this.success = true;
        }.bind(this));
        slider.init();
    }
}
</script>
<style lang="less">
@import "~src/less/ixwpre.less";
.slide-unlock-container {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -110px;
    margin-left: -190px;
    height: 220px;
    width: 380px;
    background: #f9f9f9;
    border-radius: 3px;
}

.slide-unlock-container .dialog-footer {
    margin-top: 30px;
    text-align: center;
}

.slide-unlock-container .label-arrow {
    display: inline-block;
    background: url("~src/assets/images/common/arrow_gray.png");
    height: 14px;
    width: 14px;
    background-position: center;
    background-size: contain;
}

.slide-unlock-container #label.label-active {
    background: #8fc31f;
    border: 1px solid #8fc31f;
}

.slide-unlock-container .move-label.label-arrow {
    background: url("~src/assets/images/common/arrow_white.png");
    height: 14px;
    width: 14px;
    background-position: center;
    background-size: contain;
}

.slide-unlock-container .success-label.label-arrow {
    background: url("~src/assets/images/common/icon_success.png");
    height: 14px;
    width: 14px;
    background-position: center;
    background-size: contain;
}

.slide-unlock-container .header {
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
    color: #222;
    font-size: 14px;
    font-weight: bolder;
    .icon-close {
        top: 14px;
        .x-pic;
        display: inline-block;
        position: absolute;
        float: right;
        right: 20px;
        vertical-align: middle;
        width: 16px;
        height: 16px;
        margin-left: 8px;
        .x-pic-icon16-close;
        cursor: pointer;
        &:hover {
            .x-pic-icon16-close-active;
        }
    }
}

.slide-unlock-container .header-tips {
    font-size: 14px;
    text-align: center;
    margin: 22px auto 10px auto;
    .icon-warning {
        background: url("~src/assets/images/common/icon_warning.png");
        margin-right: 10px;
        height: 24px;
        width: 24px;
        background-position: center;
        background-size: contain;
        display: inline-block;
        vertical-align: middle;
    }
}

.slide-unlock {
    margin: 0px auto;
    width: 300px;
    height: 40px;
    position: relative;
    border-radius: 2px;
    background-color: #f6f6f6;
    border: 1px solid #ccc;
    overflow: hidden;
    text-align: center;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    .slider_bg {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: #E8F0d8;
        border: 1px solid #8fc31f;
        z-index: 1;
    }
    .drag-label {
        width: 42px;
        position: absolute;
        left: -1px;
        top: -1px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #cccccc;
        background: #f6f6f6;
        z-index: 3;
        cursor: move;
        color: #ff9e77;
        font-size: 16px;
        font-weight: 900;
    }
    .drag-tips {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-family: 'Microsoft Yahei', serif;


        color: #999;
        line-height: 38px;
        text-align: center;
        z-index: 2;
    }
    .drag-tips-active {
        color: #47ab00
    }
}
</style>
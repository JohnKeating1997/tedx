<!--
 * @Author: your name
 * @Date: 2021-04-08 19:41:39
 * @LastEditTime: 2021-04-11 23:15:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\views\edit\index.vue
-->

<template>
  <div id="view">
    <img :src="title" alt="请耐心等待加载" id="title">
    <!-- 底部装饰框 -->
    <div id="border"></div>
    <!-- 卡片主体 -->
    <div id="card">
      <div class="left-block">
        <div class="uploaded-img"></div>
        <div class="over-lay"></div>
        <div class="upload" @click="handleUploadImage">
          <img :src="uploadButton" alt="" class="arrow">
          <p class="info">{{this.uploadPlaceholder}}</p>
        </div>
        <div class="buttons">
          <img :src="refreshButton" alt="请耐心等待加载" class="button">
          <img :src="playButton" alt="请耐心等待加载" class="button">
          <img :src="deleteButton" alt="请耐心等待加载" class="button">
        </div>
      </div>
      <div class="right-block">
        <p v-if="!userInput" @click="handleUserInputTitle" class="title">{{this.defaultTitle}}</p>
        <input v-if="userInput" ref="inputTitle" type="text" class="title" :value="userTitle">
        <div class="form-block">
          <input type="text" :placeholder="namePlaceholder" class="form-data">
          <input type="text" :placeholder="emailPlaceholder" class="form-data">
          <input type="text" :placeholder="verifyCodePlaceholder" class="form-data short">
        </div>
        <!-- 验证码 -->
        <p id="picyzm"></p>
        <button class="submit">Submit | 提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// 验证码组件
import GVerify from '@/utils/gVerify.js'
// 图标
import title from '@/assets/images/title-edit.svg'
import uploadButton from '@/assets/images/upload.svg'
import refreshButton from '@/assets/images/Button-refresh.svg'
import playButton from '@/assets/images/Button-play.svg'
import deleteButton from '@/assets/images/Button-delete.svg'
export default {
  name: 'Edit',
  data () {
    return {
      title,
      // 按钮图标
      uploadButton,
      refreshButton,
      playButton,
      deleteButton,
      // 用户是否输入标题
      userInput: false,
      // 用户输入的标题:
      userTitle: '',
      // 验证码组件
      verifyCode: {}
    }
  },
  computed: {
    ...mapGetters(['lang']),
    // 默认标题(提示文案)
    defaultTitle () {
      return this.lang === 'CN' ? '"点击此处输入标题"' : '"Tap to input title"'
    },
    uploadPlaceholder () {
      return this.lang === 'CN' ? '上传封面' : 'Upload cover'
    },
    namePlaceholder () {
      return this.lang === 'CN' ? '您的姓名/昵称*' : 'Your name*'
    },
    emailPlaceholder () {
      return this.lang === 'CN' ? '您的邮箱*' : 'Your email*'
    },
    verifyCodePlaceholder () {
      return this.lang === 'CN' ? '输入验证码*' : 'Verification code*'
    }
  },
  mounted () {
    // 生成验证码
    let fontSize = document.querySelector('html').style.fontSize
    fontSize = parseInt(fontSize.split('p')[0])
    this.verifyCode = new GVerify({
      id: 'picyzm',
      type: 'blend',
      width: `${76 / 16 * fontSize}`,
      height: `${24 / 16 * fontSize}`
    })
  },
  methods: {
    handleUploadImage () {
      console.log('handleUploadImage')
    },
    handleUserInputTitle () {
      this.userInput = true
      setTimeout(() => {
        this.$refs.inputTitle.focus()
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
  #view{
    width:100vmax;
    height:100vmin;
    background-image: url('../../assets/images/Back-text.svg');
    margin: 0 auto;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
  }
  #title{
    position: absolute;
    left:(121/16rem);
    top:(42/16rem);
  }
  // 底部装饰框
  #border {
    width: (512.5/16rem);
    height: (257.5/16rem);
    position:absolute;
    left: (128.75/16rem);
    top: (90.75/16rem);
    border: (1/16rem) solid #3f3f3f;
  }
  // 卡片主体
  #card {
    width: (513/16rem);
    height: (258/16rem);
    position:absolute;
    left: (120.5/16rem);
    top: (83/16rem);
    background: #0b0b0b;
    border: (1/16rem) solid #7f7f7f;
    .left-block {
      width: (208/16rem);
      height: (257/16rem);
      background: #1a1a1a;
      float: left;
      .uploaded-img {
        width: (160/16rem);
        height: (161/16rem);
        font-size: 0;
        background-image: url('../../assets/videos/background-stop.jpg');
        background-size: contain;
        position: absolute;
        left: (24/16rem);
        top: (24/16rem);
        z-index: 2;
      }
      .over-lay {
        width: (160/16rem);
        height: (161/16rem);
        background: #000;
        opacity: .5;
        filter: alpha(opacity=50);
        position: absolute;
        left: (24/16rem);
        top: (24/16rem);
        z-index: 3;
      }
      .upload {
        width: (160/16rem);
        height: (161/16rem);
        position: absolute;
        left: (24/16rem);
        top: (24/16rem);
        z-index: 4;
        .arrow {
          position: absolute;
          left: (64/16rem);
          top: (65/16rem);
        }
        .info {
          width: (100/16rem);
          font-size: 14px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: (109/16rem);
        }
      }
      .buttons {
        width: (152/16rem);
        height: (32/16rem);
        position: absolute;
        bottom: (24/16rem);
        left: (28/16rem);
        display: flex;
        justify-content: space-between;
        .button {
          width:(32/16rem);
        }
      }
    }
    .right-block {
      width: (305/16rem);
      height: (257/16rem);
      float: left;
      position: relative;
      .title {
        background: none;
        border: 0;
        position: absolute;
        top: (20.5/16rem);
        left: (32/16rem);
        text-align: left;
        font-size: (14/16rem);
        color: #fff;
      }
      .form-block {
        margin-top: (54.5/16rem);
        .form-data {
            color: #fff;
            width: (240/16rem);
            height: (32/16rem);
            background: none;
            border: 0;
            border-bottom: 1px solid #363636;
            margin-bottom: 9px;
            font-size: (12/16rem);
            &.short {
              width: (148/16rem);
              margin-left: (-92/16rem);
            }
        }
      }
      #picyzm {
        width: (76/16rem);
        height: (24/16rem);
        position: absolute;
        bottom: (80/16rem);
        right: (32.5/16rem);
      }
      .submit{
        width: (240/16rem);
        height: (32/16rem);
        font-size: (12/16rem);
      }
    }
  }
</style>

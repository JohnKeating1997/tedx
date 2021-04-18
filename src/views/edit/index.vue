<!--
 * @Author: your name
 * @Date: 2021-04-08 19:41:39
 * @LastEditTime: 2021-04-16 14:42:11
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
        <div class="uploaded-img" :style="{ 'backgroundImage' : 'url(' + uploadedImgURL + ')' }"></div>
        <div class="over-lay"></div>
        <div class="upload" @click="handleUploadImage">
          <!-- 上传图片的input -->
          <input type="file" class="img-input" accept="image/*" multiple="multiple" @change="uploadImg" ref="inputImg">
          <img :src="uploadButton" alt="" class="arrow">
          <p class="info">{{this.uploadPlaceholder}}</p>
        </div>
        <div class="buttons">
          <img :src="refreshButton" alt="请耐心等待加载" class="button" @click="handleRefresh">
          <img :src="playStopButton" alt="请耐心等待加载" class="button" @click="handlePlayStop">
          <img :src="deleteButton" alt="请耐心等待加载" class="button" @click="handleDelete">
        </div>
      </div>
      <div class="right-block">
        <form action="">
          <div class="title" ref="inputTitleContainer">
            <p v-if="!userInput || !userTitle" @click="handleUserInputTitle" class="text">{{this.defaultTitle}}</p>
            <input v-if="userInput" ref="inputTitle" type="text" v-model="userTitle" required class="text input">
          </div>
          <div class="form-block">
            <div class="form-data user-name" ref="inputNameContainer">
              <input type="text" v-model="userName" :placeholder="namePlaceholder" class="" required>
            </div>
            <div class="form-data user-email" ref="inputEmailContainer">
              <input type="text" v-model="userEmail" :placeholder="emailPlaceholder" required>
            </div>
            <div class="form-data user-verifycode" ref="inputVeriycodeContainer">
              <input type="text" v-model="userVerifyCode" :placeholder="verifyCodePlaceholder" required>
            </div>
          </div>
          <!-- 验证码 -->
          <p id="picyzm"></p>
          <button class="submit" @click.prevent="handleSubmit">Submit | 提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// 验证码组件
import GVerify from '@/utils/gVerify.js'
// 验证表单
import validateForm from '@/utils/validate.js'
// 图标
import title from '@/assets/images/title-edit.svg'
import uploadButton from '@/assets/images/upload.svg'
import refreshButton from '@/assets/images/Button-refresh.svg'
import playButton from '@/assets/images/Button-play.svg'
import stopButton from '@/assets/images/Button-stop.svg'
import deleteButton from '@/assets/images/Button-delete.svg'
// 默认封面
import uploadedImgURL from '@/assets/videos/background-stop.jpg'
// wav压缩成mp3
// import {convertToMp3} from '@/utils/wav2mp3.js'
// 提交给后端
import axios from 'axios'
import url from '@/utils/api'

const errorContainer = {
  title: 'inputTitleContainer',
  nickName: 'inputNameContainer',
  email: 'inputEmailContainer',
  verificationCode: 'inputVeriycodeContainer'
}
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
      stopButton,
      // 用户上传的图片
      uploadedImgURL,
      // 用户是否输入标题
      userInput: false,
      /* 用户输入 */
      // 用户输入的标题:
      userTitle: '',
      userName: '',
      userEmail: '',
      userVerifyCode: '',
      // 提交的数据
      options: {},
      formData: {},
      // 验证码组件
      verifyCode: {},
      // 音频是否正在播放
      audioPlayStatus: false
    }
  },
  computed: {
    ...mapGetters(['lang', 'recorder']),
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
    },
    // 播放状态
    playStopButton () {
      return this.audioPlayStatus ? this.stopButton : this.playButton
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
    // 如果已经有缓存的用户信息，直接拿来用
    for (const i in this.userInfo) {
      if (this.userInfo[i]) {
        this[i] = this.userInfo[i]
      }
    }
    // 每5s缓存一次用户输入信息
    // setInterval(() => {
    //   console.log('save')
    //   this.saveTempUserInfo()
    // }, 5000)
  },
  watch: {

  },
  methods: {
    handleUploadImage () {
      console.log('handleUploadImage')
      this.$refs.inputImg.click()
    },
    handleUserInputTitle () {
      this.userInput = true
      setTimeout(() => {
        this.$refs.inputTitle.focus()
      }, 0)
    },
    // 上传图片
    uploadImg (event) {
      const e = window.event || event
      const oFile = e.target.files[0]
      // console.log(oFile);
      const imgMaxSize = 1024 * 1024 * 4 // 4MB
      // 限制文件类型
      if (['jpeg', 'png', 'gif', 'jpg'].indexOf(oFile.type.split('/')[1]) < 0) {
        alert('仅可以上传图片格式文件')
        return
      }
      // 限制大小
      if (oFile.size > imgMaxSize) {
        alert('文件最大为4MB')
        return
      }
      // 展示上传图片
      const newsrc = this.getObjectURL(oFile)
      this.uploadedImgURL = newsrc
      // document.getElementById('show').src = newsrc
      // var data = new FormData()
      // data.append('filesData', file)// 这里不管怎样，我决定还是用formdata的方式上传。
      // $.post('约定地址', data, function (result) {
      //   console.log(result)
      // })
    },
    // 获取上传成功的图片的url
    getObjectURL (file) {
      var url = null
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },

    /* 录音部分 */
    handleRefresh () {
      this.recorder.stopPlay()
      this.recorder.start().then(() => {
        this.$router.push({name: 'Index', params: {status: 'recording'}})
      })
    },
    handlePlayStop () {
      if (this.audioPlayStatus) {
        console.log('停止播放')
        this.recorder.stopPlay() // 停止播放
        return
      }
      console.log('播放录音')
      this.audioPlayStatus = true
      this.recorder.play() // 播放录音
      setTimeout(() => {
        this.audioPlayStatus = false
      }, this.recorder.duration * 1000)
    },
    handleDelete () {
      this.recorder.stopPlay()
      this.$router.push({name: 'Index'})
    },
    // 提交表单信息
    async handleSubmit () {
      console.log('submit')
      if (this.verifyCode.validate(this.userVerifyCode)) {
        // 把错误提示隐藏
        let className = this.$refs.inputVeriycodeContainer.className
        className = className.split('error')[0]
        this.$refs.inputVeriycodeContainer.className = className
        // 读取表单信息
        this.options.title = this.userTitle
        this.options.nickName = this.userName
        this.options.email = this.userEmail
        const result = validateForm(this.options)
        let flag = true
        for (const res in result) {
          if (result[res]) {
            let className = this.$refs[errorContainer[res]].className
            className = className.split('error')[0]
            this.$refs[errorContainer[res]].className = className
          } else {
            flag = false
            this.$refs[errorContainer[res]].className += this.lang === 'CN' ? ' error chinese' : ' error english'
          }
        }
        // 传输表单
        if (flag) {
          // 生成一个formData
          this.formData = new FormData()
          // 等待音频加入到formData
          const result = await this.appendAudio().catch(err => {
            alert(err)
          })
          if (!result) return
          // 加入用户输入的信息
          for (const index in this.options) {
            this.formData.append(index, this.options[index])
          }
          axios.post(url.commitUrl, this.formData).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$router.push({name: 'Success', params: {userTitle: this.userTitle, userName: this.userName}})
              return
            }
            this.$router.push({name: 'Error', params: {retry: this.handleSubmit}})
          }).catch((err) => {
            console.log(err)
            this.$router.push({name: 'Error', params: {retry: this.handleSubmit}})
          })
        }
      } else {
        // 验证码错误提示
        this.$refs.inputVeriycodeContainer.className += this.lang === 'CN' ? ' error chinese' : ' error english'
      }
    },
    appendAudio () {
      return new Promise((resolve, reject) => {
        if (this.recorder == null || this.recorder.duration === 0) {
          reject(new Error(this.lang === 'CN' ? '请先录音' : 'please record first'))
          return
        }
        this.recorder.pause() // 暂停录音
        // this.timer = null
        console.log('上传录音')// 上传录音
        const wavBlob = this.recorder.getWAV()// 获取wav格式音频数据
        // const mp3blob = convertToMp3(wavBlob, this.recorder)
        // 此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为file塞入formData
        const newblob = new Blob([wavBlob], { type: 'audio/wav' })
        const fileOfBlob = new File([newblob], `${new Date().getTime()}_${this.options.nickName}.wav`)
        this.formData.append('audio', fileOfBlob)
        resolve(true)
      })
      // 本地公共上传接口获取到服务器地址保存即可
      // const axios = require('axios')
      // axios.post(this.resource, formData).then(res => {
      //   console.log(res.data.data[0].url)
      //   // 开始调用保存的方法
      //   this.uploadRecordModal = false
      // })
    },
    // appendImg () {
    //   return new Promise((resolve,))
    // },
    // 上传数据
    pushData () {
      return new Promise((resolve, reject) => {
        // axios.post(commitUrl)
      })
    }
    // 缓存用户信息
    // saveTempUserInfo () {
    //   const tmp = {}
    //   // debugger
    //   if (this.uploadedImgURL) tmp.uploadedImgURL = this.uploadedImgURL
    //   if (this.userTitle) tmp.userTitle = this.userTitle
    //   if (this.userName) tmp.userName = this.userName
    //   if (this.userEmail) tmp.userEmail = this.userEmail
    //   this.saveFormData(tmp)
    // }
  }
}
</script>

<style lang="less" scoped>
  #view{
    width:calc(min(100vmin*2,100vmax));
    height:calc(min(100vmin, 100vmax / 2));
    background-image: url('../../assets/images/Text-background.svg');
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
        // background-image: url('../../assets/videos/background-stop.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
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
        .img-input {
          width: 100%;
          height: 100%;
          // background: #bfa;
          visibility: hidden;
        }
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
        position: absolute;
        top: (17.5/16rem);
        left: (32/16rem);
        font-size: (14/16rem);
        .text {
          background: none;
          border: 0;
          text-align: left;
          font-size: (14/16rem);
          color: #fff;
          font-weight: 700;
          &.input {
            position: absolute;
            top: 0;
            left: 0;
            text-align: left;
            font-weight: 700;
          }
        }
        &.error.chinese:after{
          content: '标题不能为空';
          font-size: (8/16rem);
          color: #e62a1f;
          text-align: left;
          position: absolute;
          left: 0;
          // bottom: (-32/16rem);
          top: (20/16rem);
          width: (100/16rem);
        }
        &.error.english:after{
          content: 'A title is requiered';
          font-size: (8/16rem);
          color: #e62a1f;
          text-align: left;
          position: absolute;
          left: 0;
          // bottom: (-32/16rem);
          top: (20/16rem);
          width: (100/16rem);
        }
      }
      .form-block {
        margin-top: (54.5/16rem);
        margin-left: (32/16rem);
        .form-data {
            color: #fff;
            width: (240/16rem);
            height: (32/16rem);
            background: none;
            border: 0;
            border-bottom: 1px solid #363636;
            margin-bottom: (13/16rem);
            display: block;
            position: relative;
            input{
              width: 100%;
              height: 100%;
              background: none;
              border: none;
              color: #fff;
              font-size: (12/16rem);
              height: (32/16rem);
              padding: 0;
            }
            &.error input{
              color: #e62a1f;
            }
            &.user-verifycode {
              width: (148/16rem);
              &.error.chinese:after{
                content: '验证码错误';
                font-size: (8/16rem);
                color: #e62a1f;
                text-align: left;
                position: absolute;
                left: 0;
                bottom: (-16/16rem);
              }
              &.error.english:after{
                content: 'Your Verification code is incorrect';
                font-size: (8/16rem);
                color: #e62a1f;
                text-align: left;
                position: absolute;
                left: 0;
                bottom: (-16/16rem);
              }
            }
            &.user-name{
              &.error.chinese:after{
                content: '姓名/昵称不能为空';
                font-size: (8/16rem);
                color: #e62a1f;
                text-align: left;
                position: absolute;
                left: 0;
                bottom: (-16/16rem);
              }
              &.error.english:after{
                content: 'Your name is requiered';
                font-size: (8/16rem);
                color: #e62a1f;
                text-align: left;
                position: absolute;
                left: 0;
                bottom: (-16/16rem);
              }
            }
            &.user-email{
              &.error.chinese:after{
                content: '邮箱格式错误';
                font-size: (8/16rem);
                color: #e62a1f;
                text-align: left;
                position: absolute;
                left: 0;
                bottom: (-16/16rem);
              }
              &.error.english:after{
                content: 'Your email address is incorrect';
                font-size: (8/16rem);
                color: #e62a1f;
                text-align: left;
                position: absolute;
                left: 0;
                bottom: (-16/16rem);
              }
            }
        }
      }
      #picyzm {
        width: (76/16rem);
        height: (24/16rem);
        position: absolute;
        // bottom: (89/16rem);
        top: (153/16rem);
        right: (32.5/16rem);
      }
      .submit{
        width: (240/16rem);
        height: (32/16rem);
        font-size: (12/16rem);
        font-weight: 700;
        position: absolute;
        left: (32/16rem);
        bottom: (24.5/16rem);
        background-color: #fff;
        border: none;
        box-shadow: none;
      }
    }
  }
</style>

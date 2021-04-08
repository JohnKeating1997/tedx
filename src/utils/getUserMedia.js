function getUserMedia () {
  navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
                          navigator.mediaDevices.webkitGetUserMedia ||
                          navigator.mediaDevices.mozGetUserMedia ||
                          navigator.mediaDevices.msGetUserMedia
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({audio: true}, function onSuccess (stream) {
      console.log('已点击允许,开启成功')
    }, function onError (error) {
      console.log('错误：', error)
    })
  } else {
    alert('您的浏览器不支持getUserMedia,请更换新版浏览器')
  }
}

export default getUserMedia

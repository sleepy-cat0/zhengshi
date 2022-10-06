$(function () {

    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#btnChoose').on('click', function () {
        file.click()
    })

    $('#file').on('change', function (e) {
        const fileList = e.target.files
        if (fileList.length === 0) return layer.msg('请选择图片！')
        const blobURL = URL.createObjectURL(fileList[0])

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', blobURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
})
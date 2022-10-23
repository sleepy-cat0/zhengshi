$(function () {

    const layer = layui.layer
    const form = layui.form
    loadCateList()

    function loadCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success(res) {
                console.log(res)
                if (res.status !== 0) return layer.msg()
                const htmlStr = template('tpl-cate', res)
                // $('tbody').html(htmlStr)
                $('tbody').empty().append(htmlStr)
            }
        })
    }

    let index = ''
    $('#btnAdd').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加分类名称',
            area: ['500px', '260px'],
            content: $('#addDialog').html()
        })
    })

    let isEdit = false
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault()

        if (isEdit) {
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success(res) {
                    if (res.status !== 0) return layer.msg('修改分类失败')
                    layer.msg('修改分类成功')
                    loadCateList()
                }
            })
        } else {
            $.ajax({
                method: 'POST',
                url: '/my/cate/add',
                data: form.val('addFormFilter'),
                // data: $(this).serialize(),
                success(res) {
                    if (res.status !== 0) return layer.msg('添加分类失败')
                    layer.msg('添加分类成功')
                    loadCateList()
                }
            })
        }
        isEdit = false
        layer.close(index)

    })
    $('tbody').on('click', '.btnEdit', function () {
        isEdit = true
        index = layer.open({
            type: 1,
            title: '添加分类名称',
            area: ['500px', '260px'],
            content: $('#addDialog').html()
        })

        const id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: `/my/article/cates/${id}`,
            success(res) {
                if (res.status !== 0) return layer.msg('获取分类详情失败')
                // layer.msg('获取分类详情成功')
                form.val('addFormFilter', res.data)
            }
        })
    })

    $('tbody').on('click', '.btnDelete', function () {
        const result = confirm('您确定要进行删除吗？')
        const id = $(this).attr('data-id')
        if (result) {
            $.ajax({
                method: 'GET',
                // url: `/my/cate/del?id=${id}`,
                url: `/my/article/deletecate/${id}`,
                success(res) {
                    if (res.status !== 0) layer.msg('删除分类详情失败')
                    layer.msg('删除分类详情成功')
                    loadCateList()
                }
            })
        }
    })
})
$(function () {

    const layer = layui.layer
    const form = layui.form
    const laypage = layui.laypage

    template.defaults.imports.formatTime = time => {
        const dt = new Date(time)
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        const d = (dt.getDate() + '').padStart(2, '0')
        const hh = (dt.getHours() + '').padStart(2, '0')
        const mm = (dt.getMinutes() + '').padStart(2, '0')
        const ss = (dt.getSeconds() + '').padStart(2, '0')
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    let qs = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    loadCateList()

    function loadCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success(res) {
                if (res.code !== 0) return layer.msg('失败')
                const html = template('tpl-cate', res)
                // $('tbody').html(htmlStr)
                $('[name=cate_id]').html(html)
                form.render()
            }
        })
    }

    loadArticleList()

    function loadArticleList() {
        $.ajax({
            method: 'GET',
            url: `/my/article/list?pagenum=${qs.pagenum}&pagesize=${qs.pagesize}&cate_id=${qs.cate_id}&state=${qs.state}`,
            success(res) {
                if (res.code !== 0) return layer.msg('获取文章列表失败')
                const str = template('tpl-list', res)
                $('tbody').empty().append(str)
                renderPager(res.total)
            }
        })
    }

    $('#choose-form').on('submit', function (e) {
        e.preventDefault()
        const cate_id = $('[name=cate_id]').val()
        qs.cate_id = cate_id

        const state = $('[name=state]').val()
        qs.state = state

        loadArticleList()
    })

    function renderPager(total) {
        laypage.render({
            elem: document.getElementById('test1'),
            count: total,
            limit: qs.pagesize,
            curr: qs.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump(obj, first) {

                qs.pagenum = obj.curr

                qs.pagesize = obj.limit

                // if(!first) {
                //     loadArticleList()
                // }
                if (typeof first === 'undefined') {
                    loadArticleList()
                }
            }
        })
    }

    $('tbody').on('click', '.btnDelete', function () {
        const result = confirm('您确定要删除吗？')
        const len = $('.btnDelete').length
        if (result) {
            const id = $(this).attr('abc')
            $.ajax({
                method: 'DELETE',
                url: `/my/article/info?id=${id}`,
                success(res) {
                    if (res.code !== 0) return layer.msg('删除文章失败')
                    layer.msg('删除文章成功')
                    loadArticleList()

                    if (len === 1) {
                        qs.pagenum = qs.pagenum === 1 ? 1 : qs.pagenum - 1
                    }
                    loadArticleList()
                }
            })
        }
    })
})
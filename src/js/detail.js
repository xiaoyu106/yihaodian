function getList1() {
    $.ajax({
        url: '../lib/list.json',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            let str1 = ''
            res.forEach(item => {
                str1 += `
              <li>
                <p><a href="./list.html">${ item.title }</a></p>
                <ol>
            `
                item.list.forEach(item2 => {
                    str1 += `<li><a href="./list.html">${ item2.name }</a></li>`
                })

                str1 += `
                </ol>
              </li>
            `
            })
            $('.list-all > ul').html(str1)
        }
    })
}
getList1()
var listIpt = document.querySelector('.all-list')
var listall = document.querySelector('.list-all')
listIpt.onmouseenter = function () {
    listall.style.display = 'block'
}
listall.onmouseleave = function () {
    listall.style.display = 'none'
}

//商品详情渲染
const info = JSON.parse(localStorage.getItem('goodsInfo'))
if (!info) {
    alert('您要查看的数据不存在')
    window.location.href = './list.html'
}


bindHtml()

function bindHtml() {
    $('.detail img').attr('src', info.verticalPic)
    $('.detail .goodsName').text(info.name)
    $('.detail .price').text('￥' + info.price)

}

$('.add-cart').click(() => {
    const cartList = JSON.parse(localStorage.getItem('cartList')) || []
    //判断localstorage里面有没有这个数据，如果没有就push，有就不用push了，直接将其数量加1
    let exits = cartList.some(item => {
        return item.id === info.id
    })
    if (exits) {
        let data = null
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].id === info.id) {
            data = cartList[i]
            break
          }
        }
        data.number++
        data.xiaoji = data.number * data.price
    } else {
        info.number = 1
        info.xiaoji = info.price 
        info.isSelect = false 
        cartList.push(info)
    }

    localStorage.setItem('cartList', JSON.stringify(cartList))

})
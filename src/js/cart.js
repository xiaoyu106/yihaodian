

const cartList = JSON.parse(localStorage.getItem('cartList'))
if (!cartList) {
    alert('您的购物车为空，快去选购吧')
} else {
    bindHtml()
    bindEvent()
}
console.log(cartList)
//采用整体渲染页面的方法
function bindHtml() {
    let selectAll = cartList.every(item => {
        return item.isSelect === true
    })
    let str = `
        <div class="top">
            <input type="checkbox" class="selectAll" ${selectAll?'checked':''}>全选
        </div>
        <ul class="center">

        `
    cartList.forEach(item => {
        str += `
            <li>
            <div class="select">
                <input data-id=${item.id} class="selectOne" type="checkbox" ${item.isSelect?'checked':''}>
            </div>
            <div class="Info">
                <img src="${item.verticalPic}" alt="">
                <p>${item.name}</p>
            </div>
            <p class="price">￥${item.price.toFixed(2)}</p>
            <div class="number">
                <button class="sub" data-id=${item.id}>-</button>
                <input type="text" value="${item.number}">
                <button class="add" data-id=${item.id}>+</button>
            </div>
            <p class="xiaoji">￥${item.xiaoji.toFixed(2)}</p>
            <div class="del" data-id=${item.id}>删除</div>
        </li>
            `
    })


    let selectArr = cartList.filter(item => item.isSelect)
    let selectNumber = 0
    let selectPrice = 0
    selectArr.forEach(item => {
        selectNumber += item.number
        selectPrice += item.xiaoji
    })
    str += `    
        </ul>
        <div class="bottom">
            <p>选中商品数量<span> ${selectNumber}</span></p>
            <p>总价：<span>￥${selectPrice.toFixed(2)}</span></p>
            <button class="pay" ${selectArr.length ? '' : 'disabled'}>去结算</button>
            <button class="clear">清空购物车</button>
        </div>
    `
    $('.cart').html(str)
}

function bindEvent() {
    $('.cart').on('change', '.selectAll', function () {
        cartList.forEach(item => {
            item.isSelect = this.checked
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })
    $('.cart').on('change', '.selectOne', function () {
        const id = $(this).data('id')
        cartList.forEach(item => {
            if (item.id === id) {
                item.isSelect = !item.isSelect
            }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })
    $('.cart').on('click', '.sub', function () {
        const id = $(this).data('id')
        cartList.forEach(item => {
            if (item.id === id) {
                item.number !== 1 ? item.number-- : ''
                item.xiaoji = item.price * item.number
            }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })
    $('.cart').on('click', '.add', function () {
        const id = $(this).data('id')
        cartList.forEach(item => {
            if (item.id === id) {
                item.number++
                item.xiaoji = item.price * item.number
            }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
    })
    $('.cart').on('click', '.del', function () {

        const id = $(this).data('id')
        cartList.forEach(item => {
            if (item.id === id) {
                cartList.splice(item, 1)
            }
        })
        bindHtml()
        localStorage.setItem('cartList', JSON.stringify(cartList))
        location.reload()
    })
   
}
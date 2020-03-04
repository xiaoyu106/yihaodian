function getList() {

    $.ajax({
        url: '../lib/city.json',
        dataType: 'json',
        success: function (list) {
            let str = ''
            list.forEach(item => {
                str += `
                <li>${item.cityname}</li>
                `
            })
            $('.city > ul').html(str)
        }
    })
}
getList()
var cityIpt = document.querySelector('.headerleft>input')
var city = document.querySelector('.city')
var err = document.querySelector('button')
cityIpt.onclick = function () {
    city.style.display = 'block'
}
err.onclick = function () {
    city.style.display = 'none'
}


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
                <p>${ item.title }</p>
                <ol>
            `
                item.list.forEach(item2 => {
                    str1 += `<li>${ item2.name }</li>`
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
var listIpt=document.querySelector('.all-list')
var listall=document.querySelector('.list-all')
listIpt.onmouseenter=function(){
    listall.style.display='block'
}
listall.onmouseout=function(){
    listall.style.display='none'
}
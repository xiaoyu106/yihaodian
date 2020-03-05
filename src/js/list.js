
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
var listIpt=document.querySelector('.all-list')
var listall=document.querySelector('.list-all')
listIpt.onmouseenter=function(){
    listall.style.display='block'
}
listall.onmouseleave=function(){
    listall.style.display='none'
}



//https://search.damai.cn/searchajax.html
//keyword=
// cty=
// ctl=展览休闲
//sctl=
// tsg=0
// st=
// et=
// order=1
// pageSize=30
// currPage=1
//tn=
let currPage=1
let flag=true

let list=[]
getList()
function getList(){
    $.ajax({
        url:'/dm',
        data:{
            keyword:'',
            cty:'',
            ctl:'展览休闲',
            sctl:'',
            tsg:0,
            st:'',
            et:'',
            order:1,
            pageSize:30,
            currPage:currPage,
            tn:''
        },
        dataType:'json',
        success:function(res){
            
            bindHtml(res.pageData.resultData)//页面渲染
            // if(flag==true){
            //     bindPagi(res.pageData.totalPage)//分页渲染
            // }
            flag && bindPagi(res.pageData.totalPage)

            list=res.pageData.resultData
        }
    })
}

function bindHtml(list){
    console.log(list)
    let str=''
    list.forEach(item=>{
        str += `
        <li data-id="${item.id}">
            <img src="${item.verticalPic}">
            <p>${item.name}</p>
            <i>${item.showtime}</i>
            <b>地址:${item.cityname}</b>
            <span>${item.price_str}元</span>
            <a>详情点击</a>
        </li>
        `
    })
    $('.goods-list>ul').html(str)
}//页面

//分页器
function bindPagi(totalPage){
    //console.log(totalPage)
    flag=false
    $('.pagi').pagination({
        pageCount:totalPage,
        coping: true,
        prevContent: '上页',
        nextContent: '下页',
        callback:function(api){
            //console.log(api.getCurrent())
            currPage=api.getCurrent()
            getList()
        }
    }); 
}//分页


$('.goods-list>ul').on('click','li',function(){
    const id=$(this).data('id')
    //console.log(id)
    let data=[]
    for(let i=0;i<list.length;i++){
        if(list[i].id===id){
            data=list[i]
            break
        }
    }
   // console.log(data)
   localStorage.setItem('goods_Info',JSON.stringify(data))
    window.location.href='./detail.html'
})
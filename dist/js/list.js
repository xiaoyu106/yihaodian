"use strict";function getList1(){$.ajax({url:"../lib/list.json",dataType:"json",success:function(t){console.log(t);var a="";t.forEach(function(t){a+='\n              <li>\n                <p><a href="./list.html">'.concat(t.title,"</a></p>\n                <ol>\n            "),t.list.forEach(function(t){a+='<li><a href="./list.html">'.concat(t.name,"</a></li>")}),a+="\n                </ol>\n              </li>\n            "}),$(".list-all > ul").html(a)}})}getList1();var listIpt=document.querySelector(".all-list"),listall=document.querySelector(".list-all");listIpt.onmouseenter=function(){listall.style.display="block"},listall.onmouseleave=function(){listall.style.display="none"};var currPage=1,flag=!0,list=[];function getList(){$.ajax({url:"/dm",data:{keyword:"",cty:"",ctl:"展览休闲",sctl:"",tsg:0,st:"",et:"",order:1,pageSize:30,currPage:currPage,tn:""},dataType:"json",success:function(t){bindHtml(t.pageData.resultData),flag&&bindPagi(t.pageData.totalPage),list=t.pageData.resultData}})}function bindHtml(t){console.log(t);var a="";t.forEach(function(t){a+='\n        <li data-id="'.concat(t.id,'">\n            <img src="').concat(t.verticalPic,'">\n            <p>').concat(t.name,"</p>\n            <i>").concat(t.showtime,"</i>\n            <b>地址:").concat(t.cityname,"</b>\n            <span>").concat(t.price_str,"元</span>\n            <a>详情点击</a>\n        </li>\n        ")}),$(".goods-list>ul").html(a)}function bindPagi(t){flag=!1,$(".pagi").pagination({pageCount:t,coping:!0,prevContent:"上页",nextContent:"下页",callback:function(t){currPage=t.getCurrent(),getList()}})}getList(),$(".goods-list>ul").on("click","li",function(){for(var t=$(this).data("id"),a=[],n=0;n<list.length;n++)if(list[n].id===t){a=list[n];break}localStorage.setItem("goods_Info",JSON.stringify(a)),window.location.href="./detail.html"});
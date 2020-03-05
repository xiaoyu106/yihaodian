//1、获取元素
let nameIpt = document.querySelector('.username')
let passIpt = document.querySelector('.password')
let btn = document.querySelector('#button')
let errorInfo = document.querySelector('.err')
//2、绑定事件
btn.onclick = function (e) {
	var e = e || window.event
	e.preventDefault()
	//3、获取用户输入内容
	var uname = nameIpt.value
	var upass = passIpt.value
	//4、表单验证
	if (!uname || !upass) {
		alert('请完整填写表单')
		return
	}
	//发送请求
	$.ajax({
		url: '/login',
		data: {
			username: '1',
			password: '1'

		},
		dataType: 'json',
		success: function (res) {
			console.log(res)
			window.location.href = './cart.html'
		},
		error: function () {
			errorInfo.style.display = 'block'
		}
	})
}
//首页loation。her
//列表点击事件   li的 id    网址 #`${id}` 
//详情   locatiao.hash（）【1】   foreach  v.id= id   v.name    v.img 
//   html=``
//  Arr.foreach(function(v){
         
// 	if(v.id=id){
// 		html=`<li>
// 		<img>${v.img}</img>
// 		</li>`
// 	}
//  })
    // $("li").click(function(){
	// 	 let id=$(this).id
	// 	location.href("localhost.8080/html"+`#${id}`)
	// })

//详情-》购物车  没登录=》登录
//购物车      getcookie（）获取没有值 你就跳转到登录页面
//登陆页面   点击登录     setcookie       
//1、获取元素
let nameIpt = document.querySelector('.username')
let passIpt = document.querySelector('.password')
let btn = document.querySelector('#button')
//let form=document.querySelector('form')
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
		url: 'http://jx.xuzhixiang.top/ap/api/login.php',
		data: {
			username: 'admin',
			password: '123456'

		},
		dataType: 'json',
		success: function (res) {
			console.log(res)
			window.location.href = './index.html'
		},
		error: function () {
			errorInfo.style.display = 'block'
		}
	})
}
class Login {
	constructor(btn) {
	    this.btn = document.querySelector("#login");
		this.container = document.querySelector("#container");
		this.delete = document.querySelector("#submit-content");
		this.optionButton = document.querySelector(".option-button");
		this.deleteButton = document.querySelector("#delete-button");
		this.bindEvents();
	}
	bindEvents () {
		document.oncontextmenu = function(){
		　　return false;
		}
		//let _this = this;
		this.btn.onclick = () => {
			// 给container插入内容
			this.container.innerHTML = '<h4>发布内容</h4>'+
			'<a id="closeBtn" class="close_btn" href="javascript:;">×</a>'+
            '<p><label>用户名：<input id="username" type="text"></label></p>'+
			'<p>内容：<textarea row="50" cols="50" id = "text"></textarea></p>'+
			'<p><button id="loginBtn" class="logonBtn" type="button">发布</button></p>';
			// 让container显示并且居中
			tools.showCenter(this.container);
			// 创建模态层
			this.modal = document.createElement("div");
			this.modal.className = "modal";
			document.body.appendChild(this.modal);	
		 }
		// 给删除按钮绑事件（委托给container）
		this.container.onclick =  e => {
			e = e || window.event;
			var target = e.target || e.srcElement;
			// 获取事件源
			// 利用case穿透
			switch(target.id) {
				case "loginBtn":
					let username = document.querySelector("#username").value;
					let text = document.querySelector("#text").value;
                    let NowTime = this.getTime(new Date());
                    let sub = document.querySelector("#submit-content");
                    let html = '用户名：'+username+'<br>内容：'+text+'<br>'+NowTime;
                    sub.innerHTML += html;
				case "closeBtn" :
					this.container.style.display = "none";
					document.body.removeChild(this.modal);
                break;
			}	  
		} 
        /* var sub = document.createElement("#submit-content")
        var ul = document.querySelector("ul");
        sub.oncontextmenu = function (e) {
        	e = e || event;
        	if(e.preventDefault){
        		// IE
        		e.preventDefault();
        	}else{
        		// 非IE
        		window.event.returnValue = false;
        	}
        	// 阻止默认的右键菜单的弹出
        	// return false;
        }
             sub.onmousedown = function(e){
                  e = e || event;
                  if(e.buttons === 2){ 
                      ul.style.display = "block"; 
                  }else{
                      ul.style.display = "none";
                  }
             }
             var del = ul.querySelector(".del");
             console.log(del);
             del.onclick = function(){
                 if(confirm("确认要删除吗？")){
                     document.body.removeChild(sub);
             }
             ul.style.display = "none";
            }      */
            
		//删除信息弹窗展示
		this.delete.onmouseup =  e => {
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(e.button == 2){
				this.optionButton.style.display = "block";
			}  
		}
		//删除信息   
		this.deleteButton.onclick =  e => {
			e = e || window.event;
			this.delete.innerHTML = '';
			this.optionButton.style.display = "none";
		}  
	}
    getTime (date){
            let year = date.getFullYear(),
                month = date.getMonth() + 1,
            	day = date.getDate(),
            	hours = date.getHours(),
            	min = date.getMinutes();
            	return year + "年" + month + "月" + day + "号" + hours + "时"+ min + "分"; 
            	}
    /* let container = document.querySelector("#submit-content");
    container.oncontextmenu = e => {
        e = e || event;
        if(e.preventDefault){
        	// IE
        	e.preventDefault();
        }else{
        	// 非IE
        	window.event.returnValue = false;
        }
    }
    container.onmousedown = e =>{
        e = e || event;
        if(e.buttons === 2){ 
            ul.style.display = "block"; 
        }else{
            ul.style.display = "none";
        }
    } */
}

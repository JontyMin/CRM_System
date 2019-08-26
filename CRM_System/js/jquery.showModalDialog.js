
//调用示例：
// $.showModalDialog(url);
// $.showModalDialog(url, {name:'zs'});
// $.showModalDialog(url, {name:'zs'}, 800);
// $.showModalDialog(url, {name:'zs'}, 800, 600);
// $.showModalDialog(url, {name:'zs'}, 800, 600, function(){});

// $.showModalDialog(url, 800, 600, function(){});
// $.showModalDialog(url, 800, function(){});
// $.showModalDialog(url, function(){});

// $.showModalDialog(url, {name:'zs'}, 800, function(){});
// $.showModalDialog(url, {name:'zs'}, function(){});

// $.showModalDialog(url, 800);
// $.showModalDialog(url, 800, 600);



//扩展方法：$.showModalDialog(); 支援
$(window).click(function(){
	if(window["CURRENT_DIALOG"] && !window["CURRENT_DIALOG"].closed){
		window["CURRENT_DIALOG"].focus();
	}else if(window["CURRENT_DIALOG"]!=null && window["CURRENT_DIALOG"].closed){
		window["CURRENT_DIALOG"] = null;
		$(".jQuery_ShowModalDialog_Shade").remove();
	}
});


//扩展方法：$.showModalDialog();
$.extend({
	// $.showModalDialog("show.aspx");
	// $.showModalDialog("show.aspx", {name:'zs'});
	// $.showModalDialog("show.aspx", {name:'zs'}, 800);
	// $.showModalDialog("show.aspx", {name:'zs'}, 800, 600);
	// $.showModalDialog("show.aspx", {name:'zs'}, 800, 600, function(){});

	// $.showModalDialog("show.aspx", 800, 600, function(){});
	// $.showModalDialog("show.aspx", 800, function(){});
	// $.showModalDialog("show.aspx", function(){});

	// $.showModalDialog("show.aspx", {name:'zs'}, 800, function(){});
	// $.showModalDialog("show.aspx", {name:'zs'}, function(){});

	// $.showModalDialog("show.aspx", 800); 
	// $.showModalDialog("show.aspx", 800, 600);
	showModalDialog:function(url, data, width, height, callback){
		//参数调整
		url = url || "javascript:document.write('未指定URL');";
		if(!callback && typeof(data)=='function'){
			callback=data;data=null;}
		if(!callback && typeof(width)=='function'){
			callback=width;width=null;}
		if(!callback && typeof(height)=='function'){
			callback=height;height=null;}
		if(!height && typeof(data)=='number'&&typeof(width)=='number'){
			height=width;width=data;data=null;}
		if(!width && typeof(data)=='number'){
			width=data;data=null;}
		width = width || 800;
		height = height || 600;
		callback = callback || function(){};

		//计算要显示在哪里
		var left = (window.screen.width-width)/2;
		var top = (window.screen.height-height)/2;

		//显示
		if(window.showModalDialog){ 
			//1) 支持模态对话框
			var result = window.showModalDialog(url, data, "dialogWidth:"+width+"px;dialogHeight:"+height+"px;dialogLeft:"+left+"px;dialogTop:"+top+"px;");
			//回调
			callback(result);
		}else{  
			//2) 不支持模态对话框
			var win = window["CURRENT_DIALOG"] =
				window.open(url, "_blank", "width="+width+",height="+height+",left="+left+",top="+top);

			//传参(这样写不知道来不来得急)
			win.dialogArguments = data;

			//产生遮罩
			var shade = $('<div class="jQuery_ShowModalDialog_Shade" style="height:'+$(document.body).height()+'px;">&nbsp;</div>').appendTo(document.body);

			//窗体关闭时去掉遮罩
			window["CURRENT_DIALOG_INTERVAL"] = setInterval(function(){
				if(win.closed){
					//清除迭代
					clearInterval(window["CURRENT_DIALOG_INTERVAL"]);		//得到返回值
					var result = win.returnValue;
					//释放当前对话框
					window["CURRENT_DIALOG"] = null;
					//去掉遮罩
					$(".jQuery_ShowModalDialog_Shade").remove();
					//回调
					callback(result);
				}
			}, 500);
			
		}
	}
});
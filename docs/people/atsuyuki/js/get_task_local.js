$(function(){$.ajax({
    type: "GET",
    url: 'https://crowd4u.org/js/test.js',
    dataType: "script",
    xhrFields:{withCredentials: true},
    crossDomain: true,
    cache: false,
    timeout: 1000,
    error:function(){
	//alert("crowd4u_down");
	
        /*　タスクを取得できなかった場合はバナーを表示 */
        /*var image_ele = $("<img></img>", {
            src: "http://crowd4u.parallel.jp/img/crowd4u_banner_jp.png",
            alt: "停電時用のバナー",
            height: "auto",
            width: "300px"
        });
		$("#task").append(image_ele);
        alert("jsonファイル読込失敗");*/
	var message =  $("<p></p>");
	message.html("Crowd4U is under maintenance");
	$("#task").append(message);
     },
    success:function(data){
        //jqueryもリモートからとってくるようにしたい
        /*jquery_file = "http://crowd4u.org/js/jquery.js"
        $("<script>")
            .attr("src", jquery_file)
            .appendTo("head");
	*/
        script_name = "https://crowd4u.org/js/get_task_remote.js"
        $("<script>")
            .attr("src", script_name)
            .attr("charset", "UTF-8")
            .appendTo("head");

         var css = $('<link rel="stylesheet" href="https://crowd4u.org/css/embedded_task.css">');
         css.appendTo("head");
         //$('head link:last').after(css);
    }
})
});


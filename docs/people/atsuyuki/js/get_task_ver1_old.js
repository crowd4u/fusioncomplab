$(function(){$.ajax({
    type: "GET",
    url: 'http://crowd4u.org/task_assignment?embed=1&requester=175&group_id=53',//53',
    dataType: "json",
    xhrFields:{withCredentials: true},
    crossDomain: true,
    cache: false,
    error:function(){
	//var message = $('<h2>現在メンテナンス中です</h2>');
	//$("#task").append(message);
        var image_ele = $("<img></img>", {
            src: "http://crowd4u.parallel.jp/img/crowd4u_banner_jp.png",
            alt: "停電時用のバナー",
            height: "auto",
            width: "300px"
        });
	$("#task").append(image_ele);
        //alert("jsonファイル読込失敗");
     },
    success:function(json_data){
        //妥当なXMLとして扱うためにタグを追加
        xml_data = "<task>" + json_data.task_view + "</task>";
        console.log(xml_data);

        //convert string into XML object.
        var doc = $.parseXML(xml_data);
        console.log("doc = " + doc);

        /*  get needed information from XML  */
        var post_url = $(doc).find("post_url").text();
        var question =  $(doc).find("question").text();
        var image_url = $(doc).find("image_url").text();
        var answers = $(doc).find("answer");

        console.log("post_url ="+post_url + ",question = "+question+",image_url =" +image_url);
        console.log("answers = " + answers);

        //question
        var question_ele = $('<h2>');
        question_ele.html(question);
        $("#task").append(question_ele)

        //image
        var image_ele = $("<img></img>", {
            src: image_url,
            alt: "タスクで使う画像",
            height: "auto",
            width: "300px"
        });

        $("#task").append(image_ele);

        //選択肢の数だけ繰り返す
        answers.each(function(){
            var form = $('<form/>', {action: post_url, method: 'post', class: 'crowd4u'});
            console.log("form="+form);
            //inputタグを作成
            $(this).find("parameter").each(function(){
                var input = $('<input/>');
                var input_name = $(this).find("name").text();
                var input_value = $(this).find("value").text();
                input.attr("name", input_name); 
                input.attr("value", input_value);
                input.attr("type", "hidden");
                form.append(input);
            });
            var option_text = $(this).find("text").text();
            var input_submit = $('<input/>');
            input_submit.attr("type", "submit");
            input_submit.attr("value", option_text)
            form.append(input_submit);

            /*  タスクを実行した際の遷移先を決定．デフォルトでは，元のページに戻るように指定 */
            var input_move = $('<input/>');
            input_move.attr('name', '_move');
            input_move.attr('type', 'hidden');
            //現在のURLを取得
            var current_url = location.href;
            console.log("current_url = " + current_url);
            input_move.attr('value', current_url)
            form.append(input_move);
            //formタグを追加
            $("#task").append(form);
        });




    }
})
});


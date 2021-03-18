$(function(){
	// スマホnav
		$(".menu_trigger").click(function () {
			$(this).toggleClass("active");
			$("#nav").toggleClass("nav_open");
		});
	// マウスオーバー
		var postfix = '_ov';
		$('.img_ov a img').not('[src*="'+ postfix +'."]').each(function() {
			var img = $(this);
			var src = img.attr('src');
			var src_on = src.substr(0, src.lastIndexOf('.'))
			+ postfix
			+ src.substring(src.lastIndexOf('.'));
			$('<img>').attr('src', src_on);
			img.hover(function() {
			img.attr('src', src_on);
			}, function() {
			img.attr('src', src);
			});
		});
	// 外部ページブランク
		$("a[href^='http://'] , a[href^='https://']").not("a[href*='" + location.hostname + "']").attr("target","_blank");
		$("a[href$='.pdf']").attr("target","_blank");
	// #page-top
		var topBtn = $('#page-top');   
		topBtn.hide();
		//スクロールが100に達したらボタン表示
		$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
		topBtn.fadeIn();
		} else {
		topBtn.fadeOut();
		}
		});
	// 追従nav
		var fixNav = $('#fix_nav_bg'); 
		var wH = $(window).height(); 
		fixNav.hide();
		//スクロールが100に達したらボタン表示
		$(window).scroll(function () {
		if ($(this).scrollTop() > wH) {
			fixNav.fadeIn().css({'top':'0px'});
		} else {
			fixNav.fadeOut().css({'top':'-60px'});
		}
		});
	// #link
		// #で始まるアンカーをクリックした場合に処理
		$('a[href^=#]').click(function() {
		// スクロールの速度
		var speed = 400; // ミリ秒
		// アンカーの値取得
		var href= $(this).attr("href");
		// 移動先を取得
		var target = $(href == "#" || href == "" ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top;
		// スムーススクロール
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
		});
});


$(window).on('resize load',function(){
	
    //PC環境の場合
    if (window.matchMedia( '(min-width: 769px)' ).matches) {
	// ドロップダウンメニュー
		$("#nav li,.nav li ul li").hover(function () {
		$(this).children("ul").show( 0, "easeOutQuint");
		},function() {
		$(this).children("ul").hide( 0, "easeOutQuint");
		});

    //モバイル環境の場合
    } else {
		
    };

});


$(function(){
function resize(){
getHeight = $('body').height();//変数を関数外でも使うのでvarは付けません。
windowHeight = window.innerHeight;
scrollHeight = getHeight-windowHeight;//最大スクロール値の計算
}
resize();//読み込み時の処理
window.onresize=resize;//リサイズのイベントハンドラ
	$(window).scroll(function () {
ScrollTop = $(document).scrollTop();
bgPosition = 80/scrollHeight*ScrollTop+10;
		$('#body_bg').css(
			{backgroundPositionY: bgPosition+"%"}
			);
	 });

});
function Welcome() {
	context.fillStyle = "rgba(0,30,0,0.3)";
	context.fillRect(0,90,600,450);
	var text = ["这是一个有关兔子吃萝卜的故事...",
		"通过编写程序来控制兔子吃到萝卜赢得游戏，程序可以使用的命令",
		"如下：",
		"move    right    left",
		"每条命令各占一行，可使用诸如“move(3)”的形式来多次执行一个动",
		"作，编写好你的程序后，点击“Run”按钮执行，看看你能不能让兔子",
		"吃到萝卜~",
		"Click to play"
	];
	context.font = "36px 微软雅黑";
	context.fillStyle = "rgba(255,255,255,1)";
	context.fillText(text[0], 30, 200);
	context.font = "18px 微软雅黑";
	context.fillText(text[1], 60, 260);
	context.fillText(text[2], 20, 290);
	context.fillText(text[4], 20, 370);
	context.fillText(text[5], 20, 400);
	context.fillText(text[6], 20, 430);
	context.font = "bold 18px 微软雅黑";
	context.fillText(text[3], 200, 320);
	context.fillText(text[7], 450, 500);

	isClick = true;
}

function showTip(i,j) {
	context.fillStyle = "rgba(0,30,0,0.3)";
	context.fillRect(0,150,600,300);
	var text = ["兔子掉水里了！",
		"兔子木有吃到萝卜o>_<o~!",
		"兔子吃到了萝卜*^_^*~！",
		"点击重新开始此关",
		"点击进入下一关",
		"木有更多关卡了",
		"重头开始玩吧~"
	];
	context.font = "36px 微软雅黑";
	context.fillStyle = "white";
	context.fillText(text[i], 120, 280);
	context.font = "24px 微软雅黑";
	context.fillText(text[j], 200, 360);

	if(3 == j)
		level--;

	document.getElementById("program").value = '';
	isClick = true;
}

function showBegin() {
	context.fillStyle = "rgba(0,30,0,0.3)";
	context.fillRect(0,150,600,300);
	var text = "Level "+level+"   "+LEVELS[level].name;
	context.font = "36px 微软雅黑";
	context.fillStyle = "white";
	context.fillText(text, 120, 280);
	ext = 0;
	bi = 0;
	setTimeout(function() {
		context.clearRect(0,0,600,600);
		Level();
	}, 1500);
}

function birthday() {
	var text = ["祝亲爱滴兔子",
		"生日快乐*^_^*~！",
		"嘿嘿，不好意思啦",
		"拖了好久才写完这个小游戏",
		"有些关卡难度不小~你好好玩吧~",
		"光光",
		"",
		"好了好了，点一下重新回到游戏里去吧~",
	];
	context.clearRect(0,0,600,600);
	context.font = "28px 微软雅黑";
	context.fillStyle = "white";
	var t = 0;
	var bir = setInterval(function() {
		context.fillText(text[t], 80, 140+t*40);
		t++;
		if(t >= text.length)
			clearInterval(bir);
	}, 1500);

	level--;
	document.getElementById("program").value = '';
	isClick = true;
}
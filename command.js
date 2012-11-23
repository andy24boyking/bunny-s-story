var bi = 0;

//关键词
var CODES = ['left', 'right', 'move', 'guangguang', 'birthday'];
  
//解析命令为"cmd(count)"
var COMMAND_MATCH = /^\s*([a-z]+)(?:\(([0-9]+)\))?\s*$/ ;

var commands = [];

//解析输入命令，得到命令序列并执行
function Command() {
	readCmd();
	runCmd();
}

//解析输入命令
function readCmd() {
	var text = document.getElementById("program").value;

	var lineText = text.split(/\r?\n/); //将读取到得文本分成每一行
	for(var i in lineText) {
		var match = COMMAND_MATCH.exec(lineText[i]);

		if(match) {
			var count = match[2]; //执行次数

			if(isCmd(match[1])) { //match[1]:命令
				if(!count || count < 1)
					count = 1;
				for(var j = 0; j < count; j++) {
					commands.push(match[1]);
				}
			}else
				console.log("invalid command1!");
		}else {
			if (/^\s*$/.exec(lineText)) {
				console.log("blank line!"); //空行
			}else {
				console.log("invalid command2!");
			}
		}
	}
}

//判断是否为合法词汇
function isCmd(code) {
	for(var i = 0; i < CODES.length; i++) {
		if(code === CODES[i])
			return true;
	}
	return false;
}

//执行命令序列
function runCmd() {
	var i = 0;

	var steep = function(){
		switch(commands[i]) {
			case 'move':
				document.getElementById('walk').play();
				Move();
				setTimeout(function() {
					document.getElementById('walk').pause();
				}, 3200);
				break;
			case 'right': case 'left':
				Turn(commands[i]);
				break;
			/*case 'guangguang':
				break;*/
			case 'birthday':
				birthday();
				bi++;
				break;
			default:
				console.log("Amazing error!");
		}

		i++;
		if(i >= commands.length) {
			clearInterval(stepByStep);
			//执行完后清空命令序列
			commands.length = 0;
			//关卡处理
			setTimeout(function() {
				if('$' == LEVELS[level].map[xx][yy]) {
					showTip(2,4);
					document.getElementById('laugh').play();
					console.log('carrot!');
				}else if(0 == ext && 0 == bi) {
					showTip(1,3);
					document.getElementById('cry').play();
				}
			}, 3500);
		}
	}
	var stepByStep = setInterval(steep, 3500);
}
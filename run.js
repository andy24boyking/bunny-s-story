var xx = 0, yy = 0; //记录兔子当前所在单元格坐标
var ext = 0;

var isMoving = false;
var speed = 5;
var sx = [0,32,64],sy = [0,32,64,96];
var sWidth = 32,sHeight = 32;


var bx = 0,by = 0; //bx,by用于设置图片的显示坐标
var atom = 60;
var state = 1; //变量state用于设置当前物体移动时的图片
var turn = 0; //当前方向，Front：0，left：1，Back：2，Right：3
var s = {
	Front:[[0,0],[1,0],[2,0]],
	Left:[[0,1],[1,1],[2,1]],
	Right:[[0,2],[1,2],[2,2]],
	Back:[[0,3],[1,3],[2,3]]
};
var c = s.Front; //变量c用于设置当前物体方向,默认设置为前方

var draw=function() {
	context.clearRect(0,0,600,600);	
	setObject();
	//兔子
	drawBunny();
};

//移动
function Move() {
	isMoving = true;
	
	switch(turn) {
		case 0:
			xx++;
			if(ableToWalk()){
				moveOneStep(by, atom, speed);
				break;
			}else {
				xx--;
				return;
			}
		case 1:
			yy--;
			if(ableToWalk()){
				moveOneStep(bx, -atom, -speed);
				break;
			}else {
				yy++;
				return;
			}
		case 2:
			xx--;
			if(ableToWalk()){
				moveOneStep(by, -atom, -speed);
				break;
			}else {
				xx++;
				return;
			}
		case 3:
			yy++;
			if(ableToWalk()){
				moveOneStep(bx, atom, speed);
				break;
			}else {
				yy--;
				return;
			}
	}
	
	console.log('bx:'+bx+' by:'+by);
	console.log('xx:'+xx+' yy:'+yy);
}

function ableToWalk() {
	//判断是否会走到边界
	if(xx > 9 | xx < 0 | yy > 9 | yy < 0) {
		console.log('will out of the map');
		isMoving = false;
		return false;
	}else if('O' == LEVELS[level].map[xx][yy]) {
		//判断是否会走到石头
		console.log('there is rock');
		isMoving = false;
		return false;
	}
	return true;
}

function moveOneStep(temp, ato, s) {
	timeDraw = setInterval(draw,1000/25);
	stepDraw = setInterval(function(){
		if(isMoving){
			state += 2;
			if(state > 2)
				state = 0;
		}
		switch(turn) {
			case 0: case 2:
				if(by != temp + ato)
					by += s;
				else
					stopMoving();
				break;
			case 1: case 3:
				if(bx != temp + ato)
					bx += s;
				else
					stopMoving();
				break;
		}
	}, 250);
}

function stopMoving() {	
	state = 1;
	isMoving = false;
	clearInterval(timeDraw);
	clearInterval(stepDraw);
	//判断是否移动进水
	if('~' == LEVELS[level].map[xx][yy]) {
		console.log('drop in water!');
		commands.length = 0;
		ext = 1;
		document.getElementById('drop').play();
		showTip(0,3);
	}else
		draw();
}
//转向
function Turn(text) {

	switch(text) {
		case 'left':
			turn--
			changeTurn();
			break;
		case 'right':
			turn++;
			changeTurn();
			break;
		default:
			console.log("Unbelievable error!");
	}
}

//转向映射
function changeTurn() {
	turn += 4;
	turn = turn % 4;
	console.log('turn:'+turn);
	switch(turn) {
		case 0:
			c = s.Front;
			draw();
			break;
		case 1:
			c = s.Left;
			draw();
			break;
		case 2:
			c = s.Back;
			draw();
			break;
		case 3:
			c = s.Right;
			draw();
			break;
	}
}

			var canvas;
			var ctx;
			var ballPosX = 150;        // this is the starting position
			var ballPosY= 50;
			var mx = 1;
			var my = 1;
			var screenWidth = 750;
			var screenHeight = 350;
			var goalieWidth = 100;
			var goalieHeight = 100;
			var ballWidth = 50;
			var ballHeight = 50;
			var goaliePosX = 550;
			var goaliePosY = 125;
			var ballSpeed = 2;
            var time = 30;

			var goalie = new Image();
			goalie.src = "images/myGoalie.png";
			var ball = new Image();
			ball.src = "images/ball50.png";



var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

function timer()
    {
    time--;
    if (time <= 0)
        {
        clearInterval(counter);
        return;
        }
    document.getElementById("countdown").innerHTML = time; 
    }

function drawBorder()
	{
	ctx.rect(0,0,screenWidth, screenHeight);
	ctx.stroke();
	}   

function drawGoalie(goaliePosX, goaliePosY)
	{
	ctx.drawImage(goalie, goaliePosX, goaliePosY);
	}

function drawBall(ballPosX, ballPosY)   //this draws the ball
	{
	ctx.drawImage(ball, ballPosX, ballPosY);
	}

function clear()        //this clears the canvas
	{
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	}

function announceGoal()
	{
	ctx.font = "60px Ariel";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("Game Over!", canvas.width/2, canvas.height/2);
	}

function init()         //this calls the draw() function every 3ms
	{
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	var drawer = setInterval(draw, 4);
	return drawer;
	}

function draw()         //this animates the ball
	{
	clear();
	drawBorder();
	drawGoalie(goaliePosX, goaliePosY);
	drawBall(ballPosX, ballPosY);
	if(ballPosX > 675 && ballPosX < 678)
		{
		announceGoal();
		clearInterval(drawer);
		}

//outerwalls
	if (ballPosX + mx > screenWidth - ballWidth || ballPosX + mx < 0)
		mx = -mx;
	if (ballPosY + my > screenHeight - ballHeight || ballPosY + my < 0)
		my = -my;

//obstacle
	if (
		(ballPosX + mx >= goaliePosX - ballWidth &&
		 ballPosX + mx <= goaliePosX + goalieWidth) &&
		(ballPosY + my == goaliePosY - ballHeight || 
		ballPosY + my == goaliePosY + goalieHeight))
			{
			my = -my;
			}
	if (   
		(ballPosY + my >= goaliePosY - ballHeight &&  
		ballPosY + my <= goaliePosY + goalieHeight) && 
		(ballPosX + mx == goaliePosX - ballWidth ||
		 ballPosX + mx == goaliePosX + goalieWidth))
			{
			mx = -mx;    
			}

	ballPosX += mx;
	ballPosY += my;
	}

function doKeyDown(event)
	{
	switch (event.keyCode) 
		{
		case 38:  /* Up arrow was pressed */
			goaliePosY -= ballSpeed;
			if (goaliePosY - my < 0)
				{
				goaliePosY = 0;
				}
			break;
		case 40:  /* Down arrow was pressed */
			goaliePosY += ballSpeed;
			if (goaliePosY + my >= screenHeight - goalieHeight)
				{
				goaliePosY = screenHeight - goalieHeight;
				}
			break;
		case 37:  /* Left arrow was pressed */
			goaliePosX -= ballSpeed;
			if (goaliePosX - mx <= 0)
				{
				goaliePosX = 0;
				}
			break;
		case 39:  /* Right arrow was pressed */
			goaliePosX += ballSpeed;
			if (goaliePosX + mx >= screenWidth - goalieWidth)
				{
				goaliePosX = screenWidth - goalieWidth;
				}
			break;
		}
	}

init();                 //this starts the whole thing going
window.addEventListener("keydown", doKeyDown, true);


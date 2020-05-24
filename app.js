document.addEventListener('DOMContentLoaded',()=>{
	const grid = document.querySelector('.grid');
	let squares = Array.from(document.querySelectorAll('.grid div')); 
	const scoreD = document.querySelector('#score'); 
	const startB = document.querySelector('#start');
   let music = document.getElementById("music");
	const width = 10;
	let nextRandom = 0;
   let score = 0; 
	let timerID;
   const colors = [
      'silver',
      '#37ACCC',
      '#776739',
      'black',
      'white',
      '#FF0000',
      'orange'
      ];
	//piezas
   music.play();
	const l1Tetri = [
		[1, width+1, width*2+1,2],
		[width, width+1, width+2, width*2+2],
		[1, width+1,width*2+1,width*2],
		[width, width*2, width*2+1, width*2+2]
	];
	const l2Tetri= [
		[1,2,width+2,width*2+2],
		[width, width+1, width+2, width*2],
		[1, width+1,width*2+1,width*2+2],
		[width*2, width*2+1, width*2+2, width+2]
	];
	
	const z1Tetri = [
		[width*2 , width+1, width*2+1,width+2],
		[0, width, width+1,width*2+1],
		[width*2 , width+1, width*2+1,width+2],
		[0, width, width+1,width*2+1]
	];
	
	const z2Tetri = [
		[width , width+1, width*2+1,width*2+2],
		[2, width+1, width+2,width*2+1],
		[width , width+1, width*2+1,width*2+2],
		[2, width+1, width+2,width*2+1],
	];
	
	const tTetri = [
		[width, 1, width+1, width+2],
		[1, width+1, width+2, width*2+1],
		[width, width+1, width+2,width*2+1],
		[1,width,width+1,width*2+1]
	];
	
	const cTetri = [
		[0,1,width,width+1],
		[0,1,width,width+1],
		[0,1,width,width+1],
		[0,1,width,width+1],
		[0,1,width,width+1]
	];
	
	const pTetri = [
		[1,width+1,width*2+1,width*3+1],
		[width, width+1, width+2, width+3],
		[1,width+1,width*2+1,width*3+1],
		[width, width+1, width+2, width+3]
	]; 
	
	const allTetri = [l1Tetri, l2Tetri, z1Tetri, z2Tetri, tTetri, cTetri, pTetri];
	
	let random = Math.floor(Math.random()*allTetri.length);
	
	let currentPosition = 4;
	let currentRotation = 0;
	
	let current = allTetri[random][currentRotation];	
	function control(e) {
		if(e.keyCode === 37){
			moveLeft();
		} else if(e.keyCode === 39){
			moveRight();
		 } else if(e.keyCode === 38){
			rotate();
		  }else if(e.keyCode === 40){
			moveDown();
		   }else if(e.keyCode === 32){
			  		if (timerID){
						clearInterval(timerID);
						timerID = null;
					} else{
						draw();
						timerID = setInterval(moveDown, 500);
						nextRandom = Math.floor(Math.random()*allTetri.length);
						displayShape();		
					};
					};
	
	};
	document.addEventListener('keyup', control);
	
	//draw();
	function draw(){
		current.forEach(index => {
			squares[currentPosition + index].classList.add('tetris');
         squares[currentPosition + index].style.backgroundColor = colors[random];
		});
	};
		
		
	function undraw(){
		current.forEach(index => {
			squares[currentPosition+index].classList.remove('tetris');
         squares[currentPosition + index].style.backgroundColor = '';
		});
	};

	function freeze() {
		if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
				
				current.forEach(index => squares[currentPosition + index].classList.add('taken'));
				random = nextRandom;
				nextRandom = Math.floor(Math.random()*allTetri.length);
				current = allTetri[random][currentRotation];
				currentPosition = 4;
				draw();  
				displayShape();
            addScore();
            endGame();
		};
		
	};		
	
	function moveDown () 
	{
	undraw();
	currentPosition+=width;
	draw();
	freeze();
   
	};	
	function moveLeft () {
		undraw();
		const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
		
		if (!isAtLeftEdge) currentPosition -=1;
		if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
			currentPosition +=1;
		};
		draw();
	};
	
	function moveRight () {
		undraw();
		const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);
		
		if (!isAtRightEdge) currentPosition +=1;
		if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
			currentPosition -=1;
		};
		draw();
	};
	
	function rotate() {
	undraw();
	currentRotation++;
	if(currentRotation === current.length){
		currentRotation = 0;
	};
	current = allTetri[random][currentRotation];
	draw();
	};
	
	const displaySquares = Array.from(document.querySelectorAll('.mini-grid div'));
	const displayWidth = 5;
	const displayIndex = 0;
	const upNextTetris = [
		[displayWidth+2, displayWidth*2+2, displayWidth*3+2,displayWidth+3],//l1 0
		[displayWidth+1,displayWidth+2,displayWidth*2+2,displayWidth*3+2],//l2 1
		[displayWidth*3+1 , displayWidth*2+2, displayWidth*3+2,displayWidth*2+3],//z1 2
		[displayWidth+1, displayWidth+2, displayWidth*2+2, displayWidth*2+3],//z2 3
		[displayWidth*2+1 , displayWidth*2+2, displayWidth*3+2,displayWidth*2+3],//t 4
		
		[displayWidth*2+2,displayWidth*2+3,displayWidth*3+2,displayWidth*3+3],//sq 5
		[2,displayWidth+2,displayWidth*2+2,displayWidth*3+2]//palo 6
	];
	function displayShape() {
		displaySquares.forEach(square => {
			square.classList.remove('tetris');
         square.style.backgroundColor = '';
		});
		upNextTetris[nextRandom].forEach( index => {
			displaySquares[0 + index].classList.add('tetris');
			displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
		});
	}; 
	startB.addEventListener('click', ()=> {
		if (timerID){
			clearInterval(timerID);
			timerID = null;
		} else{
			draw();
			timerID = setInterval(moveDown, 500);
			nextRandom = Math.floor(Math.random()*allTetri.length);
			displayShape();				
		};
		
      
	});
	function addScore() {
			for(let i = 0; i < 199; i +=width){
				const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
            if(row.every( index => squares[index].classList.contains('taken'))){
               score += 10;
               scoreD.innerHTML = score;
               row.forEach(index => {
                  squares[index].classList.remove('taken');
                  squares[index].classList.remove('tetris');
                squares[index].style.backgroundColor = '';
               });
               const squaresRemoved = squares.splice(i,width)  ;
               squares = squaresRemoved.concat(squares);
               squares.forEach(cell => grid.appendChild(cell));
              // console.log(squaresRemoved);
                  
            };
			};
		
	}	;
	function endGame() {
      if(current.some(index => squares[currentPosition+index].classList.contains('taken'))){
         scoreD.innerHTML = 'lesto';
         clearInterval(timerID);
      };
   };

	 
});
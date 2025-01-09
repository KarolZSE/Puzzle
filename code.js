    // The code of the puzzle background
        const blocks = [
            'piece1.png',
            'piece2.png',
            'piece3.png',
            'piece4.png'
        ];

        function getRandomBlock() {
            return blocks[Math.floor(Math.random() * blocks.length)];
        }

        function createRandomGrid() {
            const backgroundcontainer = document.getElementById('background-container');
            const rows = Math.ceil(window.innerHeight / 15);
            const cols = Math.ceil(window.innerWidth / 19);
            const totalBlocks = rows * cols;

            for (let i = 0; i < totalBlocks; i++) {
                const backgrounddiv = document.createElement('div');
                backgrounddiv.className = 'background-item';
                backgrounddiv.style.backgroundImage = `url(${getRandomBlock()})`;
                backgrounddiv.style.backgroundSize = 'cover';
                backgroundcontainer.appendChild(backgrounddiv);
            }
        }

        createRandomGrid();

    // The code to fullscreen the page
    var elem = document.documentElement;
    function openFullscreen(a) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        }
        if (a == 1) {
            setTimeout(function(){
                screen.orientation.lock("landscape"); 
            }, 500);
        }
    }
    document.addEventListener('click', (event) => {
        openFullscreen(0);  
    });

    document.addEventListener('touchstart', (event) => {
        openFullscreen(1);
    });

    // The code of the slider
        size = 2;
        const sliderTrack = document.getElementById('sliderTrack');
        const sliderThumb = document.getElementById('sliderThumb');
        const sliderContainer = document.querySelector('.slider-container');

        let isDragging = false;

        sliderThumb.addEventListener('mousedown', startDrag);
        sliderThumb.addEventListener('touchstart', startDrag);

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('touchmove', onDrag);

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);

        function startDrag(event) {
            isDragging = true;
            event.preventDefault();
        }

        function onDrag(event) {
            if (!isDragging) return;

            let clientX = event.clientX || event.touches[0].clientX;
            let rect = sliderContainer.getBoundingClientRect();
            let offsetX = clientX - rect.left;

            if (offsetX < 0) offsetX = 0;
            if (offsetX > rect.width) offsetX = rect.width;

            let percentage = (offsetX / rect.width) * 100 + 2;
            sliderThumb.style.left = `${percentage}%`;
            const slidercontainertext = document.getElementById('slider-container-text');
            slidercontainertext.innerHTML = `Number of pieces selected: ${Math.round(percentage) * Math.round(percentage)}`;
            size = Math.round(percentage);
        }

        function stopDrag() {
            isDragging = false;
        }

    // The code of the own image
        document.documentElement.style.setProperty('--grid-item-bg-image', 'url("image.jpg")'); // Default background image
        gamesize = 75;
        document.documentElement.style.setProperty('--grid-item-bg-size', `${gamesize}vh ${gamesize}vh`);
        document.documentElement.style.setProperty('--img-preview-size', `${gamesize}vh`);
        const ownImage = document.getElementById('ownImage');
        const OwnImagetext = document.getElementById('OwnImage-text');
        const imgpreview = document.getElementById('img-preview');
        ownImage.addEventListener('input', function() {
            imgpreview.src = ownImage.value;
            document.documentElement.style.setProperty('--grid-item-bg-image', `url("${ownImage.value}")`); // New background image
            OwnImagetext.innerHTML = 'Own image: Yes';
        });

    // The code of the ending button
        const endingButton = document.getElementById('ending-button');
        endingButton.addEventListener('click', function() {
            location.reload();
        });
        
    // The code of the menu button
        const menuButton = document.getElementById('menu-button');
        const leaderboard = document.getElementById("leaderboard");
        const name = document.getElementById('name');
        menuButton.addEventListener('click', function() {
            const parentalmenu = document.getElementById("parental-menu");
            parentalmenu.style.display = "none";

            const parentalleaderboard = document.getElementById("parental-leaderboard");
            parentalleaderboard.style.display = "none";

            const gamegrid = document.getElementById("game-grid");
            gamegrid.style.display = "grid";

        // The code of name value
            if (name.value == "") {
                name.value = "User";
            }
            
            const time = Date.now();

            const sizesquare = size * size;
            const sizeofeachpuzzle = gamesize / size;

            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            const gridContainer = document.getElementById('grid-container');
            gridContainer.style.gridTemplateColumns = `repeat(${size}, ${sizeofeachpuzzle}vh)`;
            gridContainer.style.gridTemplateRows = `repeat(${size}, ${sizeofeachpuzzle}vh)`;

        // Create an array of original background positions
            const originalPositions = [];
            for (let i = 0; i < sizesquare; i++) {
                originalPositions.push(`${-(i % size) * sizeofeachpuzzle}vh ${-Math.floor(i / size) * sizeofeachpuzzle}vh`);
            }

        // Create a copy of the original positions array for shuffling
            const shuffledPositions = [...originalPositions];
            
        // Shuffle the positions array
            shuffle(shuffledPositions);

            for (let i = 0; i < sizesquare; i++) {
                const div = document.createElement('div');
                div.className = 'grid-item';
                div.id = 'grid' + i;
                div.style.width = sizeofeachpuzzle + 'vh';
                div.style.height = sizeofeachpuzzle + 'vh';
                div.style.backgroundPosition = shuffledPositions[i];
                div.dataset.correctPosition = originalPositions[i]; // Store the correct position
                div.draggable = true;
            
            // Code to change the position of the puzzles
            div.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', div.id);
            });

            div.addEventListener('dragover', function(event) {
                event.preventDefault();
            });

            div.addEventListener('drop', function(event) {
                event.preventDefault();
                const draggedDivId = event.dataTransfer.getData('text/plain');
                const draggedDiv = document.getElementById(draggedDivId);

                // Swap the properties of the divs
                const tempId = div.id;
                const tempBgColor = div.style.backgroundColor;
                const tempBgPosition = div.style.backgroundPosition;

                div.id = draggedDiv.id;
                div.style.backgroundColor = draggedDiv.style.backgroundColor;
                div.style.backgroundPosition = draggedDiv.style.backgroundPosition;

                draggedDiv.id = tempId;
                draggedDiv.style.backgroundColor = tempBgColor;
                draggedDiv.style.backgroundPosition = tempBgPosition;

                checkBoard();
            });
            gridContainer.appendChild(div);
            }

            function roundPosition(position) {
                return position.split(' ').map(coord => {
                    return parseFloat(coord).toFixed(2) + 'vh';
                }).join(' ');
            }

        // Check if the board is in the correct position
            function checkBoard() {
                const gridItems = document.querySelectorAll('.grid-item');
                let allCorrect = true;
                gridItems.forEach(item => {
                    const bgPosition = roundPosition(item.style.backgroundPosition);
                    const correctPosition = roundPosition(item.dataset.correctPosition);
                    if (bgPosition !== correctPosition) {
                        allCorrect = false;
                    }
                });
                if (allCorrect) {
                    console.log('All pieces are in the correct position!');
                    timeTaken = Date.now() - time;
                    timeTakenSec = Math.floor(timeTaken / 1000);
                    timeTakenMin = Math.floor(timeTakenSec / 60);
                    Score = sizesquare * sizesquare / timeTakenSec * 1000;
                    console.log('Time taken:', timeTakenMin, 'minutes and', timeTakenSec % 60, 'seconds');
                    parentalleaderboard.style.display = "flex";
                    gamegrid.style.opacity = 0;
                    const parentalending = document.getElementById("parental-ending");
                    parentalending.style.display = "flex";
                    const timespan = document.getElementById('timespan');
                    timespan.innerHTML = `${timeTakenMin} minutes and ${timeTakenSec % 60} seconds`;
                    const scorespan = document.getElementById('scorespan');
                    scorespan.innerHTML = Math.round(Score);
                    const puzzlesspan = document.getElementById('puzzlesspan');
                    puzzlesspan.innerHTML = sizesquare;
                    DatabaseCall(1, name, Math.round(Score), sizesquare);
                } else {
                    console.log('Some pieces are still in the wrong position.');
                }
            }
        });

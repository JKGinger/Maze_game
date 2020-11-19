let maze = [
    [5,4,1,2],
    [6,5,5,5],
    [5,8,4,5]
]


let count = 0
for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
        if(maze[y][x] == 5)
        count++;
    }
}

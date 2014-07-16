var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('bird', 'assets/aidan.png');  
        this.game.load.image('pipe', 'assets/pipe.png');  
        
        //Audio
        this.game.load.audio('jump', 'assets/jump.wav');
        this.game.load.audio('music', 'assets/music.wav');
        this.game.load.audio('hit_pipe', 'assets/pipe.wav');
        this.game.load.audio('hit_pipe', 'assets/dead_sound.wav')
        this.game.load.image('background', 'assets/sky.png');


    },

    

   

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
        
    }
};
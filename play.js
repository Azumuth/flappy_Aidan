var play_state = {

    // No more preload, since it is already done in the 'load' state

        GRAVITY: 1000, // The larger the number the faster the bird falls
    JUMP_AMOUNT: -350, // The larger the number the more the bird jumps. Jumps up when negative
    PIPES_DELAY: 1500, // The larger the number the longer the duration between pipes
    PIPES_VELOCITY: -200, // The closer to 0, the slower the pipes travel. Moves RTL when negtive


    create: function() { 

        game.add.sprite(0, 0, 'background');

        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 

        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');  
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           

        this.bird = this.game.add.sprite(50, 245, 'bird');
        this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(-0.2, 0.5);
        
        // Not 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

        this.jump_sound = this.game.add.audio('jump');
        this.dead_sound = this.game.add.audio('dead');
    },

    update: function() {
        if (this.bird.inWorld == false)
            this.restart_game(); 

        if (this.bird.angle < 20)
            this.bird.angle += 1;

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);      
    },

    jump: function() {
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
        this.jump_sound.play();
    },

    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.dead_sound.play();
        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
        
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
       
    },

    writeHighscore: function(value) {
        if (value > highscore) {
            // Set the new highscore
            highscore = value;

            // Write to localStorage
            localStorage.setItem("highscore", value);
        }
    },

    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5)+1;
        
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1 && i != hole +2) 
                this.add_one_pipe(400, i*60+10);   
        
        // Not 'this.score', but just 'score'
        score += 1; 
        this.label_score.content = score;  
    },
};
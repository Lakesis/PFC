 // shim layer with setTimeout fallback - http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
})();


var PFC = (function(PFC, $){
	this.init = function(){
		$(window).load(function(){
		
			var particleSystem = new PFC.physics.System(),
			emitter = new PFC.system.Emitter(),
			ctx =  document.getElementById('canvas').getContext('2d'),
			canvasWidth = $('#canvas').width(),
			canvasHeight = $('#canvas').height()
			;
			
			(function animationLoop(){
				requestAnimFrame(animationLoop);
			//	PFC.system.renderCanvasImage(ctx,particleSystem.particles);
			})();
			
			ctx.fillStyle="#000000";
			ctx.fillRect(0,0,canvasWidth,canvasHeight);
			
			
			
							
		});
	}();

	return PFC; 
})(window.PFC || {}, jQuery);

PFC.physics = {
	Vector : function(x,y){
		this.x = x;
		this.y = y;
	},
	Particle : function(position, velocity){
		this.position = position;
		this.velocity = velocity;
	},
	/*
		FORCES
	*/
	System : function(){
		this.particles = ['a'];
		this.forces = [];
	}
};

/*		VECTORS		*/

PFC.physics.Vector.prototype = {
	/* Vector Algebra I don't really understand */
	muls : function(n) {return new PFC.physics.Vector(this.x*n, this.y*n);},
	imuls : function(n) { this.x*= n; this.y*= n; return this;},
	
	mul : function(v) {return new PFC.physics.Vector(this.x*v.x, this.y*v.y);},
	imul : function(v) { this.x*= v.x; this.y*= v.y; return this;},

	divs : function(n) {return new PFC.physics.Vector(this.x/n, this.y/n);},
	div : function(v) { return new PFC.physics.Vector(this.x/v.x, this.y/v.y);},

	adds : function(n) {return new PFC.physics.Vector(this.x+n, this.y+n);},
	iadds : function(s) { this.x+= s; this.y+= s; return this;},

	add : function(v) {return new PFC.physics.Vector(this.x+v.x, this.y+v.y);},
	iadd : function(v) { this.x+= v.x; this.y+= v.y; return this;},

	subs : function(n) {return new PFC.physics.Vector(this.x-n, this.y-n);},
	isubs : function(s) { this.x-= s; this.y-= s; return this;},

	add : function(v) {return new PFC.physics.Vector(this.x-v.x, this.y-v.y);},
	iadd : function(v) { this.x-= v.x; this.y-= v.y; return this;},
	
	set : function(x,y) {this.x = x; this.y = y;}
};

/*		PARTICLES		*/

PFC.physics.Particle.prototype = {
	update : function(time){
		this.position.iadd(this.velocity.muls(time));
	}

};

/*		PARTICLE SYSTEM		*/

PFC.physics.Particle.prototype = {
	update : function(time){
		this.position.iadd(this.velocity.muls(time));
	}

};

/*		TOOLS		*/

PFC.tools = {
	fuzzy : function(range, base){ return (base || 0) + (Math.random()-0.5)*range*2; },
	choice : function(array) {return array[Math.floor(Math.random()*array.length)]; }
};

PFC.system = {
	renderCanvasImage : function (ctx, particles, fade){
		var length = particles.length;
		for(var i = 0; i < length; i++ ){
			var particle = particles[i];
			ctx.save();
			ctx.translate(particle.position.x, particle.position.y);
			ctx.drawImage();
			ctx.restore();
		
		}
	},
	Emitter : function(x,y) {}
}; 
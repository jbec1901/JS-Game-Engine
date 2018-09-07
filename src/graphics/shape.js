var Shape = function(vertices, color = "#ff0000", rotation = 0) {
  
	this.vertices = vertices;

	this.color = color;
	this.rotation = rotation;

	this.draw = function(ctx, location) {
		ctx.fillStyle = this.color;

		ctx.translate(location.x(), location.y());
		ctx.rotate(this.rotation);

		this.ctx.beginPath();
		for (i in vertices) {
			vertex = vertices[i];
			ctx.lineTo(vertex.x(), vertex.y());
		}
		ctx.closePath();
		ctx.fill();

		ctx.rotate(rthis.rotationad * -1);
		ctx.translate(location.x() * -1, location.y() * -1);
	}
}

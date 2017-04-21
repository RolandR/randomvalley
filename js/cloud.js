

function generateCloud(canvas, context, settings){

	var {cx, cy, count, initialRadius, resolution} = settings;

	for(var i = 0; i < count; i++){
		generateCloudPart(
			cx+(Math.random()-0.5)*(i*initialRadius*3),
			cy,
			initialRadius * (Math.random()*0.5+0.75)
		);
	}
	
	function generateCloudPart(cx, cy, initialRadius){

		var points = [];

		var pointCount = resolution;

		populateCircle();

		pushOutwards();
		smooth(17 * (resolution/100));
		render();

		function populateCircle(){
			for(var i = 0; i < pointCount; i++){
				var p = (i / pointCount) * 2 * Math.PI;
				
				points.push([Math.cos(p)*initialRadius, Math.sin(p)*initialRadius]);
			}
		}

		function pushOutwards(){
			for(var i = 0; i < points.length; i++){
				var factor = (Math.random()-0.3)*(initialRadius/2);
				points[i][0] += points[i][0]*factor + (Math.random()-0.5)*initialRadius;
				points[i][1] += points[i][1]*factor + (Math.random()-0.5)*initialRadius;

				if(points[i][1] > (initialRadius/2)){
					points[i][1] = (initialRadius/2);
				}
			}
		}

		/*function smooth(radius){
			var newPoints = [];
			for(var i = 0; i < points.length; i++){
				var sumX = 0;
				var sumY = 0;
				for(var a = 0-radius; a <= radius; a++){
					
					sumX += points[(points.length+i+a) % points.length][0];
					sumY += points[(points.length+i+a) % points.length][1];
				}

				newPoints[i] = [];
				newPoints[i][0] = sumX / (radius*2+1);
				newPoints[i][1] = sumY / (radius*2+1);
			}

			points = newPoints;
			
		}*/

		function smooth(radius){
		
			var averagingWidth = ~~(radius * 2);

			if(averagingWidth > 0){

				var newPoints = [];
				
				var sumX = 0;
				var sumY = 0;

				for(var i = points.length - averagingWidth; i < points.length; i++){
					sumX += points[i][0];
					sumY += points[i][1];
				}
				
				for(var i = 0; i < points.length; i++){
					sumX = sumX - points[(i - averagingWidth + points.length) % points.length][0] + points[i][0];
					sumY = sumY - points[(i - averagingWidth + points.length) % points.length][1] + points[i][1];
					newPoints[i] = [];
					newPoints[i][0] = sumX / averagingWidth;
					newPoints[i][1] = sumY / averagingWidth;
				}

				points = newPoints;
			}
			
		}

		function render(){

			context.beginPath();
			
			context.moveTo(points[points.length-1][0] + cx, points[points.length-1][1] + cy);

			for(var i in points){
				context.lineTo(points[i][0] + cx, points[i][1] + cy);
			}

			var gradient = context.createRadialGradient(
				cx,
				cy-(initialRadius*10),
				(initialRadius*10),
				cx-initialRadius,
				cy-(initialRadius/2),
				0
			);
			
			gradient.addColorStop(0, "#DDDDDD");
			gradient.addColorStop(1, "#FFFFFF");
			context.fillStyle = gradient;
			
			context.fill();
			
			context.strokeStyle = "rgba(50, 50, 50, 0.05)"
			context.stroke();
		}
	}

}

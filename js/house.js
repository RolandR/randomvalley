
function generateHouse(canvas, context, settings){

	var {scale} = settings;
	
	var windows = 5;
	var floors = 3;
	var compartmentWidth = 100*scale;
	var windowWidth = 60*scale;
	var floorHeight = 140*scale;
	var windowHeight = 80*scale;
	var windowAboveFloor = 30*scale;
	var windowBorder = 7*scale;
	var windowLineWidth = 3*scale;

	var roofIncline = 30*scale;
	var roofHeight = 120*scale;

	context.save();
	context.translate(~~(canvas.width/2 - (compartmentWidth*windows)/2), ~~(canvas.height));
	
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(0, 0-floorHeight*floors);
	context.lineTo(compartmentWidth*windows, 0-floorHeight*floors);
	context.lineTo(compartmentWidth*windows, 0);
	
	context.fillStyle = "#ebe0cb";
	context.fill();

	var gradient = context.createLinearGradient(0, 0-windowHeight, windowWidth, 0);
	gradient.addColorStop(0, "#CCDDFF");
	gradient.addColorStop(1, "#BBCCEE");

	/*var gradient = context.createLinearGradient(0, -3, 3, 0);
	gradient.addColorStop(0, "#000000");
	gradient.addColorStop(1, "#FFFFFF");		
	context.strokeStyle = gradient;*/
	context.strokeStyle = "#f5f7f3";
	
	context.lineWidth = windowLineWidth;

	for(var floor = 0; floor < floors; floor++){
		for(var window = 0; window < windows; window++){
			context.save();
			context.translate(
				~~(compartmentWidth*window)+0.5+compartmentWidth/2-windowWidth/2,
				~~(0-floorHeight*floor)+0.5-windowAboveFloor
			);

			context.fillStyle = "#dddace"

			context.beginPath();
			context.moveTo(0-windowBorder, 0+windowBorder);
			context.lineTo(windowWidth+windowBorder, 0+windowBorder);
			context.lineTo(windowWidth+windowBorder, 0-(windowHeight+windowBorder));
			context.lineTo(0-windowBorder, 0-(windowHeight+windowBorder));
			context.lineTo(0-windowBorder, 0+windowBorder);
			context.fill();

			context.fillStyle = gradient;
			
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(windowWidth, 0);
			context.lineTo(windowWidth, 0-(windowHeight));
			context.lineTo(0, 0-(windowHeight));
			context.lineTo(0, 0);
			context.fill();
			
			context.moveTo(0, 0-(windowHeight/3));
			context.lineTo(windowWidth, 0-(windowHeight/3));
			
			context.moveTo(0, 0-(2*windowHeight/3));
			context.lineTo(windowWidth, 0-(2*windowHeight/3));
			
			context.moveTo(windowWidth/2, 0);
			context.lineTo(windowWidth/2, 0-(windowHeight));
			
			context.stroke();
			context.restore();
		}
	}

	context.save();
	context.translate(0, 0-floors*floorHeight);
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(roofIncline, 0-roofHeight);
	context.lineTo(windows*compartmentWidth-roofIncline, 0-roofHeight);
	context.lineTo(windows*compartmentWidth, 0);
	context.lineTo(0, 0);
	
	var gradient = context.createLinearGradient(0, 0-roofHeight, 0, 0);
	gradient.addColorStop(0, "#967d64");
	gradient.addColorStop(1, "#73604d");
	context.fillStyle = gradient;
	
	context.fill();
	context.restore();

	context.restore();
}




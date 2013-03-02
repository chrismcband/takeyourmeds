void setup(){
	size(400,200);
	noLoop(); // turn off animation as not in use
	stroke(#ffee88);
	fill(#ffee88);
	background(#000033);
	text("",0,0); // force processing to load a font
	textSize(24); // set the font size to something big
}

void draw() { }

void drawText(String t)
{
	background(#000033);
	// get the width for the text
	float twidth = textWidth(t);
	// place the text centered on the drawing area
	text(t, (width - twidth)/2, height/2);
}
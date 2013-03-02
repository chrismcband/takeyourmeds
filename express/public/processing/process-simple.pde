Bouncer[] bouncer = new Bouncer[3];
 
   void setup() {
     size(400,200);
     frameRate(24);
     stroke(#003300);
     fill(#e43e4c);
     text("",0,0);
     textSize(24)
     bouncer[0] = new Ball(40,20,20);
     bouncer[1] = new Ball(70,20,20);
     bouncer[2] = new Ball(100,20,20);
     bouncer[3] = new Ball(130,20,20)
   }
 
   void draw() {
     for(int b=0, end=bouncer.length; b<end;b++) {
       bouncer[b].computeNextStep(width, height, frameRate);
     }
     background(#FFFFEE);
     for(int b=0, end=bouncer.length; b<end;b++) {
       bouncer[b].draw();
     }
   }
 
   void mousePressed() {
     for(int b=0, end=bouncer.length; b<end;b++) {
       if(bouncer[b].mouseOver(mouseX, mouseY)) {
         bouncer[b].mousePressed();
       }
     }
   }
 
   void mouseReleased() {
     for(int b=0, end=bouncer.length; b<end;b++) {
       bouncer[b].mouseReleased();
     }
   }
 
   abstract class Bouncer
   {
     int x, y;
     boolean canmove = true;
     int step = 0;
     int xoffset = 0;
     int yoffset = 0;
 
     void computeNextStep(int width, int height, float framerate) {
       if(canmove) {
         reallyComputeNextStep(width, height, framerate);
       }
     }
 
     abstract void reallyComputeNextStep(int width, int height, float framerate);
 
     abstract void draw();

     abstract void drawText();
 
     abstract boolean mouseOver(int mx, int my);
 
     void mousePressed() {
       canmove = false;
     }
 
     void mouseReleased() {
       canmove = true;
       x += xoffset;
       y += yoffset;
       xoffset = 0;
       yoffset = 0;
     }
 
   }
 
   class Ball extends Bouncer
   {
     int radius;
 
     Ball(int x, int y, int r) {
       this.x = x;
       this.y = y;
       this.radius = r;
     }
 
     void reallyComputeNextStep(int sketch_width, int sketch_height, float frame_rate) {
       step = (int)((step+1) % frame_rate);
       float sin_value = abs(sin(PI*step/(float)frame_rate));
       float bounce_height = sketch_height/2 * sin_value;
       float ball_height = sketch_height - (bounce_height + radius);
       y = (int) (ball_height);
     }
 
     void draw() { ellipse(x+xoffset,y+yoffset,radius,radius); }

     void drawText(String)
     {
        background(#000033);
        // get the width for the text
        float twidth = textWidth(t);

     }
 
     boolean mouseOver(int mx, int my) {
       return sqrt((x-mx)*(x-mx) + (y-my)*(y-my)) <= radius;
     }
   }
 

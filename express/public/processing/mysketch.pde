Bouncer[] bouncer = new Bouncer[3];
 
   void setup() {
     size(400,200);
     frameRate(24);
     stroke(#003300);
     fill(#e43e4c);
     text("",0,0);
     textSize(24)
     bouncer[0] = new Ball(width/3-20,20,20);
     bouncer[1] = new Box(width/2-10,20,20,20);
     bouncer[2] = new Ball((2*width/3)+20,20,20);
     bouncer[3] = new Box(width/2+27,20,20,20)
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
 
   void mouseDragged() {
     for(int b=0, end=bouncer.length; b<end;b++) {
       bouncer[b].mouseDragged(mouseX, mouseY);
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
 
     void mouseDragged(int mx, int my) {
       if(!canmove) {
         xoffset = mx-x;
         yoffset = my-y;
       }
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
 
   class Box extends Bouncer
   {
     int w,h;
     int step=0;
 
     Box(int x, int y, int w, int h) {
       this.x = x;
       this.y = y;
       this.w = w;
       this.h = h;
     }
 
     void reallyComputeNextStep(int sketch_width, int sketch_height, float frame_rate) {
       step = (int)((step+1) % frame_rate);
       float sin_value = abs(sin(PI/2.0 + (PI*step/(float)frame_rate)));
       float bounce_height = sketch_height/2 * sin_value;
       float ball_height = sketch_height - (bounce_height + h);
       y = (int) (ball_height);
     }
 
     void draw() { rect(x+xoffset,(y-h/2)+yoffset,w,h); }
 
     boolean mouseOver(int mx, int my) {
       return x<=mx && mx<=x+w && (y-h/2)<=my && my<=(y+h/2);
     }
   }  
class Spaceship {
    constructor() {
        this.d = 50;
        this.ld = 30;
        this.x = width / 2;
        this.y = this.d / 2;
        this.speed = 0;

        this.hRect = 100;
        this.wRect = width / 2;
        this.xRect = this.wRect;
        this.yRect = -this.hRect;

        // tabs
        this.tabW = 150;
        this.tabH = 40;
        this.tabX = this.tabW / 2 - width / 4;
        this.tabY = this.tabH / 2 - height / 4;   

        // next, previous buttons
        this.Btn_size = 30;
        this.pBtnX = -this.Btn_size;
        this.pBtnY = height / 4 - this.Btn_size / 2;

        this.nBtnX = this.Btn_size;
        this.nBtnY = height / 4 - this.Btn_size / 2;

        // checkboxes
        this.cBoxX = 50 - width / 4;
        this.cBoxY = 165 - height / 4;
        this.cBox_size = 10;

        // submit button
        this.submitX = 200;
        this.submitY = 320 - height / 4;
        this.submitW = 100;
        this.submitH = 50;

        // filter button
        this.F_size = 40;
        this.Fx = -this.F_size;
        this.Fy = 0;
    }

    show() {
        let red = random(255);
        let green = random(255);
        let blue = random(255);

        push();
            ellipseMode(CENTER);
            fill(0, 180);
            ellipse(this.x, this.y, this.d);
            fill(255, 180);
            ellipse(this.x, this.y, this.ld);
            // strokeWeight(3);
            if (this.hovered()) { // if spaceship button gets hovered

                fill(red, green, blue);
            } else fill(255);
            beginShape();
                for (let a = 0; a < 360; a += 36) {
                        let dx = cos(a) * (this.d - 8) / 2;
                        let dy = sin(a) * (this.d - 8) / 2;
                        ellipse(this.x + dx, this.y + dy, 5);
                        // vertex(this.x + dx, this.y + dy);
                }
            endShape(CLOSE);

            // board  
            rectMode(CENTER);         
            noStroke();
            fill(0);
            rect(this.xRect, this.yRect, this.wRect, this.hRect);
      
            // buttons
            if (this.R_btn_hovered()) {
                // console.log("HOVERED");
                fill(255, 0, 0, 150); // red-ish
                rect(this.wRect + this.xRect / 4, this.yRect, this.wRect / 3, this.hRect / 2); // right button
            
                fill(51);
                rect(this.wRect - this.xRect / 4, this.yRect, this.wRect / 3, this.hRect / 2); // left button
            } else if (this.L_btn_hovered()) {
                fill(255, 0, 0, 150); // red-ish
                rect(this.wRect - this.xRect / 4, this.yRect, this.wRect / 3, this.hRect / 2); // left button                
            
                fill(51);
                rect(this.wRect + this.xRect / 4, this.yRect, this.wRect / 3, this.hRect / 2); // right button
            } else {
                fill(51);
                rect(this.wRect + this.xRect / 4, this.yRect, this.wRect / 3, this.hRect / 2); // right button
                rect(this.wRect - this.xRect / 4, this.yRect, this.wRect / 3, this.hRect / 2); // left button
            }
            //texts on buttons
            fill(255);
            textAlign(CENTER);
            if (mobile) {
                textSize(10);
                text("Get Current Location", this.wRect - this.xRect / 4, this.yRect + 40, 80, 100);
                text("More Information", this.wRect + this.xRect / 4, this.yRect + 40, 80, 100);
            } else  {
                text("Get Current Location", this.wRect - this.xRect / 4, this.yRect + 35, 100, 100);
                text("More Information", this.wRect + this.xRect / 4, this.yRect + 35, 100, 100);
            }
            
        pop();
    }

    // information button
    showInfo() {
        mappedScl = map(animTime, 0, 15, 0, 1);
        if (animTime <= 14) {
            animTime++;
        }
        push();
            translate(width / 2, height / 2); // translate origin to the centre of the canvas
            rectMode(CENTER);
            scale(mappedScl, mappedScl);
            noStroke();
            fill(0, 180);
            rect(0, 0, width, height);

            fill(0, 200);
            if (!mobile) {
                if (btn_activated == 4) { // stretch the box because of too many texts in the fourth case
                    rect(0, 60, width / 2, height / 2 + 120); // stretch 60 on top and bottom part, so shift y-axis to +60 to even out the same position of the box
                } else rect(0, 0, width / 2, height / 2);
            } else {
                if (btn_activated == 4) { // stretch the box because of too many texts in the fourth case
                    rect(0, 60, width / 2 + 140, height / 2 + 120); // stretch 60 on top and bottom part, so shift y-axis to +60 to even out the same position of the box
                } else rect(0, 0, width / 2 + 140, height / 2);
            }
            

            // tabs
            if (btn_activated > 0 && btn_activated < 7) { // to check if it's in an interval of 1 and 6
            // reset the checkboxes
                chosenBx1 = false;
                chosenBx2 = false;
                chosenBx3 = false;
                chosenBx4 = false;
                chosenBx5 = false;
                chosenBx6 = false;
                fill(200, 220); // left tab is white
            } else fill(51, 220); // if it's 7, left tab turn grey

            if (!mobile) rect(this.tabX, this.tabY, this.tabW, this.tabH); // left tab
            else rect(this.tabX - 100, this.tabY, this.tabW - 60, this.tabH);
            strokeWeight(3);
            fill(0);
            textAlign(CENTER);
            if (!mobile) {
                textSize(15);
                text("Pollutants Wiki", this.tabX, this.tabY);
            } else {
                textSize(10);
                text("Pollutants Wiki", this.tabX - 100, this.tabY); // text on left tab
            }

            if (btn_activated == 7) { // if it's 7
            // reset the checkboxes
                chosenBx1 = false;
                chosenBx2 = false;
                chosenBx3 = false;
                chosenBx4 = false;
                chosenBx5 = false;
                chosenBx6 = false;
                fill(200, 220); // mid tab is white
            } else fill(51, 220); // else it's grey

            if (!mobile) rect(this.tabX + this.tabW, this.tabY, this.tabW, this.tabH); // mid tab
            else rect(this.tabX + this.tabW - 160, this.tabY, this.tabW - 60, this.tabH)
            strokeWeight(3);
            fill(0);

            if (!mobile) {
                textSize(15);
                text("About Me", this.tabX + this.tabW, this.tabY);
            } else {
                textSize(10);
                text("About Me", this.tabX + this.tabW - 160, this.tabY); // text on mid tab
            }
            if (btn_activated == 8) { // if it's 8
                fill(200, 220); // right tab is white
            } else fill(51, 220); // else it's grey

            if (!mobile) rect(this.tabX + this.tabW * 2, this.tabY, this.tabW, this.tabH); // right tab
            else rect(this.tabX + this.tabW * 2 - 220, this.tabY, this.tabW - 60, this.tabH);
            strokeWeight(3);
            fill(0);

            if (!mobile) {
                textSize(15);
                text("About You", this.tabX + this.tabW * 2, this.tabY); // text on right tab                
            } else {
                textSize(10);
                text("About You", this.tabX + this.tabW * 2 - 220, this.tabY); // text on right tab                
            }

            // next, previous button
            if (btn_activated > 1 && btn_activated < 7) { // left button disappears if it reaches 1 or 7
              if (this.prev_btn_hovered()) textSize(30);                
              else textSize(25);
                fill(255, 200);
                rect(this.pBtnX, this.pBtnY, this.Btn_size, this.Btn_size);
                fill(0);
                textAlign(CENTER);
                text("<", this.pBtnX, this.pBtnY + 8);
            }
            if (btn_activated < 6 && btn_activated > 0) { // right button disappears if it reaches 6
              if (this.next_btn_hovered()) textSize(30);
              else textSize(25);
                fill(255, 200);
                rect(this.nBtnX, this.nBtnY, this.Btn_size, this.Btn_size);
                fill(0);
                textAlign(CENTER);
                text(">", this.nBtnX, this.nBtnY + 8);
            }


            // check boxes
            if (btn_activated > 7) {
                if (!reSize) { // if submit button is not clicked
                   if (chosenBx1 == true) { // 1
                      fill(0, 255, 0, 240);
                      rect(this.cBoxX, this.cBoxY, this.cBox_size, this.cBox_size);
                  } else {
                      fill(255, 240);
                      rect(this.cBoxX, this.cBoxY, this.cBox_size, this.cBox_size);
                  }

                  if (chosenBx2 == true) { // 2
                      fill(0, 255, 0, 240);
                      rect(this.cBoxX, this.cBoxY + 20, this.cBox_size, this.cBox_size);
                  } else {
                      fill(255, 240);
                      rect(this.cBoxX, this.cBoxY + 20, this.cBox_size, this.cBox_size);
                  }

                  if (chosenBx3 == true) { // 3
                      fill(0, 255, 0, 240);
                      rect(this.cBoxX, this.cBoxY + 40, this.cBox_size, this.cBox_size);
                  } else {
                      fill(255, 240);
                      rect(this.cBoxX, this.cBoxY + 40, this.cBox_size, this.cBox_size);
                  }

                  if (chosenBx4 == true) { // 4
                      fill(0, 255, 0, 240);
                      rect(this.cBoxX, this.cBoxY + 60, this.cBox_size, this.cBox_size);
                  } else {
                      fill(255, 240);
                      rect(this.cBoxX, this.cBoxY + 60, this.cBox_size, this.cBox_size);
                  }

                  if (chosenBx5 == true) { // 5
                      fill(0, 255, 0, 240);
                      rect(this.cBoxX, this.cBoxY + 80, this.cBox_size, this.cBox_size);
                  } else {
                      fill(255, 240);
                      rect(this.cBoxX, this.cBoxY + 80, this.cBox_size, this.cBox_size);
                  }

                  if (chosenBx6 == true) { // 6
                      fill(0, 255, 0, 240);
                      rect(this.cBoxX, this.cBoxY + 100, this.cBox_size, this.cBox_size);
                  } else {
                      fill(255, 240);
                      rect(this.cBoxX, this.cBoxY + 100, this.cBox_size, this.cBox_size);
                  }

                  // submit button
                  if (chosenBx1 || chosenBx2 || chosenBx3 || chosenBx4 ||
                      chosenBx5 || chosenBx6) { // if one or more checkboxes are chosen, then fill grey
                          fill(51);
                      } else fill(51, 100); // else turn down the alpha
                      if (!mobile) rect(this.submitX, this.submitY, this.submitW, this.submitH);
                      else rect(this.submitX - 100, this.submitY - 20, this.submitW, this.submitH); 
                }
            }

            
            // information texts
            textAlign(LEFT);
            
            if (!mobile) textSize(12);
            else textSize(6.5);
            fill(255);
            
            if (!mobile) { // if not touch screen devices
                if (btn_activated == 1) {
                    text(referenceText_CO[0], 10 - width / 4, 60 - height / 4);
                    text(referenceText_CO[1], 12 - width / 4, 80 - height / 4);
                    text(referenceText_CO[2], 12 - width / 4, 100 - height / 4);
                    text(referenceText_CO[3], 12 - width / 4, 120 - height / 4);
                    text(referenceText_CO[4], 12 - width / 4, 140 - height / 4);
                    text(referenceText_CO[5], 12 - width / 4, 160 - height / 4);
                    text(referenceText_CO[6], 12 - width / 4, 180 - height / 4);
                    text(referenceText_CO[7], 12 - width / 4, 200 - height / 4);
    
                    text(referenceText_CO[8], 12 - width / 4, 240 - height / 4);
                    text(referenceText_CO[9], 12 - width / 4, 260 - height / 4);
                    text(referenceText_CO[10], 12 - width / 4, 280 - height / 4);
                    text(referenceText_CO[11], 12 - width / 4, 300 - height / 4);
                    text(referenceText_CO[12], 12 - width / 4, 320 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_CO[13], width / 4 - 12, 320 - height / 4);
                } else if (btn_activated == 2) {
                    text(referenceText_O3[0], 10 - width / 4, 60 - height / 4);
                    text(referenceText_O3[1], 12 - width / 4, 80 - height / 4);
                    text(referenceText_O3[2], 12 - width / 4, 100 - height / 4);
                    text(referenceText_O3[3], 12 - width / 4, 120 - height / 4);
                    text(referenceText_O3[4], 12 - width / 4, 140 - height / 4);
    
                    text(referenceText_O3[5], 12 - width / 4, 180 - height / 4);
                    text(referenceText_O3[6], 12 - width / 4, 200 - height / 4);
                    text(referenceText_O3[7], 12 - width / 4, 220 - height / 4);
                    text(referenceText_O3[8], 12 - width / 4, 240 - height / 4);
                    text(referenceText_O3[9], 12 - width / 4, 260 - height / 4);
    
                    textAlign(RIGHT);
                    text(referenceText_O3[10], width / 4 - 12, 320 - height / 4);
                } else if (btn_activated == 3) {
                    text(referenceText_SO2[0], 10 - width / 4, 60 - height / 4);
                    text(referenceText_SO2[1], 12 - width / 4, 80 - height / 4);
                    text(referenceText_SO2[2], 12 - width / 4, 100 - height / 4);
                    text(referenceText_SO2[3], 12 - width / 4, 140 - height / 4);
                    text(referenceText_SO2[4], 12 - width / 4, 160 - height / 4);
                    text(referenceText_SO2[5], 12 - width / 4, 180 - height / 4);
                    text(referenceText_SO2[6], 12 - width / 4, 200 - height / 4);
                    text(referenceText_SO2[7], 12 - width / 4, 240 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_SO2[8], width / 4 - 12, 320 - height / 4);
                } else if (btn_activated == 4) {
                    text(referenceText_NO2[0], 10 - width / 4, 60 - height / 4);
                    text(referenceText_NO2[1], 12 - width / 4, 80 - height / 4);
                    text(referenceText_NO2[2], 12 - width / 4, 100 - height / 4);
                    text(referenceText_NO2[3], 12 - width / 4, 120 - height / 4);
                    text(referenceText_NO2[4], 12 - width / 4, 160 - height / 4);
                    text(referenceText_NO2[5], 12 - width / 4, 180 - height / 4);
                    text(referenceText_NO2[6], 12 - width / 4, 200 - height / 4);
                    text(referenceText_NO2[7], 12 - width / 4, 220 - height / 4);
                    text(referenceText_NO2[8], 12 - width / 4, 240 - height / 4);
                    text(referenceText_NO2[9], 12 - width / 4, 260 - height / 4);
                    text(referenceText_NO2[10], 12 - width / 4, 300 - height / 4);
                    text(referenceText_NO2[11], 12 - width / 4, 320 - height / 4);
                    text(referenceText_NO2[12], 12 - width / 4, 340 - height / 4);
                    text(referenceText_NO2[13], 12 - width / 4, 360 - height / 4);
                    text(referenceText_NO2[14], 12 - width / 4, 380 - height / 4);
                    text(referenceText_NO2[15], 12 - width / 4, 420 - height / 4);
                    text(referenceText_NO2[16], 12 - width / 4, 440 - height / 4);
                    text(referenceText_NO2[17], 12 - width / 4, 460 - height / 4);
                    text(referenceText_NO2[18], 12 - width / 4, 480 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_NO2[19], width / 4 - 12, 320 - height / 4);
                } else if (btn_activated == 5) {
                    text(referenceText_PM10[0], 10 - width / 4, 60 - height / 4);
                    text(referenceText_PM10[1], 12 - width / 4, 80 - height / 4);
                    text(referenceText_PM10[2], 12 - width / 4, 100 - height / 4);
                    text(referenceText_PM10[3], 12 - width / 4, 120 - height / 4);
                    text(referenceText_PM10[4], 12 - width / 4, 140 - height / 4);
                    text(referenceText_PM10[5], 12 - width / 4, 180 - height / 4);
                    text(referenceText_PM10[6], 12 - width / 4, 200 - height / 4);
                    text(referenceText_PM10[7], 12 - width / 4, 220 - height / 4);
                    text(referenceText_PM10[8], 12 - width / 4, 240 - height / 4);
                    text(referenceText_PM10[9], 12 - width / 4, 280 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_PM10[10], width / 4 - 12, 320 - height / 4);
                } else if (btn_activated == 6) {
                    text(referenceText_PM25[0], 10 - width / 4, 60 - height / 4);
                    text(referenceText_PM25[1], 12 - width / 4, 80 - height / 4);
                    text(referenceText_PM25[2], 12 - width / 4, 100 - height / 4);
                    text(referenceText_PM25[3], 12 - width / 4, 120 - height / 4);
                    text(referenceText_PM25[4], 12 - width / 4, 160 - height / 4);
                    text(referenceText_PM25[5], 12 - width / 4, 180 - height / 4);
                    text(referenceText_PM25[6], 12 - width / 4, 200 - height / 4);
                    text(referenceText_PM25[8], 12 - width / 4, 220 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_PM25[9], width / 4 - 12, 320 - height / 4);
                } else if (btn_activated == 7) {
                    text(aboutText[0], 10 - width / 4, 60 - height / 4);
                    text(aboutText[1], 10 - width / 4, 80 - height / 4);
                    text(aboutText[2], 10 - width / 4, 100 - height / 4);
                    text(aboutText[3], 10 - width / 4, 120 - height / 4);
                    text(aboutText[4], 10 - width / 4, 140 - height / 4);
    
                    text(aboutText[5], 10 - width / 4, 200 - height / 4);
                    text(aboutText[6], 10 - width / 4, 220 - height / 4);
                    text(aboutText[7], 10 - width / 4, 240 - height / 4);
    
                    text(aboutText[8], 10 - width / 4, 300 - height / 4);
                    textAlign(RIGHT);
                    text(aboutText[9], width / 4 - 12, 320 - height / 4);
                } else if (btn_activated == 8) {
                    if (!reSize) { // submit button is not clicked yet
                      text(submitText[0], 50 - width / 4, 120 - height / 4);
                      text(submitText[1], 100 - width / 4, 170 - height / 4);
                      text(submitText[2], 100 - width / 4, 190 - height / 4);
                      text(submitText[3], 100 - width / 4, 210 - height / 4);
                      text(submitText[4], 100 - width / 4, 230 - height / 4);
                      text(submitText[5], 100 - width / 4, 250 - height / 4);
                      text(submitText[6], 100 - width / 4, 270 - height / 4);  

                      //submit text
                      if (chosenBx1 || chosenBx2 || chosenBx3 || chosenBx4 ||
                          chosenBx5 || chosenBx6) { // if one or more checkboxes are chosen, then fill white
                          if (this.submit_hovered()) textSize(15);
                              fill(255);
                          } else fill(51); // else grey out the text
                      textAlign(CENTER);
                      text("SUBMIT", this.submitX, this.submitY); 
                    } else text("THANK YOU FOR YOUR CONSIDERATIONS", 0, 0, 250, 50);            
                }
            } else { // if it is touch screen devices
                if (btn_activated == 1) {
                    text(referenceText_CO[0], width / 4 - 250, 60 - height / 4);
                    text(referenceText_CO[1], width / 4 - 250, 70 - height / 4);
                    text(referenceText_CO[2], width / 4 - 250, 90 - height / 4);
                    text(referenceText_CO[3], width / 4 - 250, 100 - height / 4);
                    text(referenceText_CO[4], width / 4 - 250, 120 - height / 4);
                    text(referenceText_CO[5], width / 4 - 250, 140 - height / 4);
                    text(referenceText_CO[6], width / 4 - 250, 160 - height / 4);
                    text(referenceText_CO[7], width / 4 - 250, 170 - height / 4);
    
                    text(referenceText_CO[8], width / 4 - 250, 200 - height / 4);
                    text(referenceText_CO[9], width / 4 - 250, 220 - height / 4);
                    text(referenceText_CO[10], width / 4 - 250, 240 - height / 4);
                    text(referenceText_CO[11], width / 4 - 250, 260 - height / 4);
                    text(referenceText_CO[12], width / 4 - 250, 280 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_CO[13], width / 4 + 60, 280 - height / 4);
                } else if (btn_activated == 2) {
                    text(referenceText_O3[0], width / 4 - 250, 60 - height / 4);
                    text(referenceText_O3[1], width / 4 - 250, 70 - height / 4);
                    text(referenceText_O3[2], width / 4 - 250, 90 - height / 4);
                    text(referenceText_O3[3], width / 4 - 250, 100 - height / 4);
                    text(referenceText_O3[4], width / 4 - 250, 120 - height / 4);
    
                    text(referenceText_O3[5], width / 4 - 250, 180 - height / 4);
                    text(referenceText_O3[6], width / 4 - 250, 200 - height / 4);
                    text(referenceText_O3[7], width / 4 - 250, 220 - height / 4);
                    text(referenceText_O3[8], width / 4 - 250, 240 - height / 4);
                    text(referenceText_O3[9], width / 4 - 250, 260 - height / 4);
    
                    textAlign(RIGHT);
                    text(referenceText_O3[10], width / 4 + 60, 280 - height / 4);
                } else if (btn_activated == 3) {
                    text(referenceText_SO2[0], width / 4 - 250, 60 - height / 4);
                    text(referenceText_SO2[1], width / 4 - 250, 70 - height / 4);
                    text(referenceText_SO2[2], width / 4 - 250, 80 - height / 4);
                    text(referenceText_SO2[3], width / 4 - 250, 120 - height / 4);
                    text(referenceText_SO2[4], width / 4 - 250, 140 - height / 4);
                    text(referenceText_SO2[5], width / 4 - 250, 160 - height / 4);
                    text(referenceText_SO2[6], width / 4 - 250, 180 - height / 4);
                    text(referenceText_SO2[7], width / 4 - 250, 220 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_SO2[8], width / 4 + 60, 280 - height / 4);
                } else if (btn_activated == 4) {
                    text(referenceText_NO2[0], width / 4 - 250, 60 - height / 4);
                    text(referenceText_NO2[1], width / 4 - 250, 70 - height / 4);
                    text(referenceText_NO2[2], width / 4 - 250, 90 - height / 4);
                    text(referenceText_NO2[3], width / 4 - 250, 100 - height / 4);
                    text(referenceText_NO2[4], width / 4 - 250, 140 - height / 4);
                    text(referenceText_NO2[5], width / 4 - 250, 150 - height / 4);
                    text(referenceText_NO2[6], width / 4 - 250, 160 - height / 4);
                    text(referenceText_NO2[7], width / 4 - 250, 180 - height / 4);
                    text(referenceText_NO2[8], width / 4 - 250, 200 - height / 4);
                    text(referenceText_NO2[9], width / 4 - 250, 220 - height / 4);
                    text(referenceText_NO2[10], width / 4 - 250, 260 - height / 4);
                    text(referenceText_NO2[11], width / 4 - 250, 270 - height / 4);
                    text(referenceText_NO2[12], width / 4 - 250, 290 - height / 4);
                    text(referenceText_NO2[13], width / 4 - 250, 310 - height / 4);
                    text(referenceText_NO2[14], width / 4 - 250, 330 - height / 4);
                    text(referenceText_NO2[15], width / 4 - 250, 360 - height / 4);
                    text(referenceText_NO2[16], width / 4 - 250, 370 - height / 4);
                    text(referenceText_NO2[17], width / 4 - 250, 390 - height / 4);
                    text(referenceText_NO2[18], width / 4 - 250, 410 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_NO2[19], width / 4 + 60, 410 - height / 4);
                } else if (btn_activated == 5) {
                    text(referenceText_PM10[0], width / 4 - 250, 60 - height / 4);
                    text(referenceText_PM10[1], width / 4 - 250, 70 - height / 4);
                    text(referenceText_PM10[2], width / 4 - 250, 90 - height / 4);
                    text(referenceText_PM10[3], width / 4 - 250, 110 - height / 4);
                    text(referenceText_PM10[4], width / 4 - 250, 120 - height / 4);
                    text(referenceText_PM10[5], width / 4 - 250, 130 - height / 4);
                    text(referenceText_PM10[6], width / 4 - 250, 140 - height / 4);
                    text(referenceText_PM10[7], width / 4 - 250, 160 - height / 4);
                    text(referenceText_PM10[8], width / 4 - 250, 180 - height / 4);
                    text(referenceText_PM10[9], width / 4 - 250, 220 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_PM10[10], width / 4 + 60, 240 - height / 4);
                } else if (btn_activated == 6) {
                    text(referenceText_PM25[0], width / 4 - 250, 60 - height / 4);
                    text(referenceText_PM25[1], width / 4 - 250, 70 - height / 4);
                    text(referenceText_PM25[2], width / 4 - 250, 90 - height / 4);
                    text(referenceText_PM25[3], width / 4 - 250, 100 - height / 4);
                    text(referenceText_PM25[4], width / 4 - 250, 140 - height / 4);
                    text(referenceText_PM25[5], width / 4 - 250, 150 - height / 4);
                    text(referenceText_PM25[6], width / 4 - 250, 170 - height / 4);
                    text(referenceText_PM25[8], width / 4 - 250, 190 - height / 4);
                    textAlign(RIGHT);
                    text(referenceText_PM25[9], width / 4 + 60, 240 - height / 4);
                } else if (btn_activated == 7) {
                    text(aboutText[0], width / 4 - 250, 60 - height / 4);
                    text(aboutText[1], width / 4 - 250, 80 - height / 4);
                    text(aboutText[2], width / 4 - 250, 100 - height / 4);
                    text(aboutText[3], width / 4 - 250, 120 - height / 4);
                    text(aboutText[4], width / 4 - 250, 140 - height / 4);
    
                    text(aboutText[5], width / 4 - 250, 200 - height / 4);
                    text(aboutText[6], width / 4 - 250, 220 - height / 4);
                    text(aboutText[7], width / 4 - 250, 240 - height / 4);
    
                    text(aboutText[8], width / 4 - 250, 300 - height / 4);
                    textAlign(RIGHT);
                    text(aboutText[9], width / 4 + 60, 320 - height / 4);
                } else if (btn_activated == 8) {
                    if (!reSize) { // submit button is not clicked yet
                      text(submitText[0], 50 - width / 4, 120 - height / 4);
                      text(submitText[1], 100 - width / 4, 170 - height / 4);
                      text(submitText[2], 100 - width / 4, 190 - height / 4);
                      text(submitText[3], 100 - width / 4, 210 - height / 4);
                      text(submitText[4], 100 - width / 4, 230 - height / 4);
                      text(submitText[5], 100 - width / 4, 250 - height / 4);
                      text(submitText[6], 100 - width / 4, 270 - height / 4);  

                      //submit text
                      if (chosenBx1 || chosenBx2 || chosenBx3 || chosenBx4 ||
                          chosenBx5 || chosenBx6) { // if one or more checkboxes are chosen, then fill white
                          if (this.submit_hovered()) textSize(15);
                              fill(255);
                          } else fill(51); // else grey out the text
                      textAlign(CENTER);
                      text("SUBMIT", this.submitX, this.submitY); 
                    } else text("THANK YOU FOR YOUR CONSIDERATION", 0, 0, 250, 50);      
                }
            }
            

        pop();

    }
    // end of showInfo

    showCloseInfo() {
        mappedAlpha = map(animTime, 0, 15, 0, 250);
        push();
            if (!mobile) {
              if (this.hoveredCloseInfo()) {
                  fill(51, mappedAlpha);
                  ellipse(width / 2 + width / 4, height / 2 - height / 4, 50);
                  fill(255, mappedAlpha);
                  textAlign(CENTER);
                  strokeWeight(2);
                  textSize(20);
                  text("X", width / 2 + width / 4, height / 2 - height / 4);
              } else {
                  fill(51, mappedAlpha);
                  ellipse(width / 2 + width / 4, height / 2 - height / 4, 50);
                  fill(255, mappedAlpha);
                  textAlign(CENTER);
                  text("X", width / 2 + width / 4, height / 2 - height / 4);
              }                
            } else {
                if (this.hoveredCloseInfo()) {
                  fill(51, mappedAlpha);
                  ellipse(width / 2 + width / 4 + 70, height / 2 - height / 4, 50);
                  fill(255, mappedAlpha);
                  textAlign(CENTER);
                  strokeWeight(2);
                  textAlign(CENTER);
                  text("X", width / 2 + width / 4 + 70, height / 2 - height / 4); 
                } else {
                    fill(51, mappedAlpha);
                    ellipse(width / 2 + width / 4 + 70, height / 2 - height / 4, 50);
                    fill(255, mappedAlpha);
                    textAlign(CENTER);
                    text("X", width / 2 + width / 4 + 70, height / 2 - height / 4);
                }
            }
            
        pop();
    }

    showFilter() {
        mappedScl = map(animTime, 0, 15, 0, 1);
        push();
        // question mark
            translate(width, 0); // translate to top right corner
            // imageMode(CORNERS);
            image(questionMrk, this.Fx, this.Fy, this.F_size, this.F_size);
            if (this.filter_hovered()) {
              fill(51, 50);
              noStroke();
              ellipseMode(CENTER);
              ellipse(this.Fx + this.F_size / 2, this.Fy + this.F_size / 2, this.F_size);
            }
            // rectMode(CORNERS);
            // rect(this.Fx, this.Fy, this.F_size, this.F_size);

        // board
            if (filterMode) {
                if (animTime <= 14) {
                    animTime++;
                }
                scale(mappedScl, mappedScl);
                fill(0, 0, 10, 200);
                rect(this.Fx - 280, this.Fy + 50, this.F_size + 240, this.F_size - 10); // board
                fill(255);
                textAlign(CENTER);
                text("Filtering", this.Fx - 240, this.Fy + 70); // text

                rect(this.Fx - 80, this.Fy + 55, this.F_size + 30, this.F_size - 20); // drop down menu (YEAR)
                rect(this.Fx - 190, this.Fy + 55, this.F_size + 60, this.F_size - 20); // drop down menu (POLLUTANT)

                fill(0);
                if (yearsSelection == 1) {
                    text("2019", this.Fx - 43, this.Fy + 70); // text inside drop down menu
                } else if (yearsSelection == 2) {
                    text("2018", this.Fx - 43, this.Fy + 70); // text inside drop down menu
                } else if (yearsSelection == 3) {
                    text("2017", this.Fx - 43, this.Fy + 70); // text inside drop down menu
                } else text("YEAR", this.Fx - 43, this.Fy + 70); // text inside drop down menu

                if (pollutantSelection == 1) {
                    text("CO", this.Fx - 140, this.Fy + 70);
                } else if (pollutantSelection == 2) {
                    text("O3", this.Fx - 140, this.Fy + 70);
                } else if (pollutantSelection == 3) {
                    text("SO2", this.Fx - 140, this.Fy + 70);
                } else if (pollutantSelection == 4) {
                    text("NO2", this.Fx - 140, this.Fy + 70);
                } else if (pollutantSelection == 5) {
                    text("PM10", this.Fx - 140, this.Fy + 70);
                } else if (pollutantSelection == 6) {
                    text("PM2.5", this.Fx - 140, this.Fy + 70);
                } else text("POLLUTANT", this.Fx - 140, this.Fy + 70); // text inside drop down menu
                if (menuDropped) {
                    fill(255, 200);
                    stroke(0);
                    strokeWeight(0.5);
                    rect(this.Fx - 80, this.Fy + this.F_size + 35, this.F_size + 30, 40); // first section
                    rect(this.Fx - 80, this.Fy + this.F_size + 75, this.F_size + 30, 40); // second section
                    rect(this.Fx - 80, this.Fy + this.F_size + 115, this.F_size + 30, 40); // third section
                    rect(this.Fx - 80, this.Fy + this.F_size + 155, this.F_size + 30, 40); // "all" section

                    fill(51);
                    text("2019", this.Fx - 45, this.Fy + this.F_size + 60); // text in the first section
                    text("2018", this.Fx - 45, this.Fy + this.F_size + 100); // text in the second section
                    text("2017", this.Fx - 45, this.Fy + this.F_size + 140); // text in the third section
                    text("All", this.Fx - 45, this.Fy + this.F_size + 180); // text in the "all" section
                }
                if (pollutant_menuDropped) {
                    fill(255, 200);
                    stroke(0);
                    strokeWeight(0.5);
                    rect(this.Fx - 190, this.Fy + this.F_size + 35, this.F_size + 60, 40); // first section
                    rect(this.Fx - 190, this.Fy + this.F_size + 75, this.F_size + 60, 40); // second section
                    rect(this.Fx - 190, this.Fy + this.F_size + 115, this.F_size + 60, 40); // third section
                    rect(this.Fx - 190, this.Fy + this.F_size + 155, this.F_size + 60, 40); // fourth section
                    rect(this.Fx - 190, this.Fy + this.F_size + 195, this.F_size + 60, 40); // fifth section
                    rect(this.Fx - 190, this.Fy + this.F_size + 235, this.F_size + 60, 40); // sixth section
                    rect(this.Fx - 190, this.Fy + this.F_size + 275, this.F_size + 60, 40); // the "all" section

                    fill(51);
                    text("CO", this.Fx - 140, this.Fy + this.F_size + 60);
                    text("O3", this.Fx - 140, this.Fy + this.F_size + 100);
                    text("SO2", this.Fx - 140, this.Fy + this.F_size + 140);
                    text("NO2", this.Fx - 140, this.Fy + this.F_size + 180);
                    text("PM10", this.Fx - 140, this.Fy + this.F_size + 220);
                    text("PM2.5", this.Fx - 140, this.Fy + this.F_size + 260);
                    text("All", this.Fx - 140, this.Fy + this.F_size + 300);
                }
            }
        pop();
    }



// THE MAJORITY OF COLLISION DETECTIONS BELOW NEED (WIDTH / 2) AND (HEIGHT / 2) / (WIDTH) AT THE FRONT BECAUSE OF CANVAS'S CENTRE TRANSLATION
// OR CANVAS'S TOP RIGHT TRANSLATION

    // drop-down menu button
    drop_down_hovered() {
        if (mouseX < width - 30 && mouseX > width + this.Fx - 80) {
            if (mouseY < 35 + this.F_size && mouseY > 55) {
                return true;
            }
        } else return false;
    }
    pollutant_drop_down_hovered() {
        if (mouseX < width - 110 && mouseX > width + this.Fx - 190) {
            if (mouseY < 35 + this.F_size && mouseY > 55) {
                return true;
            }
        } else return false;
    }
    // first section for pollutant filter
    pollutant_first_section_hovered() {
        if (mouseX < width - 110 && mouseX > width + this.Fx - 190) {
            if (mouseY <  (this.F_size + 35) + 40 && mouseY > this.F_size + 35) {
                return true;
            }
        } else return false;
    }
    // second section for pollutant filter
    pollutant_second_section_hovered() {
        if (mouseX < width - 110 && mouseX > width + this.Fx - 190) {
            if (mouseY <  (this.F_size + 75) + 40 && mouseY > this.F_size + 75) {
                return true;
            }
        } else return false;
    }
    // third section for pollutant filter
    pollutant_third_section_hovered() {
        if (mouseX < width - 110 && mouseX > width + this.Fx - 190) {
            if (mouseY <  (this.F_size + 115) + 40 && mouseY > this.F_size + 115) {
                return true;
            }
        } else return false;
    }
    // fourth section for pollutant filter
    pollutant_fourth_section_hovered() {
        if (mouseX < width - 110 && mouseX > width + this.Fx - 190) {
            if (mouseY <  (this.F_size + 155) + 40 && mouseY > this.F_size + 155) {
                return true;
            }
        } else return false;
    }
    // fifth section for pollutant filter
    pollutant_fifth_section_hovered() {
        if (mouseX < width - 110 && mouseX > width + this.Fx - 190) {
            if (mouseY <  (this.F_size + 195) + 40 && mouseY > this.F_size + 195) {
                return true;
            }
        } else return false;
    }
    // sixth section for pollutant filter
    pollutant_sixth_section_hovered() {
        if (mouseX < width - 110 && mouseX > width + this.Fx - 190) {
            if (mouseY <  (this.F_size + 235) + 40 && mouseY > this.F_size + 235) {
                return true;
            }
        } else return false;
    }
    // the "all" section for pollutant filter
    pollutant_the_all_section_hovered() {
        if (mouseX < width - 110 && mouseX > width + this.Fx - 190) {
            if (mouseY <  (this.F_size + 275) + 40 && mouseY > this.F_size + 275) {
                return true;
            }
        } else return false;
    }

    // first section
    year_first_section_hovered() {
        if (mouseX < width - 30 && mouseX > width + this.Fx - 80) {
            if (mouseY <  (this.F_size + 35) + 40 && mouseY > this.F_size + 35) {
                return true;
            }
        } else return false;
    }
    // second section
    year_second_section_hovered() {
        if (mouseX < width - 30 && mouseX > width + this.Fx - 80) {
            if (mouseY <  (this.F_size + 75) + 40 && mouseY > this.F_size + 75) {
                return true;
            }
        } else return false;
    }
    // third section
    year_third_section_hovered() {
        if (mouseX < width - 30 && mouseX > width + this.Fx - 80) {
            if (mouseY <  (this.F_size + 115) + 40 && mouseY > this.F_size + 115) {
                return true;
            }
        } else return false;
    }
    // the all section
    year_the_all_section_hovered() {
        if (mouseX < width - 30 && mouseX > width + this.Fx - 80) {
            if (mouseY <  (this.F_size + 155) + 40 && mouseY > this.F_size + 155) {
                return true;
            }
        } else return false;
    }

    // filter button
    filter_hovered() {                       // (-20)
        if (mouseX < width && mouseX > (width + this.Fx)) {
            if (mouseY < this.Fy + this.F_size && mouseY > this.Fy) {
                return true;
            }
        } else return false;
    }

    // checkboxes
    checkBox1_hovered() {
        if (mouseX < (width / 2 + this.cBoxX) + this.cBox_size && 
            mouseX > (width / 2 + this.cBoxX) - this.cBox_size) {
            if (mouseY < (height / 2 + this.cBoxY) + this.cBox_size && 
                mouseY > (height / 2 + this.cBoxY) - this.cBox_size / 2) {
                return true;
            }
        } else return false;
    }
    checkBox2_hovered() {
        if (mouseX < (width / 2 + this.cBoxX) + this.cBox_size && 
            mouseX > (width / 2 + this.cBoxX) - this.cBox_size) {
            if (mouseY < (height / 2 + this.cBoxY + 20) + this.cBox_size && 
                mouseY > (height / 2 + this.cBoxY + 20) - this.cBox_size / 2) {
                return true;
            }
        } else return false;
    }
    checkBox3_hovered() {
        if (mouseX < (width / 2 + this.cBoxX) + this.cBox_size && 
            mouseX > (width / 2 + this.cBoxX) - this.cBox_size) {
            if (mouseY < (height / 2 + this.cBoxY + 40) + this.cBox_size && 
                mouseY > (height / 2 + this.cBoxY + 40) - this.cBox_size / 2) {
                return true;
            }
        } else return false;
    }
    checkBox4_hovered() {
        if (mouseX < (width / 2 + this.cBoxX) + this.cBox_size && 
            mouseX > (width / 2 + this.cBoxX) - this.cBox_size) {
            if (mouseY < (height / 2 + this.cBoxY + 60) + this.cBox_size && 
                mouseY > (height / 2 + this.cBoxY + 60) - this.cBox_size / 2) {
                return true;
            }
        } else return false;
    }
    checkBox5_hovered() {
        if (mouseX < (width / 2 + this.cBoxX) + this.cBox_size && 
            mouseX > (width / 2 + this.cBoxX) - this.cBox_size) {
            if (mouseY < (height / 2 + this.cBoxY + 80) + this.cBox_size && 
                mouseY > (height / 2 + this.cBoxY + 80) - this.cBox_size / 2) {
                return true;
            }
        } else return false;
    }
    checkBox6_hovered() {
        if (mouseX < (width / 2 + this.cBoxX) + this.cBox_size && 
            mouseX > (width / 2 + this.cBoxX) - this.cBox_size) {
            if (mouseY < (height / 2 + this.cBoxY + 100) + this.cBox_size &&
                 mouseY > (height / 2 + this.cBoxY + 100) - this.cBox_size) {
                return true;
            }
        } else return false;
    }
    // end of checkboxes

// this.submitX - 100, this.submitY - 20
    // submit button
    submit_hovered() {
        if (!mobile) {
            if (mouseX < (width / 2 + this.submitX) + this.submitW / 2 && 
                mouseX > (width / 2 + this.submitX) - this.submitW / 2) {
                if (mouseY < (height / 2 + this.submitY) +this.submitH / 2 && 
                    mouseY > (height / 2 + this.submitY) - this.submitH / 2) {
                    return true;
                }
            } else return false;
        } else {
            if (mouseX < (width / 2 + this.submitX - 100) + this.submitW / 2 && 
                mouseX > (width / 2 + this.submitX - 100) - this.submitW / 2) {
                if (mouseY < (height / 2 + this.submitY - 20) +this.submitH / 2 && 
                    mouseY > (height / 2 + this.submitY - 20) - this.submitH / 2) {
                    return true;
                }
            } else return false;
        } 
    }

    // next, previous buttons
    prev_btn_hovered() {       // (-30 / 2)                             // (-30)
        if (mouseX < (width / 2 + this.pBtnX / 2) && mouseX > (width / 2 + this.pBtnX) - this.Btn_size / 2) {
            if (mouseY < (height / 2 + this.pBtnY) + this.Btn_size / 2 && mouseY > (height / 2 + this.pBtnY) - this.Btn_size / 2) {
                return true;
            }
        } else return false;
    }
    next_btn_hovered() {       // (30)                                                 // (30 / 2)
        if (mouseX < (width / 2 + this.nBtnX) + this.Btn_size / 2  && mouseX > (width / 2 + this.nBtnX / 2)) {
            if (mouseY < (height / 2 + this.nBtnY) + this.Btn_size / 2 && mouseY > (height / 2 + this.nBtnY) - this.Btn_size / 2) {
                return true;
            }
        } else return false;
    }
    //end of next, prev buttons

    // tabs
    L_tab_hovered() {
        if (!mobile) {
            if (mouseX < (width / 2 + this.tabX) + this.tabW / 2 && 
                mouseX > (width / 2 + this.tabX) - this.tabW / 2) {
                if (mouseY < (height / 2 + this.tabY) + this.tabH / 2 && 
                    mouseY > (height / 2 + this.tabY) - this.tabH / 2) {
                    return true;
                }
            } else return false;
        } else {
            if (mouseX < (width / 2 + this.tabX - 100) + (this.tabW - 60) / 2 && 
                mouseX > (width / 2 + this.tabX - 100) - (this.tabW - 60) / 2) {
                if (mouseY < (height / 2 + this.tabY) + this.tabH / 2 && 
                    mouseY > (height / 2 + this.tabY) - this.tabH / 2) {
                    return true;
                }
            } else return false;
        }
    }
    M_tab_hovered() {
        if (!mobile) {
            if (mouseX < (width / 2 + this.tabX + this.tabW) + (this.tabW) / 2 && 
                mouseX > (width / 2 + this.tabX + this.tabW) - (this.tabW) / 2) {
                if (mouseY < (height / 2 + this.tabY) + this.tabH / 2 &&
                    mouseY > (height / 2 + this.tabY) - this.tabH / 2) {
                    return true;
                }
            } else return false;
        } else {
            if (mouseX < (width / 2 + this.tabX + this.tabW - 160) + (this.tabW - 60) / 2 && 
                mouseX > (width / 2 + this.tabX + this.tabW - 160) - (this.tabW - 60) / 2) {
                if (mouseY < (height / 2 + this.tabY) + this.tabH / 2 &&
                    mouseY > (height / 2 + this.tabY) - this.tabH / 2) {
                    return true;
                }
            } else return false;
        }
    }
    R_tab_hovered() {
        if (!mobile) {
            if (mouseX < (width / 2 + this.tabX + this.tabW * 2) + (this.tabW) / 2 && 
                mouseX > (width / 2 + this.tabX + this.tabW * 2) - (this.tabW)) {
                if (mouseY < (height / 2 + this.tabY) + this.tabH / 2 && 
                    mouseY > (height / 2 + this.tabY) - this.tabH / 2) {
                    return true;
                }
            } else return false;
        } else {
            if (mouseX < (width / 2 + this.tabX + this.tabW * 2 - 220) + (this.tabW - 60) / 2 && 
                mouseX > (width / 2 + this.tabX + this.tabW * 2 - 220) - (this.tabW - 60)) {
                if (mouseY < (height / 2 + this.tabY) + this.tabH / 2 && 
                    mouseY > (height / 2 + this.tabY) - this.tabH / 2) {
                    return true;
                }
            } else return false;
        }
        
    }
    // end of tabs

    hoveredCloseInfo() {
        if (!mobile) {
            let d1 = dist(mouseX, mouseY, width / 2 + width / 4, height / 2 - height / 4);
            if (d1 < 25) {
                return true;
            } else return false;
        } else {
            let d1 = dist(mouseX, mouseY, width / 2 + width / 4 + 70, height / 2 - height / 4);
            if (d1 < 25) {
                return true;
            } else return false;
        }
        
    }

    R_btn_hovered() {
        // check collision with right button
        if (mouseX < (this.wRect + this.xRect / 4) + this.wRect / 6 && 
            mouseX > (this.wRect + this.xRect / 4) - this.wRect / 6) {
                if (mouseY < (this.yRect + this.hRect / 4) &&
                    mouseY > (this.yRect - this.hRect / 4)) {
                        return true;
                    }
            } else return false;
    }
    L_btn_hovered() {
        // check collision with left button
        if (mouseX < (this.wRect - this.xRect / 4) + this.wRect / 6 && 
            mouseX > (this.wRect - this.xRect / 4) - this.wRect / 6) {
                if (mouseY < (this.yRect + this.hRect / 4) &&
                    mouseY > (this.yRect - this.hRect / 4)) {
                        return true;
                    }
            } else return false;
    }

    hovered() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.d / 2) {
            return true;
        } else return false;
    }

    // spaceship button
    clicked() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.d / 2) {
            return true;
        } else return false;
    }
    move() {
        this.speed += 2;
    }

    moveBack() {
        this.speed -= 2;
    }

    update() {
        this.y += this.speed;
        this.yRect += this.speed;
    }

    boundary() {
        if (movingForward) {
            if (this.y + this.d / 2 > height / 4) {
                return true;
            } else return false;
        } else if (movingBackward) {
            if (this.y - this.d / 2 < 0) {
                return true;
            } else return false;
        }
        
    }
}
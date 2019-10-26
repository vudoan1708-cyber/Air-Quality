class Legend {
    constructor() {
        this.w = 200;
        this.h = 170;
        this.size = 15;
        this.x = 0;
        this.y = height - this.h;
    }
    show() {
        push();
            noStroke();
            fill(255, 220);
            rect(this.x, this.y, this.w, this.h);
        pop();
    }

    showDescription() {
        // text
        push();
            fill(0);
            textAlign(RIGHT);
            text("O3", this.x + this.w - 10, this.y + 35); // O3
            text("SO2", this.x + this.w - 10, this.y + 60); // SO2
            text("NO2", this.x + this.w - 10, this.y + 85); // NO2
            text("CO", this.x + this.w - 10, this.y + 110); // CO
            text("PM10", this.x + this.w - 10, this.y + 135); // PM10
            text("PM2.5", this.x + this.w - 10, this.y + 160); // PM2.5
        pop();

        // colour code
        push();
            rectMode(CENTER);
            textAlign(CENTER);
            fill(255, 0, 200, 50); // purple-ish
            rect(this.x + 20, this.y + 30, this.size, this.size); // O3
            fill(0, 100, 200, 50); // blue-ish
            rect(this.x + 20, this.y + 55, this.size, this.size); // SO2
            fill(100, 200, 100, 50); // green-ish
            rect(this.x + 20, this.y + 80, this.size, this.size) // NO2
            fill(100, 50); // gray
            rect(this.x + 20, this.y + 105, this.size, this.size) // CO
            fill(255, 187, 15, 50); // orange-ish
            rect(this.x + 20, this.y + 130, this.size, this.size) // PM10
            fill(255, 0, 0, 50); // red
            rect(this.x + 20, this.y + 155, this.size, this.size) // PM2.5

            fill(255, 0, 200); // purple-ish
            rect(this.x + 120, this.y + 30, this.size, this.size); // O3
            fill(0, 100, 200); // blue-ish
            rect(this.x + 120, this.y + 55, this.size, this.size); // SO2
            fill(100, 200, 100); // green-ish
            rect(this.x + 120, this.y + 80, this.size, this.size) // NO2
            fill(100); // gray
            rect(this.x + 120, this.y + 105, this.size, this.size) // CO
            fill(255, 187, 15); // orange-ish
            rect(this.x + 120, this.y + 130, this.size, this.size) // PM10
            fill(255, 0, 0); // red
            rect(this.x + 120, this.y + 155, this.size, this.size) // PM2.5
            
            // dashed line
            for (let j = 30; j < 180; j += 25) {
                for (let i = 40; i < 100; i += 10) {
                    stroke(0);
                    line(this.x + i, this.y + j, this.x + i + 5, this.y + j);
                }
            }
            
            // 0% - 100% texts filled with red
            text("0%", this.x + 20, this.y + 15);
            text("100%", this.x + 120, this.y + 15);
        pop();
    }
}
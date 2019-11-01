p5.disableFriendlyErrors = true; // disables FES

let airData;
let countries;

let legend;
let spaceship;

let loading = true; // loading screen 
let mapEntered = false; // for mobile detection
let getLocation = false; // trigger geolocation
let waitMessage = false; // wait time before a location is marked
let movingForward = false; // for kepping track of the spaceship-like button movement
let movingBackward = false; // for kepping track of the spaceship-like button movement
let infoBtn_clicked = false; // information btn
let mobile = false; // for mobile

let chosenBx1 = false;
let chosenBx2 = false;
let chosenBx3 = false;
let chosenBx4 = false;
let chosenBx5 = false;
let chosenBx6 = false;
let filterMode = false;
let isSubmitted = false;
let menuDropped = false;
let pollutant_menuDropped = false;
let reSize = false; // for responding to the logged data

let mediaCounter = 0;
let numOfMedia = 3;
let frames = 160;

let btn_activated = 1; // for keeping track of the appearance of all the tabs, buttons...
let clickCnt = 0;   // for keeping track of number of time the menu button (spaceship) is pressed
let timeCount = 0; // time count till the submitted notification disappear
let yearsSelection = 1; // for keeping track of selected years
let pollutantSelection = 0;
let angle = 0; // for visualising the data

// let subCount = 0; // for counting submitting time
let animTime = 0; // for animation
let totalSub = 0;
let COCnt = 0;
let O3Cnt = 0;
let NO2Cnt = 0;
let SO2Cnt = 0;
let PM10Cnt = 0;
let PM25Cnt = 0;

let country; // check each country
let pollutant; // check all pollutants in each country
let val; // check their values
let unit; // check their unit
let latest; // check updates
let years; // check the years

let mappedVal_alpha; // represents the intensity
let diameter; // calculate the area of circles relatively to zoom levels
let latlon;

let mappedScl;
let mappedAlpha;

let pollutants = [];

let referenceText_CO = ["CARBON MONOXIDE (CO) is a colorless, odorless, and tasteless flammable gas that is slightly less dense than air.", // 0
    "In the atmosphere, it is spatially variable and short lived, having a role in the formation of ground-level ozone.", // 1
    "Source:", // 2
    "1. When operating a stove or an internal combustion engine in an enclosed space", // 3
    "2. Coal gas", // 4
    "3. Iron smelting", // 5
    "4. Other natural sources of CO include volcanoes, forest fires, other forms of combustion,", // 6
    "and carbon monoxide-releasing molecules", // 7
    "The most common symptoms of carbon monoxide poisoning are:", // 8
    "1. Headache", // 9
    "2. Nausea", // 10
    "3. Vomitting", // 11
    "4. Fatigue", // 12
    "https://en.wikipedia.org/wiki/Carbon_monoxide"
]; // 13

let referenceText_O3 = ["OZONE, or trioxygen (O3), is an inorganic molecule with the chemical formula O3. It is a pale blue gas with a", // 0
    "distinctively pungent smell.", // 1
    "Ozone is formed from dioxygen by the action of ultraviolet light (UV) and electrical discharges within the Earth's", // 2
    "atmosphere.", // 3
    "Because ozone is gas, it causes direct and immediate harmful changes to the lungs and the entire respiratory system", // 4
    "These changes lead to:", // 5
    "1. Shortness of breath", // 6
    "2. Wheezing", // 7
    "3. Asthma", // 8
    "4. Chronic obstructive pulmonary disease (COPD)", // 9
    "https://en.wikipedia.org/wiki/Ozone"
]; // 10

let referenceText_SO2 = ["Sulfur dioxide (SO2), is a toxic gas responsible for the smell of burnt matches. It is released naturally by", // 0
    "volcanic activity, and is produced as a by-product of copper extraction and the burning of fossil fuels contaminated", // 1
    "with sulfur compounds at power plant and other industrial facilities", // 2
    "The existence of SO2 can lead to increased respiratory symptoms and disease:", // 3
    "1. Difficulty in breathing", // 4
    "2. Wheezing", // 5
    "3. Premature death", // 6
    "Or affects those who suffer asthma within the ingestion progress", // 7
    "https://en.wikipedia.org/wiki/Sulfur_dioxide"
]; // 8

let referenceText_NO2 = ["Nitrogen dioxide (NO2), is an intermediate in the industrial synthesis of nitric acid, millions of tons of", // 0
    "which are produced each year which is used primarily in the production of fertilizers.", // 1
    " At higher temperatures it is a reddish-brown gas that has a characteristic sharp, biting odor and is a prominent air", // 2
    "pollutant.", // 3
    "Source:", // 4
    "NO2 is introduced into the environment by natural causes:", // 5
    "1. Entry from the stratosphere", // 6
    "2. Bacterial respiration", // 7
    "3. Volcanos", // 8
    "4. Lightning", // 9
    "Human - caused:", // 10
    "1. Internal combustion engines burning fossil fuels", // 11
    "2. Result of traffic from motor vehicles", // 12
    "3. Cigarette smoke", // 13
    "4. Gas stoves or heating (indoor household facilities)", // 14
    "Chronic exposure to NO2 can cause:", // 15
    "1. Airway inflammation", // 16
    "2. Creates OZONE which causes eye irritation and exacerbates respiratory conditions", // 17
    "3. Asthma", // 18
    "https://en.wikipedia.org/wiki/Nitrogen_dioxide" // 19
];

let referenceText_PM10 = ["Particulates – also known as atmospheric aerosol particles, atmospheric particulate matter, particulate matter (PM),", // 0
    "or suspended particulate matter (SPM) – are microscopic solid or liquid matter suspended in the air.", // 1
    "PM10 is particulate matter 10 micrometers or less in diameter", // 2
    "Particulates are the most harmful form of air pollution due to their ability to penetrate deep into the lungs and", // 3
    "blood streams unfiltered", // 4
    "which can lead to:", // 5
    "1. Heart attacks", // 6
    "2. Respiratory disease", // 7
    "3. Premature death", // 8
    "Overall, ambient particulate matter ranks as the sixth leading risk factor for premature death globally.", // 9
    "https://en.wikipedia.org/wiki/Particulates"
]; // 10

let referenceText_PM25 = ["As particulate matter (PM), PM2.5 has no more surprises other than the fact that it's much finer", // 0
    "( 2.5 micrometers or less in diameter) than PM10, and therefore, poses the greatest health risk.", // 1
    "By way of comparison, a human hair is about 100 micrometres, so roughly 40 fine particles could be placed on its", // 2
    "width.", // 3
    "Source:", // 4
    "1. Combustion source", // 5
    "2. Re-entrained dust: Dust kicked up from a roadway surface", // 6
    "3.  Directly emitted from the tailpipes of cars, trucks and other on-road vehicles", // 7
    "4. Created by secondary formation from precursor emissions such as sulfur dioxide (SO2), nitrogen oxides (NOx),...", // 8
    "https://www3.epa.gov/ttnchie1/conference/ei13/mobile/hodan.pdf", // 9
];

let aboutText = ["By obtaning an open API from openaq.org, this website showcases air quality from over 600 cities", // 0
    "around the world by aggregating all data from sensors in a city to one value.", // 1
    'As an API holder, it is believed that all data "must be from measurements averaged between 10 minutes and 24 hours"', // 2
    'and is claimed as "real-time data" by openaq.org. However, due to limit of data storage, there will be very slow updates', // 3
    "in certain countries and real-time updates in others", // 4
    "Data collected must be one of these pollutant types: CO, O3, SO2, NO2, PM10 and PM2.5", // 5
    "and from an official-level stationary, it is not including any data from low-cost, temporary,", // 6
    "or indoor sensors", // 7
    "For more information about licencing and data disclaimer, please visit the website:", // 8
    "https://medium.com/@openaq/where-does-openaq-data-come-from-a5cf9f3a5c85" // 9
];

let submitText = ["What types of pollutant do you think you can help reducing everyday:", // 0
    "CO", // 1
    "O3", // 2
    "SO2", // 3
    "NO2", // 4
    "PM10", // 5
    "PM2.5" // 6
];

// Options for map
const options = {
    lat: 20,
    lng: 9,
    zoom: 3.25,
    style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}


// Create an instance of Leaflet
const mappa = new Mappa('Leaflet');
let myMap;
let canvas;

//img
let questionMrk;
let earthImg;


// function MediaLoader() {
//     mediaCounter++;
//     if (mediaCounter == numOfMedia) {
//         if (loading < 2) {
//             loading++;
//         }
//     }
// }

function preload() {
    //     airData = loadJSON('json/aq.json');
    countries = loadJSON('json/countries/countries.json');
    questionMrk = loadImage('assets/img/question.png');
    earthImg = loadImage('assets/img/earth.png');
}

function setup() {
    // Create canvas
    canvas = createCanvas(window.innerWidth, window.innerHeight).parent("mapID");

    frameRate(frames);
    angleMode(DEGREES);

    // Create a tile map and overlay the canvas on top.
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);

    // classes
    legend = new Legend();
    spaceship = new Spaceship();

    // text fixed setup
    textSize(15);
    textFont("Georgia");

    clear(); // transparent background
    getAQ()
        .then(aq => {
            airData = aq;
            loading = false;
        })
        .catch(err => {
            console.log(err);
        });

}

function draw() {
    // to update bubbles on the map

    if (loading) {
        mappedScl = map(sin(frameCount) * 9, -1, 1, 0.15, 1);
        background(0, 250);
        push();
            rectMode(CENTER);
            push();
            fill(255, 0, 0, 200);
            translate(width / 2, height / 2);
            rotate(45);
            scale(mappedScl, mappedScl);
            rect(0, 0, 100, 100);
            pop();

            push();
            fill(0, 255, 0, 200);
            translate(width / 2 - 200, height / 2);
            rotate(45);
            scale(mappedScl, mappedScl);
            rect(0, 0, 100, 100);
            pop();

            push();
            fill(0, 0, 255, 200);
            translate(width / 2 + 200, height / 2);
            rotate(45);
            scale(mappedScl, mappedScl);
            rect(0, 0, 100, 100);
            pop();
        pop();
    } else {
        enterTheMap(); // for checking electronic devices
        if (mapEntered) {
            clear(); // transparent background
            airVisualisation();
            
            mappedAlpha = map(animTime, 0, 15, 255, 0);
            if (waitMessage) { // wait message before geolocation starts
                if (animTime <= 14) {
                  animTime++;
                } else {
                  animTime = 0;
                  waitMessage = false;
                }
                push();
                  fill(0, mappedAlpha);
                  rectMode(CENTER);
                  rect(width / 2, height / 2, 200, 50);
                  fill(255, mappedAlpha);
                  textAlign(CENTER);
                  textSize(20);
                  text("Just a sec...", width / 2 + 10, height / 2 + 40, 200, 100);
                pop();
              } 
        }
    }
}

function windowResized(){
    resizeCanvas(window.innerWidth, window.innerHeight);
}

// for checking electronic devices
function enterTheMap() {
    let d = dist(mouseX, mouseY, width / 2, height / 2);
    push();
        translate(width / 2, height / 2);
        fill(0);
        noStroke();
        rectMode(CENTER);
        rect(0, 0, width, height);
        if (d < 200) {
            fill(0, 100);
            ellipse(0, 0, 250);

            fill(255, 0, 0, 150);
            // ellipse(0, 0, 400);
            imageMode(CENTER);
            image(earthImg, 0, 0, 400, 400);
            stroke(0);
            strokeWeight(20);
            textSize(40);
            textAlign(CENTER);
            text("ENTER THE MAP", 0, 0);
        } else {
            fill(255, 150);
            // ellipse(0, 0, 400);
            imageMode(CENTER);
            image(earthImg, 0, 0, 400, 400);
            stroke(0);
            strokeWeight(1);
            textSize(40);
            textAlign(CENTER);
            text("ENTER THE MAP", 0, 0);
        }
        
    pop();
}

function airVisualisation() {
    //console.log("2");
    for (let i = 0; i < airData.results.length; i++) { // loop through every index of result 
        for (let p = 0; p < airData.results[i].measurements.length; p++) { // loop through the measurement section in every result
            country = airData.results[i].country.toLowerCase(); // check each country
            city = airData.results[i].city; // check each country
            pollutant = airData.results[i].measurements[p].parameter; // check all pollutants in each country
            val = Number(airData.results[i].measurements[p].value); // check their values
            unit = airData.results[i].measurements[p].unit; // check their units
            latest = airData.results[i].measurements[p].lastUpdated.split('T'); // check current update, split the string into an array with 2 indexes
            // console.log(latest);                                                     // between letter "T"

            years = latest[0].split("-"); // split the date into years, months, days and put them into arrays (latest[0] is for the years)
            if (yearsSelection == 1) { // if it's case number 1
                if (years[0] == "2019") { // if incoming years are 2019s
                    country = country; // get the countries associated with the years
                    latlon = countries[country]; // throw them into latlon array
                } else {            // if incoming years aren't 2019s
                    country = " ";  // re-assign the variable with some random thing in the string that aren't country IDs
                    latlon = countries[country]; // throw them into the array to make the latlon array undefined
                }
            } else if (yearsSelection == 2) { // same logic
                if (years[0] == "2018") {
                    country = country;
                    latlon = countries[country];
                } else {
                    country = "Beautiful Boy";
                    latlon = countries[country];
                }
            } else if (yearsSelection == 3) { // same logic
                if (years[0] == "2017") {
                    country = country;
                    latlon = countries[country];
                } else {
                    country = "Handsome Girl";
                    latlon = countries[country];
                }
            } else latlon = countries[country]; // if it's 0, then show everything


        // filter for pollutants (same logic)
            if (pollutantSelection == 1) {
                if (pollutant == "co") {
                    country = country;
                    latlon = countries[country];
                } else {
                    country = " ";
                    latlon = countries[country];
                }
            } else if (pollutantSelection == 2) {
                if (pollutant == "o3") {
                    country = country;
                    latlon = countries[country];
                } else {
                    country = "Fried Chicken";
                    latlon = countries[country];
                }
            } else if (pollutantSelection == 3) {
                if (pollutant == "so2") {
                    country = country;
                    latlon = countries[country];
                } else {
                    country = "Pizza";
                    latlon = countries[country];
                }
            } else if (pollutantSelection == 4) {
                if (pollutant == "no2") {
                    country = country;
                    latlon = countries[country];
                } else {
                    country = "Hamburger";
                    latlon = countries[country];
                }
            } else if (pollutantSelection == 5) {
                if (pollutant == "pm10") {
                    country = country;
                    latlon = countries[country];
                } else {
                    country = "Hot Pot";
                    latlon = countries[country];
                } 
            } else if (pollutantSelection == 6) {
                if (pollutant == "pm25") {
                    country = country;
                    latlon =  countries[country];
                } else {
                    country = "Hello there!!!";
                    latlon = countries[country];
                }
            } else latlon = countries[country];

            mappedVal_alpha = map(val, -99, 900, 0, 255); // represents the intensity of pollutants
            if (reSize) {
                for (let i = 0; i < pollutants.length; i++) {
                    if (pollutants[i] == "CO") {
                        // if (pollutant == "co") {
                        diameter = sqrt(val) * myMap.zoom() * (0.9 / (i+1.075) * 0.95); // calculate the area of circles relatively to zoom levels
                    }
                    if (pollutants[i] == "O3") {
                        diameter = sqrt(val) * myMap.zoom() * (0.9 / (i+1.05) * 0.95); // calculate the area of circles relatively to zoom levels
                    }
                    if (pollutants[i] == "SO2") {
                        diameter = sqrt(val) * myMap.zoom() * (0.9 / (i+1.025) * 0.95); // calculate the area of circles relatively to zoom levels
                    }
                    if (pollutants[i] == "NO2") {
                        diameter = sqrt(val) * myMap.zoom() * (0.9 / (i+1.025) * 0.95); // calculate the area of circles relatively to zoom levels
                    }
                    if (pollutants[i] == "PM10") {
                        diameter = sqrt(val) * myMap.zoom() * (0.9 / (i+1) * 0.95); // calculate the area of circles relatively to zoom levels
                    }
                    if (pollutants[i] == "PM2.5") {
                        diameter = sqrt(val) * myMap.zoom() * (0.9 / (i+1) * 0.95); // calculate the area of circles relatively to zoom levels
                    };
                }
                // reSize = false;
            } else if (!isSubmitted) diameter = sqrt(val) * myMap.zoom();

            if (latlon) { // to check if the information is undefined or not
                let lat = latlon[0];
                let lon = latlon[1];
                let pos = myMap.latLngToPixel(lat, lon); // change from degree to pixel for lat, lon values
                if (pollutant == "o3") {
                    stroke(255, 0, 200, mappedVal_alpha); // purple-ish
                    pollutant = "Ozone (O3)";
                } else if (pollutant == "so2") {
                    stroke(0, 100, 200, mappedVal_alpha); // blue-ish
                    pollutant = "Sulfur Dioxide (SO2)";
                } else if (pollutant == "no2") {
                    stroke(100, 200, 100, mappedVal_alpha); // green-ish
                    pollutant = "Nitrogen Dioxide (NO2)";
                } else if (pollutant == "pm10") {
                    stroke(255, 187, 15, mappedVal_alpha); // orange-ish
                    pollutant = "PM10";
                } else if (pollutant == "pm25") {
                    stroke(255, 0, 0, mappedVal_alpha);
                    pollutant = "PM2.5";
                } else if (pollutant == "co") {
                    stroke(100, mappedVal_alpha);
                    pollutant = "Carbon Monoxide (CO)";
                }

                let d = dist(mouseX, mouseY, pos.x, pos.y);
                push();
                    noFill();
                    if ( d < diameter / 2) {
                        strokeWeight(3);
                    } else strokeWeight(1);
                    ellipse(pos.x, pos.y, diameter);
                    if (angle <= 360) {
                        angle += 2;
                        diameter -= 10;
                    } else angle = 0;
                    beginShape(POINTS);
                        strokeWeight(3.5);
                        let dx = cos(angle) * diameter / 2;
                        let dy = sin(angle) * diameter / 2;
                        vertex(pos.x + dx, pos.y + dy);
                        // line(pos.x, pos.y, pos.x + dx, pos.y + dy);
                    endShape(CLOSE);

                    // let angle = 0;
                    // beginShape();
                    // translate(pos.x, pos.y);
                    // for (let i = 0; i < 360; i += 26) {
                        
                    //     let x = cos(i) * diameter;
                    //     let y = sin(i) * diameter;
                    //     // if (val < 100) {
                    //     //   strokeWeight(1);
                    //     // } else strokeWeight(3);
                    //     // vertex(x, y);
                    //     rotate(angle);
                    //     line(0, 0, x, y);
                    //     angle += 0.01;
                        
                    // }
                    // endShape(CLOSE);
                    
                   
                    // let n = 6;
                    // let de = 71;                   
                    // strokeWeight(1);
                    // beginShape();
                    //     for (let i = 0; i < 360; i++) {
                    //     let k = i * de;
                    //     let r = sin(n*k) * diameter;
                    //     let x = cos(k) * r;
                    //     let y = sin(k) * r;
                    //     vertex(x + pos.x, y + pos.y);
                    //     }
                    // endShape(CLOSE);
                    

                    // for (let a = 0; a <= 360; a++) {
                    //     let dx = cos(a) * diameter / 2;
                    //     let dy = sin(a) * diameter / 2;
                    //     beginShape();
                    //         strokeWeight(2);
                    //         vertex(pos.x + dx, pos.y + dy);
                    //     endShape(CLOSE);
                    // }
                pop();
                if (d < diameter / 2) {
                    // console.log("HOVERED");
                    push();
                        strokeWeight(2);
                        rectMode(CENTER);
                        fill(255);
                        rect(pos.x - 150, pos.y - 50, 250, 120);
                        fill(0, 220);
                        textAlign(CENTER);
                        text(country.toUpperCase(), pos.x - 150, pos.y - 40, 250, 120);
                        text(city, pos.x - 150, pos.y - 20, 250, 120);
                        text(pollutant, pos.x - 150, pos.y, 250, 120);
                        text(val + ": " + unit, pos.x - 150, pos.y + 20, 250, 120);
                        text("Latest Update: " + latest[0], pos.x - 150, pos.y + 40, 250, 120);
                    pop();
                }
            }

            // console.log(latlon);
            // console.log(pollutant);
            // console.log(country);

        }
    }
    drawLegend();

    getUserLocation();

    displaySpaceship();

    userSubmission();
}

function displaySpaceship() {
    spaceship.show(); // show the menu button (spaceship-like)
    spaceship.showFilter(); // show the filter button (question mark);
    if (movingForward) {
        spaceship.move();
        spaceship.update();
        movingBackward = false; // prevent misbehaviour movement if being clicked while spaceship is moving forwards
        if (spaceship.boundary()) { // stop the movement when reaches the boundary
            spaceship.speed = 0;
            spaceship.y = height / 4 - spaceship.d / 2;
            movingForward = false;
        }
    }
    if (movingBackward) {
        spaceship.moveBack();
        spaceship.update();
        movingForward = false; // prevent misbehaviour movement if being clicked while spaceship is moving backwards
        if (spaceship.boundary()) { // stop the movement when reaches the boundary
            spaceship.speed = 0;
            spaceship.y = spaceship.d / 2;
            movingBackward = false;
        }
    }

    // if (spaceship.filter_hovered()) {
    //     console.log("QUESTION HOVERED");
    // }

    // "more information button" hovered
    if (infoBtn_clicked) {
        spaceship.showInfo();
        spaceship.showCloseInfo();
    }
}

function drawLegend() {
    legend.show();
    legend.showDescription();
    push();
      let x;
      let y;
      if (!mobile) { // if not touchscreen devices
         x = width - width / 6 + 30;
         y = height - 25;
      } else {
         x = 20;
         y = height - 220;
      }
      fill(0, 200);
      if (!mobile) rect(width - 250, height - 200, 250, 200);
      else rect(0, height - 400, 250, 200);
      fill(255);
      if (!mobile) textSize(15);
      else textSize(10);
  
      if (reSize) { // if all the ellipses are resized, show all the texts
        text("Total Number of Submissions  " + totalSub, x, y - 150, 250, 50);
        text("Votes for CO  " + COCnt, x, y - 125, 150, 50);
        text("Votes for O3  " + O3Cnt, x, y - 100, 150, 50);
        text("Votes for NO2  " + NO2Cnt, x, y - 75, 150, 50);
        text("Votes for SO2  " + SO2Cnt, x, y - 50, 150, 50);
        text("Votes for PM10  " + PM10Cnt, x, y - 25, 150, 50);
        text("Votes for PM2.5  " + PM25Cnt, x, y, 150, 50);
      } else { // if not
          textAlign(CENTER);
          text("Submit Your Thought On \nReducing Pollutants To See Results", x - 20, y - 75, 250, 50); // show this text at the beginning
        }
    pop();
}

function touchStarted() {
    // enter the map
    if (!loading) {
        if (!mapEntered) {
            let d = dist(mouseX, mouseY, width / 2, height / 2);
            if (d < 200) {
                mapEntered = true;
                mobile = true;
                console.log("PHONE/IPAD");
            }
        }
        
    }

    if (mobile) {
        // only count up when the mennu button (spaceship) is clicked
        if (spaceship.clicked()) {
            clickCnt++;
            filterMode = false;
            // console.log(clickCnt);
        }

        // if spaceship is clicked once, it moves forwards
        if (clickCnt == 1) {
            if (spaceship.clicked()) {
                // console.log("movingForward");
                movingForward = true;
            }
        } else if (clickCnt == 2) { // if spaceship is clicked the second time, it moves backwards
            if (spaceship.clicked()) {
                // console.log("movingBackward");
                movingBackward = true;
            }
            clickCnt = 0;
        }
        if (!infoBtn_clicked) { // the filter btn can be clicked if the information board is not showing 
            // when filter button is clicked
            if (spaceship.filter_hovered()) {
                // console.log("QUESTION CLICKED");
                if (!filterMode) {
                    filterMode = true;
                } else {
                    filterMode = false; // de-select/close the filter mode
                    menuDropped = false; // close the year drop-down menu
                    pollutant_menuDropped = false; // close the pollutant drop down menu
                    animTime = 0;
                }
            }
        }
        
        if (filterMode) {
            if (clickCnt == 1) { // to close the spaceship-looking menu
                movingBackward = true;
                clickCnt = 0;
            }
            if (spaceship.drop_down_hovered()) {
                // console.log("DROP DOWN MENU");
                if (!menuDropped) {
                    menuDropped = true;
                } else menuDropped = false;
            }
            if (spaceship.pollutant_drop_down_hovered()) {
                // console.log("CLICKED");
                if (!pollutant_menuDropped) {
                    pollutant_menuDropped = true;
                } else pollutant_menuDropped = false;
            }

            if (menuDropped) {
                if (spaceship.year_first_section_hovered()) {
                    yearsSelection = 1;
                    menuDropped = false;
                    // console.log("1st");
                } else if (spaceship.year_second_section_hovered()) {
                    yearsSelection = 2;
                    menuDropped = false;
                    // console.log("2nd");
                } else if (spaceship.year_third_section_hovered()) {
                    yearsSelection = 3;
                    menuDropped = false;
                    // console.log("3rd");
                } else if (spaceship.year_the_all_section_hovered()) {
                    yearsSelection = 0;
                    menuDropped = false;
                    // console.log("All");
                }
            }
            if (pollutant_menuDropped) {
                if (spaceship.pollutant_first_section_hovered()) {
                    pollutantSelection = 1;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_second_section_hovered()) {
                    pollutantSelection = 2;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_third_section_hovered()) {
                    pollutantSelection = 3;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_fourth_section_hovered()) {
                    pollutantSelection = 4;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_fifth_section_hovered()) {
                    pollutantSelection = 5;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_sixth_section_hovered()) {
                    pollutantSelection = 6;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_the_all_section_hovered()) {
                    pollutantSelection = 0;
                    pollutant_menuDropped = false;
                }
            }
        }

        // click buttons
        if (spaceship.L_btn_hovered()) {
            // console.log("CLICKED");
            if (clickCnt == 1) {
                movingBackward = true;
                clickCnt = 0;
            }
            getLocation = true;
        }
        if (spaceship.R_btn_hovered()) {
            // console.log(btn_activated);
            infoBtn_clicked = true;
        }
        if (infoBtn_clicked) {
            if (spaceship.hoveredCloseInfo()) {
                // console.log("EXIT");
                // if close "information button", reset everything
                infoBtn_clicked = false;
                animTime = 0;
                btn_activated = 1;
                chosenBx1 = false;
                chosenBx2 = false;
                chosenBx3 = false;
                chosenBx4 = false;
                chosenBx5 = false;
                chosenBx6 = false;
            }
            if (spaceship.L_tab_hovered()) {
                // console.log("L" + btn_activated);
                btn_activated = 1;
            } else if (spaceship.M_tab_hovered()) {
                // console.log("M" + btn_activated);
                btn_activated = 7;
            } else if (spaceship.R_tab_hovered()) {
                // console.log("R" + btn_activated);
                btn_activated = 8;
            }

            // checkboxes 
            if (spaceship.checkBox1_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx1) {
                    chosenBx1 = true;
                    pollutant = "CO";
                    pollutants.push(pollutant); // push into array
                } else if (chosenBx1) { //de-select checkboxes
                    chosenBx1 = false;
                    pollutants.pop(pollutant); // pop out of array
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox2_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx2) {
                    chosenBx2 = true;
                    pollutant = "O3";
                    pollutants.push(pollutant);
                } else if (chosenBx2) {
                    chosenBx2 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox3_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx3) {
                    chosenBx3 = true;
                    pollutant = "SO2";
                    pollutants.push(pollutant);
                } else if (chosenBx3) {
                    chosenBx3 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox4_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx4) {
                    chosenBx4 = true;
                    pollutant = "NO2";
                    pollutants.push(pollutant);
                } else if (chosenBx4) {
                    chosenBx4 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox5_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx5) {
                    chosenBx5 = true;
                    pollutant = "PM10";
                    pollutants.push(pollutant);
                } else if (chosenBx5) {
                    chosenBx5 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox6_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx6) {
                    chosenBx6 = true;
                    pollutant = "PM2.5";
                    pollutants.push(pollutant);
                } else if (chosenBx6) {
                    chosenBx6 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }

            // if submit button is clicked
            if (spaceship.submit_hovered()) {
                // console.log("SUBMITTED");
                // subCount++;
                if (chosenBx1 || chosenBx2 || chosenBx3 || chosenBx4 ||
                    chosenBx5 || chosenBx6) { // if one or more checkboxes are chosen, submit button then, clickable
                        isSubmitted = true; // submit
                        chosenBx1 = false; // de-select everything
                        chosenBx2 = false;
                        chosenBx3 = false;
                        chosenBx4 = false;
                        chosenBx5 = false;
                        chosenBx6 = false; 
                        infoBtn_clicked = false; // close the information menu
                        animTime = 0;
                        btn_activated = 1;
                        if (clickCnt == 1) {
                            movingBackward = true;
                            clickCnt = 0;
                        }
                    }
            }

            // next, previous buttons
            if (btn_activated > 1 && btn_activated < 7) { // between 2 and 6
                if (spaceship.prev_btn_hovered()) {
                    // console.log(btn_activated);

                    btn_activated--; // clickable (cannot click if it is 0 and below or 7 and above)
                }
            }
            if (btn_activated > 0 && btn_activated < 6) { // between 1 and 5
                if (spaceship.next_btn_hovered()) {
                    // console.log(btn_activated);
                    btn_activated++; // clickable (cannot click if it is 0 and below or 6 and above)
                }
            }
        }
    }
}

function mousePressed() {
    // enter the map
    if (!loading) {
        if (!mapEntered) {
            let d = dist(mouseX, mouseY, width / 2, height / 2);
            if (d < 200) {
                mapEntered = true;
                mobile = false;
                console.log("LAPTOP/COMPUTER");
            }
        }
        
    }

    if (!mobile) {
        // only count up when the mennu button (spaceship) is clicked
        if (spaceship.clicked()) {
            clickCnt++;
            filterMode = false;
            // console.log(clickCnt);
        }

        // if spaceship is clicked once, it moves forwards
        if (clickCnt == 1) {
            if (spaceship.clicked()) {
                // console.log("movingForward");
                movingForward = true;
            }
        } else if (clickCnt == 2) { // if spaceship is clicked the second time, it moves backwards
            if (spaceship.clicked()) {
                // console.log("movingBackward");
                movingBackward = true;
            }
            clickCnt = 0;
        }
        if (!infoBtn_clicked) { // the filter btn can be clicked if the information board is not showing 
            // when filter button is clicked
            if (spaceship.filter_hovered()) {
                // console.log("QUESTION CLICKED");
                if (!filterMode) {
                    filterMode = true;
                } else {
                    filterMode = false; // de-select/close the filter mode
                    menuDropped = false; // close the year drop-down menu
                    pollutant_menuDropped = false; // close the pollutant drop down menu
                    animTime = 0;
                }
            }
        }
        
        if (filterMode) {
            if (clickCnt == 1) { // to close the spaceship-looking menu
                movingBackward = true;
                clickCnt = 0;
            }
            if (spaceship.drop_down_hovered()) {
                // console.log("DROP DOWN MENU");
                if (!menuDropped) {
                    menuDropped = true;
                } else menuDropped = false;
            }
            if (spaceship.pollutant_drop_down_hovered()) {
                // console.log("CLICKED");
                if (!pollutant_menuDropped) {
                    pollutant_menuDropped = true;
                } else pollutant_menuDropped = false;
            }

            if (menuDropped) {
                if (spaceship.year_first_section_hovered()) {
                    yearsSelection = 1;
                    menuDropped = false;
                    // console.log("1st");
                } else if (spaceship.year_second_section_hovered()) {
                    yearsSelection = 2;
                    menuDropped = false;
                    // console.log("2nd");
                } else if (spaceship.year_third_section_hovered()) {
                    yearsSelection = 3;
                    menuDropped = false;
                    // console.log("3rd");
                } else if (spaceship.year_the_all_section_hovered()) {
                    yearsSelection = 0;
                    menuDropped = false;
                    // console.log("All");
                }
            }
            if (pollutant_menuDropped) {
                if (spaceship.pollutant_first_section_hovered()) {
                    pollutantSelection = 1;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_second_section_hovered()) {
                    pollutantSelection = 2;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_third_section_hovered()) {
                    pollutantSelection = 3;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_fourth_section_hovered()) {
                    pollutantSelection = 4;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_fifth_section_hovered()) {
                    pollutantSelection = 5;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_sixth_section_hovered()) {
                    pollutantSelection = 6;
                    pollutant_menuDropped = false;
                } else if (spaceship.pollutant_the_all_section_hovered()) {
                    pollutantSelection = 0;
                    pollutant_menuDropped = false;
                }
            }
        }

        // click buttons
        if (spaceship.L_btn_hovered()) {
            // console.log("CLICKED");
            if (clickCnt == 1) {
                movingBackward = true;
                clickCnt = 0;
            }
            getLocation = true;
        }
        if (spaceship.R_btn_hovered()) {
            // console.log(btn_activated);
            infoBtn_clicked = true;
        }
        if (infoBtn_clicked) {
            if (spaceship.hoveredCloseInfo()) {
                // console.log("EXIT");
                // if close "information button", reset everything
                infoBtn_clicked = false;
                animTime = 0;
                btn_activated = 1;
                chosenBx1 = false;
                chosenBx2 = false;
                chosenBx3 = false;
                chosenBx4 = false;
                chosenBx5 = false;
                chosenBx6 = false;
            }
            if (spaceship.L_tab_hovered()) {
                // console.log("L" + btn_activated);
                btn_activated = 1;
            } else if (spaceship.M_tab_hovered()) {
                // console.log("M" + btn_activated);
                btn_activated = 7;
            } else if (spaceship.R_tab_hovered()) {
                // console.log("R" + btn_activated);
                btn_activated = 8;
            }

            // checkboxes 
            if (spaceship.checkBox1_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx1) {
                    chosenBx1 = true;
                    pollutant = "CO";
                    pollutants.push(pollutant); // push into array
                } else if (chosenBx1) { //de-select checkboxes
                    chosenBx1 = false;
                    pollutants.pop(pollutant); // pop out of array
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox2_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx2) {
                    chosenBx2 = true;
                    pollutant = "O3";
                    pollutants.push(pollutant);
                } else if (chosenBx2) {
                    chosenBx2 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox3_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx3) {
                    chosenBx3 = true;
                    pollutant = "SO2";
                    pollutants.push(pollutant);
                } else if (chosenBx3) {
                    chosenBx3 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox4_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx4) {
                    chosenBx4 = true;
                    pollutant = "NO2";
                    pollutants.push(pollutant);
                } else if (chosenBx4) {
                    chosenBx4 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox5_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx5) {
                    chosenBx5 = true;
                    pollutant = "PM10";
                    pollutants.push(pollutant);
                } else if (chosenBx5) {
                    chosenBx5 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }
            if (spaceship.checkBox6_hovered()) {
                // console.log("CHECKBOX HOVERED");
                if (!chosenBx6) {
                    chosenBx6 = true;
                    pollutant = "PM2.5";
                    pollutants.push(pollutant);
                } else if (chosenBx6) {
                    chosenBx6 = false;
                    pollutants.pop(pollutant);
                } else if (spaceship.hoveredCloseInfo()) {
                    pollutants.pop(pollutant); // pop out of array
                }
            }

            // if submit button is clicked
            if (spaceship.submit_hovered()) {
                // console.log("SUBMITTED");
                // subCount++;
                if (chosenBx1 || chosenBx2 || chosenBx3 || chosenBx4 ||
                    chosenBx5 || chosenBx6) { // if one or more checkboxes are chosen, submit button then, clickable
                        isSubmitted = true; // submit
                        chosenBx1 = false; // de-select everything
                        chosenBx2 = false;
                        chosenBx3 = false;
                        chosenBx4 = false;
                        chosenBx5 = false;
                        chosenBx6 = false; 
                        infoBtn_clicked = false; // close the information menu
                        animTime = 0;
                        btn_activated = 1;
                        if (clickCnt == 1) {
                            movingBackward = true;
                            clickCnt = 0;
                        }
                    }
            }

            // next, previous buttons
            if (btn_activated > 1 && btn_activated < 7) { // between 2 and 6
                if (spaceship.prev_btn_hovered()) {
                    // console.log(btn_activated);

                    btn_activated--; // clickable (cannot click if it is 0 and below or 7 and above)
                }
            }
            if (btn_activated > 0 && btn_activated < 6) { // between 1 and 5
                if (spaceship.next_btn_hovered()) {
                    // console.log(btn_activated);
                    btn_activated++; // clickable (cannot click if it is 0 and below or 6 and above)
                }
            }
        }
    }
}

// function keyPressed() {
//     if (key == "1") {
//         reSize = 1;
//         console.log("1");
//     } 
// }

async function getAQ() { // fetching api from openaq.org
    const limit_search = "1000";
    const url = `https://api.openaq.org/v1/latest?limit=${limit_search}`;
    const response = await fetch(url);
    airData = await response.json();

    // console.log(airData);
    return airData;
}

async function userSubmission() {
  
    if (isSubmitted) {
        isSubmitted = false;
        const data_counts = {pollutants};
        console.log(pollutants);
        const sub_options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data_counts)
        };
        const sub_response = await fetch("/submission", sub_options); // sending to server
        const sub_json = await sub_response.json(); // make the response from server into an object

        console.log(sub_json);
      
        for (let i = 0; i < sub_json.length; i++) { // loop through database
            totalSub = sub_json.length; // get total submission counts
            for (let j = 0; j < sub_json[i].pollutants.length; j++) {
              if (!reSize) { // if not submitted
                if (sub_json[i].pollutants[j] == "CO") COCnt++; // increment up to the variables that have the corresponding pollutant types
                else if (sub_json[i].pollutants[j] == "O3") O3Cnt++;
                else if (sub_json[i].pollutants[j] == "SO2") SO2Cnt++;
                else if (sub_json[i].pollutants[j] == "NO2") NO2Cnt++;
                else if (sub_json[i].pollutants[j] == "PM10") PM10Cnt++;
                else if (sub_json[i].pollutants[j] == "PM2.5") PM25Cnt++;
              } else {
                  if (sub_json[sub_json.length - 1].pollutants[sub_json[sub_json.length - 1].pollutants.length - 1] == "CO") COCnt++; // not going through the entire database to add everything again, but to find the latest log to add up
                  else if (sub_json[sub_json.length - 1].pollutants[sub_json[sub_json.length - 1].pollutants.length - 1] == "O3") O3Cnt++;
                  else if (sub_json[sub_json.length - 1].pollutants[sub_json[sub_json.length - 1].pollutants.length - 1] == "SO2") SO2Cnt++;
                  else if (sub_json[sub_json.length - 1].pollutants[sub_json[sub_json.length - 1].pollutants.length - 1] == "NO2") NO2Cnt++;
                  else if (sub_json[sub_json.length - 1].pollutants[sub_json[sub_json.length - 1].pollutants.length - 1] == "PM10") PM10Cnt++;
                  else if (sub_json[sub_json.length - 1].pollutants[sub_json[sub_json.length - 1].pollutants.length - 1] == "PM2.5") PM25Cnt++;
                
              }
              
            }
        }
        reSize = true;
    }
}

function getUserLocation() {
    if (getLocation) {
        waitMessage = true;
        // current logged location
        if ('geolocation' in navigator) {
            console.log("geolocation is available");
            navigator.geolocation.getCurrentPosition(async position => {
                const loglat = position.coords.latitude; // find current latitude
                const loglon = position.coords.longitude; // find current longitude
                // console.log(loglat);
                // console.log(loglon);

                const logdata = { // put into them an object
                    loglat,
                    loglon
                };
                const options = { // put that object into a bigger one that contains all the ritual options that will be sent to the server
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(logdata)
                };
                const response = await fetch("/api", options); // sending to server
                const json = await response.json(); // make the response from server into an object
                console.log(json);
                myMap.map.flyTo([json.latitude, json.longitude], 7.5); // animate perspective to the current logged position,
                // myMap.map because I'm using mappa.js, not purely leaflet.js, in order to access the base map library (Leaflet)
                // the map id has to come before .map method
                // adding marker
                const popUp = "You're currently here at a latitude of " + json.latitude + " and a longitude of " + json.longitude;
                const marker = L.marker([json.latitude, json.longitude], {opacity: 0.5})
                                        .bindPopup(popUp)
                                        .addTo(myMap.map); // myMap.map because I'm using mappa.js, not purely leaflet.js, in order to access the base map library
                                                            // the map id has to come before .map method
                marker.openPopup();
                // marker;
                
                // marker.map.setLatLng([loglat, loglon]);  
                // myMap = L.map('mapID').setView([loglat, loglon], 10);
                // rect(loglat, loglon, 200, 200);
            });
        } else console.log("geolocation is not available");
        getLocation = false; // disable immediately after being triggered on
    }
}
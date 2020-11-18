// Get all the necessary data
    // Get the json data
    async function getData () {
        let json = await fetch('http://localhost:3000/dino.json')
        .then((response) => {
            return response.json();
          })
        .catch((error) => {
            console.log(error);
          });
        return json;

    };


// Preparation of the data for the objects
    async function dinoProducer () {
        // Get json data
        let dinoData = await getData();
        // Store all species in one array
        const speciesArray = [];
        dinoData.Dinos.forEach(element => speciesArray.push(element.species));
        // Store all facts in one array
        const factsArray = [];
        dinoData.Dinos.forEach(element => factsArray.push(element.fact));
        // Store all heights in one array
        const heightArray = [];
        dinoData.Dinos.forEach(element => heightArray.push(element.height));
        // Store all weights in one array
        const weightArray = [];
        dinoData.Dinos.forEach(element => weightArray.push(element.weight));
        // Store all diets in one array
        const dietArray = [];
        dinoData.Dinos.forEach(element => dietArray.push(element.diet));
        // Return all the prepared array in an object
        let obj = {speciesArray:speciesArray, factsArray:factsArray, heightArray:heightArray, weightArray:weightArray, dietArray:dietArray};   
        return obj;
    };


// Create Dino Constructor
    function Dino (species, height, weight, diet) {
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
        this.image = 'http://localhost:3000/images/'+this.species.toLowerCase()+'.png';
    }
    // Create the Dino objects and the pigeon object 
    async function createDinos () {
        let miau = await dinoProducer();
        let allthedinos = [];
        // Iterate over the prepared array to create the single Dino objects
        for (let i=0; i<7; i++) {
        allthedinos[i] = new Dino(miau.speciesArray[i], miau.heightArray[i], miau.weightArray[i], miau.dietArray[i]);
        };
        // Use the information prepared regarding the pigeon to create the pigeon object
        let pigeon = new Dino (miau.speciesArray[7], miau.heightArray[7], miau.weightArray[7], miau.dietArray[7]);
        // Return an object with two keys, one for the dinos and one for the pigeon
        // to the key dinos, assign the array containing all the prepared dino objects
        // to the key pigeon, assign the prepared pigeon object
        return {dinos : allthedinos,
                pigeon : pigeon
            }
        };


    // Create Human Object and return it
    function createHuman() {
        // Use IIFE to get human data from form
        let person = (function () {
            let privName = '';
            let privHeightFeet = 0;
            let privHeightInches = 0;
            let privWeight = 0;
            let privDiet = '';
    
          
            function theName() {
              privName = document.getElementById("name").value;
              return privName;
            }
    
            function theFeet() {
              privHeightFeet = document.getElementById("feet").value;
              return privHeightFeet;
            }
    
            function theInches() {
              privHeightInches = document.getElementById("inches").value;
              return privHeightInches;
            }
    
            function theWeight() {
              privWeight = document.getElementById("weight").value;
              return privWeight;
            }
    
            function theDiet() {
              privDiet = document.getElementById("diet").value;
              return privDiet;
            }
        // Return human data object
            return {
              name: theName,
              feet: theFeet,
              inches: theInches,
              weight: theWeight,
              diet: theDiet,
    
            }
        })();



        let human = {
            name : person.name(),
            heightfeet : person.feet(),
            heightinches : person.inches(),
            weight : person.weight(),
            diet : person.diet(),
            image : 'http://localhost:3000/images/human.png'
        };
    return human;
    };

    // Create an Array from the results returned by the three methods comparing
    // human data to dino data
    async function produceArray() {
        // Array prepared to store the results return from the three methods
        let threemethodsresults = [];
        // Compare Human to Dino with respect to the height
        async function whoTaller() {
            let dino = await dinoProducer();
            let human = await createHuman();
            // Count how often a Dino is taller than the Human etc.
            let counttaller = 0;
            let countsmaller = 0;
            let countequal = 0;
            // iterate over the array containing all dino heights
            for (let i=0; i < dino.heightArray.length; i++) {
                // if the dino is taller than the human, increment the taller count by one
                if (dino.heightArray[i] > human.heightfeet) {
                    counttaller++;
                // if the dino is smaller than the human, increment the smaller count by one
                } else if (dino.heightArray[i] < human.heightfeet) {
                    countsmaller++;
                // or increment the equal count by one
                } else {
                    countequal++;
                };      
              };
            // Store the strings with the results of the comparison in a variable
            let heightresults = `${counttaller} dinosaurs are taller than you. ${countsmaller} dinosaurs are smaller than you. Equal size: ${countequal} dinosaurs.`
            // Return the variable
            return heightresults;
        };
        // Compare Human to Dino with respect to the weight
        async function whoHeavier() {
            let dino = await dinoProducer();
            let human = await createHuman();
            // Count how often a Dino is heavier than the Human etc.
            let countheavier = 0;
            let countlighter = 0;
            let countequalweight = 0;
            // iterate over the array containing all dino weights
            for (let i=0; i<dino.weightArray.length; i++) {
                // if the dino is heavier than the human, increment the heavier count by one
                if (dino.weightArray[i] > human.weight) {
                    countheavier++;
                // if the dino is lighter than the human, increment the lighter count by one
                } else if (dino.weightArray[i] < human.weight) {
                    countlighter++;
                // or increment the equal count by one
                } else {
                    countequalweight++;
                };      
              };
              // Store the strings with the results of the comparison in a variable
              let weightresults = `${countheavier} dinosaurs are heavier than you. ${countlighter} dinosaurs are lighter than you. Equal weight: ${countequalweight} dinosaurs.`;
              // Return the variable
              return weightresults; 

            };
            // Compare Human to Dino with respect to the diet
        async function whoDiet() {
            let dino = await dinoProducer();
            let human = await createHuman();
            // Count how many Dinos share the same diet as the human
            let countsamediet = 0;
            // iterate over the array containing all dino diets
            for (let i=0; i<dino.dietArray.length; i++) {
                // if the dino's diet is euqal to the human's diet, 
                // increment the samediet count by one
                if (dino.dietArray[i] === human.diet.toString().toLowerCase()) {
                    countsamediet++;
                };      
            };
            //// Store the string with the result of the comparison in a variable   
            let dietresult = `${countsamediet} dinosaurs enjoy the same diet as you do.`;
            //Return the variable   
            return dietresult; 
    
        };

        let arrayitemfirst = await whoTaller();
        let arrayitemsecond = await whoHeavier();
        let arrayitemthird = await whoDiet();
        threemethodsresults.push(arrayitemfirst);
        threemethodsresults.push(arrayitemsecond);
        threemethodsresults.push(arrayitemthird);
        return threemethodsresults;
    };


// The modern version of the Fisher-Yates Shuffle Algorithm
// found here: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array/6274398
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
      }


    async function createTiles() {
        // variable storing the results from the comparisons
        let comparisonresults = await produceArray();
        // variable storing the data arrays regarding the dinos
        let arraydata = await dinoProducer();
        // the pigeon fact is the last in the factsArray
        // pop it off an store it in the pigeonfact variable
        let pigeonfact = arraydata.factsArray.pop();
        // To ensure the randomeness of the displayed facts:
        // shuffle the array with the dino facts
        let shuffleddinofacts = await shuffle(arraydata.factsArray);
        // to display 7 random facts, take the first 4 random facts from the dino facts
        let fourdinofacts = shuffleddinofacts.slice(0, 4);
        // and combine with the comparison results in one array
        // shuffle again to ensure random positioning
        let randomfacts = await shuffle (comparisonresults.concat(fourdinofacts));
        // store the dino objects in dinoData
        let  dinoData = await createDinos(); 
        // store human object in humanData
        let humanData = createHuman();

        let item = [];
        // create 9 div elements
        for (let i=0; i<9; i++) {
            item[i] = document.createElement("div");
            // set the class attribute to grid-item
            item[i].setAttribute("class", "grid-item");
            // append the grid-items to the grid
            document.getElementById("grid").appendChild(item[i]);
        };
        let dinofact = [];
        let dinotext = [];
        let dinoimage = [];
        for (let i=0; i < 7; i++) {
            // create seven text nodes to display the dino species
            dinotext[i] = document.createTextNode(dinoData.dinos[i].species);
            // create seven image elements, with associated image sources
            dinoimage[i] = document.createElement("img");
            dinoimage[i].src = dinoData.dinos[i].image;
            // create seven text nodes to display the random facts
            dinofact[i] = document.createTextNode(randomfacts[i]);
            // tile 4 is permanently taken by the human and tile 5 by the pigeon
            // the other tiles will be filled with dinos
            // skip tile 4 and 5 when adding data, fill it in tile 6, 7, 8
            if (i>3){
                // add the dinofact to each relevant tile
                item[i+2].appendChild(dinofact[i]);
                // add the image to each relevant tile
                item[i+2].appendChild(dinoimage[i]);
                // add the species to each relevant tile
                item[i+2].appendChild(dinotext[i]);
            } else {
                //add data to tile 0, 1, 2, 3
                item[i].appendChild(dinofact[i])
                item[i].appendChild(dinoimage[i]);
                item[i].appendChild(dinotext[i]);
            };
            
        };
  
    // The Human Tile
        // create the image element for the human, with the asspciated source
        let humanimg = document.createElement("img");
        humanimg.src = humanData.image;
        // add the image to the tile
        item[4].appendChild(humanimg);
        // create a text node for the human's name
        var humanname = document.createTextNode(humanData.name);
        // add the name to the tile
        item[4].appendChild(humanname); 

    // The Pigeon Tile
        // create text node for the pigeon fact
        let pigeonfactDom = document.createTextNode(pigeonfact);
        // add the fact to the tile
        item[5].appendChild(pigeonfactDom);
        // create image element for the pigeon, with the associated source
        let pigeonimg = document.createElement("img");
        pigeonimg.src = dinoData.pigeon.image;
        // add image to tile
        item[5].appendChild(pigeonimg);
        // create text node to display pigeon species
        let pigeontext = document.createTextNode(dinoData.pigeon.species);
        // add pigeon to tile
        item[5].appendChild(pigeontext); 
        

    };
    // The main function, executed when the 'Compare Me' button is clicked
    function main () {
        // get the data from the form and create the human object
        createHuman();
        // let the form disappear when the button is clicked
        document.getElementById("dino-compare").style.display = "none";
        // produce array with comparison facts: human - dino
        produceArray();
        // create the tiles displaying the information
        createTiles();
    };


    // The EventListener: when the button is clicked, execute the main() function
    document.getElementById("btn").addEventListener('click', main);











    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic

   

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

    // Get the image filenames
    async function getArray () {
        let array = await fetch('http://localhost:3000/array')
        .then((response) => {
            return response.json();
          })
        .catch((error) => {
            console.log(error);
          });
        return array;

    };

        // Preparation of the data for the objects
    async function dinoProducer () {
        // Get array with image filenames
        let imagearray = await getArray();
        // console.log(imagearray);
        // Get json data
        let dinoData = await getData();
        // let dino = dinoData.Dinos[0].species;
        // console.log(dino);

        // Require the species
        const speciesArray = [];
        // dinoData.Dinos.forEach(element => console.log(element.species));
        dinoData.Dinos.forEach(element => speciesArray.push(element.species));
        // console.log(speciesArray);
        // Require the facts
        const factsArray = [];
        dinoData.Dinos.forEach(element => factsArray.push(element.fact));
        // console.log(factsArray);
        // Requireing the heights
        const heightArray = [];
        dinoData.Dinos.forEach(element => heightArray.push(element.height));
        // console.log(heightArray);
        // Require the heights
        const weightArray = [];
        dinoData.Dinos.forEach(element => weightArray.push(element.weight));
        // console.log(weightArray);
        // Require the heights
        const dietArray = [];
        dinoData.Dinos.forEach(element => dietArray.push(element.diet));
        // console.log(dietArray);
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

    async function createDinos () {
        let miau = await dinoProducer();
        // console.log('logging miiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiaaaaaaaaaaaaaaaaaaaaaaaaaaau here')
        // console.log(miau);
        // console.log(miau.speciesArray[0]);
        // Create Dino Objects
        let allthedinos = [];
        for (let i=0; i<7; i++) {
        allthedinos[i] = new Dino(miau.speciesArray[i], miau.heightArray[i], miau.weightArray[i], miau.dietArray[i]);
        };
        console.log('allthedinosarecommingin')
        console.log(allthedinos);
        let pigeon = new Dino (miau.speciesArray[7], miau.heightArray[7], miau.weightArray[7], miau.dietArray[7]);
        // if (imageFileNames.includes('pigeon.png')) {
        // pigeon.imagepng = 'pigeon.png';
        // };
        console.log('here comes the pigpigpigpigpigpigpigpigeon');
        console.log(pigeon);
        return {dinos : allthedinos,
                pigeon : pigeon
            }
        };



    // createDinos();
  
   
    
 
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

        return {
          name: theName,
          feet: theFeet,
          inches: theInches,
          weight: theWeight,
          diet: theDiet,

        }
    })();


    // Create Human Object
    // can I wrap this around the IIFE? :)
    function createHuman() {
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

    // async function Test () {
    //     console.log('carzyness**********************************************************');
    //     let veilchen = await createDinos();
    //     console.log(veilchen);
    //     console.log('die fertigen dinos');
    //     console.log(veilchen.dinos[0]);
    //     console.log('die taube');
    //     console.log(veilchen.pigeon);
    // };
    // Test();

    // Fisher-Yates Shuffle Algorithm

    // Who is taller?

    async function produceArray() {
        let magicarray = [];
        async function whoTaller() {
            let snowflake = await dinoProducer();
            let snow = await createHuman();
            console.log('snooooooooooooooooooooooooow');
            console.log(snowflake); 
            let counttaller = 0;
            let countsmaller = 0;
            let countequal = 0;
            console.log('????????????????????????????????????????????????????');
            console.log(snowflake.heightArray);
            console.log(snow.heightfeet);
            for (let i=0; i<snowflake.heightArray.length; i++) {
                if (snowflake.heightArray[i] > snow.heightfeet) {
                    counttaller++;
                } else if (snowflake.heightArray[i] < snow.heightfeet) {
                    countsmaller++;
                } else {
                    countequal++;
                };      
              };
         
            let bumblebee = `${counttaller} dinosaurs are taller than you. ${countsmaller} dinosaurs are smaller than you. Equal size: ${countequal} dinosaurs.`
            return bumblebee;
        };

        async function whoHeavier() {
            let snowflake = await dinoProducer();
            let snow = await createHuman();
            let countheavier = 0;
            let countlighter = 0;
            let countequalweight = 0;
            for (let i=0; i<snowflake.weightArray.length; i++) {
                if (snowflake.weightArray[i] > snow.weight) {
                    countheavier++;
                } else if (snowflake.weightArray[i] < snow.weight) {
                    countlighter++;
                } else {
                    countequalweight++;
                };      
              };
              let bee = `${countheavier} dinosaurs are heavier than you. ${countlighter} dinosaurs are lighter than you. Equal weight: ${countequalweight} dinosaurs.`;
              return bee; 

            };

            async function whoDiet() {
                let snowflake = await dinoProducer();
                let snow = await createHuman();
                let countsamediet = 0;
                let test1 = console.log(snowflake.dietArray);
                let test2 = console.log(snow.diet.toString().toLocaleLowerCase());
                for (let i=0; i<snowflake.dietArray.length; i++) {
                    if (snowflake.dietArray[i] === snow.diet.toString().toLowerCase()) {
                        countsamediet++;
                    };      
                  };
                  let fly = `${countsamediet} dinosaurs enjoy the same diet as you do.`;
                  return fly; 
    
                };

        let arrayitemfirst = await whoTaller();
        let arrayitemsecond = await whoHeavier();
        let arrayitemthird = await whoDiet();
        magicarray.push(arrayitemfirst);
        magicarray.push(arrayitemsecond);
        magicarray.push(arrayitemthird);
        console.log('#######################################################################');
        console.log(magicarray);
        return magicarray;
    };

   
     

        // for each dino compare numbers - count how often result is < 0 
        // dino - human > 0 : You are smaller than ... dinos
        // dino - human < 0 : You are taller than ... dinos
        // dino - human = 0 : You are just as tall as ... dinos

    

    function justaTest () {
        let lila = ['smaller', 'lighter', 'plantier'];
        return lila;
    };
    // Who is heavier?
    // function whoHeavier() {
    //     // for each dino compare numbers - count how often result is < 0 
    //     // dino - human > 0 : You are smaller than ... dinos
    //     // dino - human < 0 : You are taller than ... dinos
    //     // dino - human = 0 : You are just as tall as ... dinos
    // };
    

    // // What about the diet? 

    // function whoDiet() {
    //     // for each dino compare to human diet 
    //     // dino === human
    //     // ... dinos enjoy the same diet as you do
    //     // 
    // };


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
        // let rosa = await justaTest();
        let rosa = await produceArray();
        console.log('4444444444444444444444444444444444444444444444444444444');
        console.log(rosa);
        let pinsvin = await dinoProducer();
        let pigeonfact = pinsvin.factsArray.pop();
        console.log(pinsvin.factsArray);
        // let facts = ['fact1', 'fact2', 'fact3', 'fact4', 'fact5', 'fact6', 'fact7', 'fact8', 'fact9'];
        // let erdbeere = await shuffle(facts);
        // first shuffle it (array without pigeon), then pick only 6 items and combine them with, slice 
        // let erdbeere = await shuffle(pinsvin.factsArray);
        let beforeerdbeere = await shuffle(pinsvin.factsArray);
        let beforeerdbeere2 = beforeerdbeere.slice(0, 4);
        let erdbeere = await shuffle (rosa.concat(beforeerdbeere2));
        let veilchen = await createDinos();
        console.log('veiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiilchen');
        console.log(veilchen);
        let moose = createHuman();
        console.log('mooooooooooooooooooooooooooose');
        console.log(moose);
        console.log(moose.name);
        let item = [];
        let dinofact = [];
        for (let i=0; i<9; i++) {
            item[i] = document.createElement("div");
            item[i].setAttribute("class", "grid-item");
            document.getElementById("grid").appendChild(item[i]);
            // dinofact[i] = document.createTextNode(erdbeere[i]);
            // item[i].appendChild(dinofact[i]);
        };

        let dinotext = [];
        let dinoimage = [];
        for (let i=0; i<7; i++) {
            dinotext[i] = document.createTextNode(veilchen.dinos[i].species);
            console.log(dinotext[i]);
            dinoimage[i] = document.createElement("img");
            dinoimage[i].src = veilchen.dinos[i].image;
            dinofact[i] = document.createTextNode(erdbeere[i]);
            // DINO FACTS
            // dinofact[i] = document.createTextNode(facts[i]);
            // let pigeonimg = document.createElement("img");
            // pigeonimg.src = veilchen.pigeon.image;
            // item[5].appendChild(pigeonimg);
            // item[i].appendChild(dinoimage[i]);
            if (i>3){
                // DINO FACT
                item[i+2].appendChild(dinofact[i]);
                item[i+2].appendChild(dinoimage[i]);
                item[i+2].appendChild(dinotext[i]);
                // item[i+2].appendChild(dinofact[i]);
            } else {
                // DINO FACT
                item[i].appendChild(dinofact[i])
                item[i].appendChild(dinoimage[i]);
                item[i].appendChild(dinotext[i]);
                // item[i].appendChild(dinofact[i]);
                
            };
            
        };
  
    // The Human Tile
        var DOM_img = document.createElement("img");
        DOM_img.src = moose.image;
        item[4].appendChild(DOM_img);
        var textnode = document.createTextNode(moose.name);         // Create a text node
        item[4].appendChild(textnode); 
    // 
    // The Pigeon Tile
        let pigeonfactDom = document.createTextNode(pigeonfact);
        item[5].appendChild(pigeonfactDom);
        let pigeonimg = document.createElement("img");
        pigeonimg.src = veilchen.pigeon.image;
        item[5].appendChild(pigeonimg);
        let pigeontext = document.createTextNode(veilchen.pigeon.species);         // Create a text node
        item[5].appendChild(pigeontext); 
        

    };

    // createTiles();

    function main () {
        let icecream = createHuman();
        console.log('here comes the human');
        console.log(icecream);
        document.getElementById("dino-compare").style.display = "none";
        createTiles();
        produceArray();

    };





    // The EventListener
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
// Create a variable to store the url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initial funciton to display default data
function init(){
    
    // Select the dropdown Menu using D3
    let dropMenu = d3.select("#selDataset");

    // fetch the data from our url variable
    d3.json(url).then(function(data){

        
        let names = data.names;

        // Assigning the samples to the dropdown menu
        names.forEach(function(id){
            dropMenu.append("option").text(id).property("value",id);
        });

        // New variable assigned to the first name
        let name = names[0];

        //Now call the functions that will be defined later to create our demographics, bar chart, and bubble chart
        demographics(name);
        barChart(name);
        bubble(name);
       

    
    });

};

// Now we define our demographics function which will populate the demographics panel
function demographics(userInput){

    d3.json(url).then(function(data){

        //Isolate the metadata information into a new variable
        let metaData = data.metadata;

        // Filter based on the selected sample and retrieve first index
        let filtered = metaData.filter((meta) =>meta.id == userInput);
        let sampleValue = filtered[0];

        // Using Object.entries which is a built in method, we can assing key/value pairings to the panel
        Object.entries(sampleValue).forEach(([key,value])=>{

        d3.select("#sample-metadata").append("h5").text(`${key}:${value}`);
        
        });

    }); 

};

// Creating the bar chart function

function barChart(userInput){

    //Retrieve the data
    d3.json(url).then(function(data){

        // Store the sample data in a seperate variable
        let sample = data.samples;

        //Filter the sample data based on the input id
        let sampleValues = sample.filter(value => value.id == userInput);
    })


}
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
        metadata(name)
        demographics(name);
        barChart(name);
        bubble(name);
       

    
    });

};

// Now we define our demographics function which will populate the demographics panel
function metadata(userInput){

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

        //Filter the sample data based on the inputed id. Select the first index from the array
        let sampleSelected = sample.filter(value => value.id == userInput);
        let isolatedData = sampleSelected[0];

        // With the wanted information now isolated, store sample_values, otu_ids, and otu_labels into variables 
        let sampleValues = isolatedData.sample_values;
        let otuIds = isolatedData.otu_ids;
        let otuLabels = isolatedData.otu_labels;

        //Use .slice and .reverse to correctly display the top ten items 
        let xAxis = sampleValues.slice(0,10).reverse();
        let yAxis = otuIds.slice(0,10).map(id => `OTU ${id}`).reverse();     
        let labels = otuLabels.slice(0,10).reverse();

        //Setup the trace, the layout, and call on plotly to display the chart
        let trace1 = {
            x: xAxis,
            y: yAxis,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title : "Top Ten OTU's"
        };

        Plotly.newPlot("bar",[trace1],layout)



    });


};
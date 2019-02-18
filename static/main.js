$(document).ready(function () {

    let planets = []
    let dimensions = []
    let residentsList = []
    let residentsCount = []
    let planetColors = []
    let dimensionColors = {}
    let colors = ["#75C60F", "#EB47DF", "#04682a", "#701566"]


    fetch("https://rickandmortyapi.com/api/location/")
        .then(data => {
            return (data.json())
        })

        .then(data => {
            return data.results
        })

        .then(data => {
            data.forEach(planet => {
                // taking only the planets with more than 4 people
                // making lists of the planet names, dimensions, residents and number or residents for each
                if (planet.residents.length > 4) {
                    planets.push(planet.name)
                    dimensions.push(planet.dimension)
                    residentsList.push(planet.residents)
                    residentsCount.push(planet.residents.length)
                }
            })
            // this makes dimensionColors an object with each dimension paired to color 
            for (var i = 0; i < planets.length; ++i) {
                if (!dimensionColors[dimensions[i]]) {
                    dimensionColors[dimensions[i]] = colors.pop();
                }
            }
            // to assign the planets colors based on the dimensions they r in
            // this makes planetColors an array with all the planetNames mapped to there dimensionColors value
            planetColors = dimensions.map(x => dimensionColors[x])


            new Chart(document.getElementById("polar-chart"), {
                type: 'polarArea',
                data: {
                    labels: planets,
                    datasets: [{
                        label: "Population",
                        backgroundColor: planetColors,
                        data: residentsCount
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Planetary Populations'
                    }
                }
            });

// to make the dimensionColors key at the bottom of the page
            $.each(dimensionColors, function (key, value) {
                $('#color-chart').append("<li>" + key + " : <span class=color style= 'background-color: " + value + " '></span> </li>")
            })

            return planets
        })
        .catch(error => console.log(error))
});


// ignore
// note for me about somehting else I was gonna try to do 
// fetch(residents[i])
//     .then(res=>{resArr.push(res)})
//     )
// })
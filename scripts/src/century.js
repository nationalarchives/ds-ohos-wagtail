
    // Create an array of century labels (0 - 21)
    const centuryLabels = [];
    for (let century = 0; century <= 21; century++) {
      centuryLabels.push(century + "00");
    }

    // Function to process data (adapt based on your data structure)
    function processData(data) {
      const centuryCounts = {};
      for (const item of data.data) {
        // Check for missing data in access path
        if (!item["@template"] || !item["@template"].details || !item["@template"].details.creationDateFrom) {
          continue; // Skip entries with missing data
        }
  
        const creationFrom = parseInt(item["@template"].details.creationDateFrom, 10);
            
        // Check for invalid creation date
        if (isNaN(creationFrom)) {
          continue; // Skip entries with invalid creation dates
        }

        const century = Math.floor(creationFrom / 100) * 100;

        centuryCounts[century] = (centuryCounts[century] || 0) + 1;
      }

      // Convert centuryCounts to data for chart
      const centuryData = new Array(22).fill(0);
      for (const [century, count] of Object.entries(centuryCounts)) {
        const centuryIndex = Math.floor(century / 100);
        centuryData[centuryIndex] = count;
      }

      return centuryData;
    }

    // Fetch the JSON data from a URL (if applicable)
    fetch('data/data.json')
      .then(response => response.json())
      .then(data => {
        // Process data (replace with your processing logic if needed)
        const chartData = processData(data) || new Array(22).fill(0);  // Use default data if processing fails

        // Get the canvas element for the chart
        const ctx = document.getElementById("decade-counts-chart").getContext("2d");

        // Create a new bar chart with click event handling
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: centuryLabels,
            datasets: [
              {
                label: "",
                data: chartData,
                backgroundColor: "rgba(219, 98, 91, 1)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            onHover: (event, chartElement) =>{
              event.native.target.style.cursor = chartElement [0] ? 'pointer' : 'default';
            },
            // Adjust chart options as needed (e.g., scales, title)
            plugins: {
            legend: {
              display: false,  // This line hides the legend
              },
            },
            scales: {
              y:{ grid: {
                  drawOnChartArea: false,
                  color: "rgba(217 217, 214, 1)"
              },
              ticks: {
                display:false
              },
            },
            x: {
             position: 'top',
             grid: {
                drawBorder: false
             }
            },
              xAxes: [{
                ticks: {
                  min: 0,
                  max: 21,
                  stepSize: 1  // Display labels for every century
                }
                
              }]
            }
          },
        });

        // Add click event listener to the chart canvas
        chart.canvas.onclick = function(evt) {
          const activePoints = chart.getElementsAtEventForMode(evt, 'nearest', false);

          if (activePoints.length > 0) {
            // Get the clicked bar index
            const clickedIndex = activePoints[0].index;

            // Access the corresponding record count from chart data
            const recordCount = chartData[clickedIndex];

            // Display an alert with the record count
            //alert(`You clicked on the ${centuryLabels[clickedIndex]}. There are ${recordCount} records.`);
            window.location = `records-in-a-century.html?startDate=${centuryLabels[clickedIndex]}`;
          }
        };
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle data fetching error (e.g., display an error message)
      });

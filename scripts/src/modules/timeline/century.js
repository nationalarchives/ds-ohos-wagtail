fetch(
    "https://tna.rosetta.k-int.com/rosetta/data/search?aggs=decade,year,century&filter=group:community",
) // Replace with your server-side API endpoint
    .then((response) => response.json())
    .then((data) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // var targetCentury = urlParams.get("startDate");
        // var targetCentury = Number(targetCentury); // Using Number() function

        const targetCentury = parseInt(urlParams.get("startDate"));

        const decades = [];

        // Loop through each entry in the "decade" aggregation
        data.aggregations[1].entries.forEach((entry) => {
            const decade = Math.floor(entry.value / 10) * 10; // Extract decade (e.g., 1900 for years 1900-1909)

            // Check if the decade belongs to the target century
            if (decade >= targetCentury && decade < targetCentury + 100) {
                const existingDecade = decades.find((d) => d.decade === decade);

                if (existingDecade) {
                    existingDecade.count += entry.doc_count; // Add doc count to existing decade
                } else {
                    decades.push({ decade, count: entry.doc_count }); // Add new decade object
                }
            }
        });

        // Sort decades in ascending numerical order
        decades.sort((a, b) => a.decade - b.decade);

        // Check if any decades have records before drawing the chart
        if (!decades.length) {
            console.warn(
                "No records found for decades within the target century.",
            );
            return;
        }

        const ctx = document.getElementById("myChart").getContext("2d");
        // const chart = new Chart(ctx, {
        const chart = new window.Chart(ctx, {
            type: "bar",
            data: {
                labels: decades.map((decade) => `${decade.decade}`),
                datasets: [
                    {
                        label: "Number of Records",
                        backgroundColor: "rgba(219, 98, 91, 1)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        data: decades.map((decade) => decade.count),
                    },
                ],
            },
            options: {
                onHover: (event, chartElement) => {
                    event.native.target.style.cursor = chartElement[0]
                        ? "pointer"
                        : "default";
                },

                // Adjust chart options as needed (e.g., scales, title)
                plugins: {
                    legend: {
                        display: false, // This line hides the legend
                    },
                },
                scales: {
                    y: {
                        grid: {
                            drawOnChartArea: false,
                            color: "rgba(217 217, 214, 1)",
                        },
                        ticks: {
                            display: false,
                        },
                    },
                    x: {
                        position: "top",
                        grid: {
                            drawBorder: false,
                        },
                    },
                },
            },
        });

        // Add click event listener to the chart canvas
        chart.canvas.onclick = function (evt) {
            const activePoints = chart.getElementsAtEventForMode(
                evt,
                "index",
                false,
            );
            if (activePoints.length > 0) {
                // Get the clicked bar index
                const clickedIndex = activePoints[0].index * 10;
                // clickedIndexAdjust = targetCentury + clickedIndex;
                const clickedIndexAdjust = targetCentury + clickedIndex;
                // console.log(clickedIndexAdjust);
                // Access the corresponding record count from chart data
                // const recordCount = chartData[clickedIndex];

                const url =
                    "./?vis_view=timeline&timeline_type=year&startDate=" +
                    clickedIndexAdjust +
                    "#myChart";
                window.location = url;
            }
        };
    })
    .catch((error) => {
        console.error(error);
    });

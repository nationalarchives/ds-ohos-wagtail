fetch(
    "http://a08001c6c1d2e4c58bdf02589da33fca-0f850b505f873e8e.elb.eu-west-2.amazonaws.com/rosetta/data/search?aggs=century&filter=group:community",
) //  server-side API endpoint
    .then((response) => response.json())
    .then((data) => {
        const centuries = [];

        // Loop through each entry in the "century" aggregation
        data.aggregations[0].entries.forEach((entry) => {
            const century = parseInt(entry.value);

            // Filter centuries between 0 and 2100
            if (century >= 0 && century <= 2100) {
                const centuryName = `${century}`; // Construct the century name

                // Check if the century already exists in the array
                const existingCentury = centuries.find(
                    (c) => c.name === centuryName,
                );

                if (existingCentury) {
                    existingCentury.count += entry.doc_count; // Add doc count to existing century
                } else {
                    centuries.push({
                        name: centuryName,
                        count: entry.doc_count,
                    }); // Add new century object
                }
            }
        });

        // Sort centuries in ascending numerical order
        centuries.sort((a, b) => parseInt(a.name) - parseInt(b.name));

        const ctx = document.getElementById("myChart").getContext("2d");
        // const chart = new Chart(ctx, {
        const chart = new window.Chart(ctx, {
            type: "bar",
            data: {
                labels: centuries.map((century) => century.name),
                datasets: [
                    {
                        label: "Number of Records",
                        backgroundColor: "rgba(219, 98, 91, 1)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        data: centuries.map((century) => century.count),
                    },
                ],
            },
            options: {
                onHover: (event, chartElement) => {
                    event.native.target.style.cursor = chartElement[0]
                        ? "pointer"
                        : "default";
                },

                // chart options
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

                // Add this configuration to improve hit area accuracy
                interaction: {
                    mode: "index",
                    intersect: false,
                },
            },
        });

        //  click event listener to the chart canvas
        chart.canvas.onclick = function (evt) {
            const activePoints = chart.getElementsAtEventForMode(
                evt,
                "index",
                false,
            );
            if (activePoints.length > 0) {
                // Get the clicked bar index
                const clickedIndex = activePoints[0].index * 100;
                const clickedIndexAdjust = clickedIndex;
                // clickedIndexAdjust = clickedIndex;
                console.log(clickedIndexAdjust);
                // Access the corresponding record count from chart data
                // const recordCount = chartData[clickedIndex];

                const url =
                    "./?vis_view=timeline&timeline_type=decade&startDate=" +
                    clickedIndexAdjust +
                    "#myChart";
                window.location = url;
            }
        };
    })
    .catch((error) => {
        console.error(error);
    });

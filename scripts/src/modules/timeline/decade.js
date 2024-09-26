const searchParams = new URLSearchParams(window.location.search);

var url_string =
    "https://tna.rosetta.k-int.com/rosetta/data/search?aggs=century,community&filter=group%3Acommunity";

var query = searchParams.get("q");

if (query) {
    url_string += "&q=" + query;
}

var collection = searchParams.get("collection");

if (collection) {
    url_string +=
        "&filter=collectionOhos%3A" +
        collection.substring(collection.indexOf(":") + 1).replace(/ /g, "+");
}

fetch(
    url_string
) // Replace with your server-side API endpoint
    .then((response) => response.json())
    .then((data) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const targetDecade = parseInt(urlParams.get("startDate"));

        // var targetDecade = urlParams.get("startDate"); // Assuming the target decade is passed as startDate
        // var targetDecade = Number(targetDecade); // Using Number() function

        const years = [];

        // Loop through each entry in the "year" aggregation (assuming year data exists)
        data.aggregations[2].entries.forEach((entry) => {
            const year = entry.value;

            // Check if the year belongs to the target decade
            if (year >= targetDecade && year < targetDecade + 10) {
                years.push({ year, count: entry.doc_count });
                years.sort((a, b) => a.year - b.year);
            }
        });

        // Check if any records found before drawing the chart
        if (!years.length) {
            console.warn(
                "No records found for years within the target decade.",
            );
            document.getElementById("no-records").style.display = "block";
            document.getElementById("no-records").style.height = "0";
            return;
        }

        const ctx = document.getElementById("myChart").getContext("2d");
        // const chart = new Chart(ctx, {
        new window.Chart(ctx, {
            type: "bar", // You can choose a different chart type for year-wise data (e.g., 'line')
            data: {
                labels: years.map((year) => `${year.year}`),
                datasets: [
                    {
                        label: "Number of Records",
                        backgroundColor: "rgba(219, 98, 91, 1)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        data: years.map((year) => year.count),
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

        // Remove click event listener as it's not applicable for individual years (optional)
    })
    .catch((error) => {
        console.error(error);
    });
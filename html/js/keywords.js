async function loadChartData() {
  try {
    const seriesResponse = await fetch("stats/keywords.json");
    const seriesData = await seriesResponse.json();
    
    Highcharts.chart("hc-vis", {
      chart: {
        type: "column",
        zooming: {
          type: "x",
        },
      },
      title: {
        text: "",
      },
      subtitle: {
        text: "",
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: 'category',
        labels: {
            autoRotation: [-45, -90]
        }
    },
      yAxis: {
        title: {
          text: "Number of mentions",
        },
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          name: "Keywords",
          colorByPoint: true,
          data: seriesData
        }
      ]
    });
  } catch (error) {
    console.error("Error loading chart data:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadChartData);

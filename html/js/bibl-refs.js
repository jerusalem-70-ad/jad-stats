async function loadChartData() {
  try {
    const drilldownResponse = await fetch("hc-data/bibl-books-drilldown.json");
    const drilldownData = await drilldownResponse.json();

    const seriesResponse = await fetch("hc-data/bibl-books-series.json");
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
        text: "Click the columns to view verses.",
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "Number of mentions",
        },
      },
      legend: {
        enabled: true,
      },
      series: seriesData,
      drilldown: drilldownData,
    });
  } catch (error) {
    console.error("Error loading chart data:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadChartData);

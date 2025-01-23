search.on("render", () => {
  const results = search.helper.lastResults.disjunctiveFacets;
  const authorRawData = results.find(
    (result) => result.name === "work.author.name"
  ).data;
  const authorData = Object.entries(authorRawData);
  const workRawData = results.find(
    (result) => result.name === "work.name"
  ).data;
  const workData = Object.entries(workRawData);
  console.log(results)

  Highcharts.chart("author-vis", {
    chart: {
      type: "column",
      zooming: {
        type: "x",
      },
    },
    title: {
      text: "Authors",
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
    series: [
      {
        name: "referenced",
        colorByPoint: true,
        data: authorData,
      },
    ],
  });

  Highcharts.chart("work-vis", {
    chart: {
      type: "column",
      zooming: {
        type: "x",
      },
    },
    title: {
      text: "Works",
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
    series: [
      {
        name: "referenced",
        colorByPoint: true,
        data: workData,
      },
    ],
  });
});

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from '../canvasjs.min';
declare  var jQuery:  any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    // Bar graph
    let chart1 = new CanvasJS.Chart("sales-overview-chart", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 1200, label: "Peru" },
          { y: 1500, label: "Chile" },
          { y: 500, label: "Brasil" },
          { y: 120, label: "Ecuador" },
          { y: 1000, label: "Argentina" }
        ]
      }]
    });
    chart1.render();
    // Area Chart
    var chart2 = new CanvasJS.Chart("net-profit-chart", {
      animationEnabled: true,  
      title:{
        text: ""
      },
      axisY: {
        title: "Revenue in USD",
        prefix: "$"
      },
      data: [{
        type: "splineArea",
        color: "rgba(54,158,200,.6)",
        markerSize: 5,
        xValueFormatString: "YYYY",
        dataPoints: [
          { x: new Date(2019, 0), y: 219800 },
          { x: new Date(2020, 0), y: 338600 },
          { x: new Date(2021, 0), y: 550400 },
          { x: new Date(2022, 0), y: 602600 },
          { x: new Date(2023, 0), y: 789400 },
          { x: new Date(2024, 0), y: 927200 },
          { x: new Date(2025, 0), y: 1024000 }
        ]
      }]
      });
    chart2.render();
    // Real time Graph
    let dataPoints = [];
    let dpsLength = 0;
    let chart3 = new CanvasJS.Chart("market-overview-chart",{
      exportEnabled: true,
      title:{
        text:""
      },
      data: [{
        type: "spline",
        dataPoints : dataPoints,
      }]
    });
    
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?", function(data) {
      //console.log(data);
      $.each(data, function(key, value){
        dataPoints.push({x: value[0], y: parseInt(value[1])});
      });
      dpsLength = dataPoints.length;
      chart3.render();
      updateChart();
    });

    function updateChart() {	
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
      //console.log(data);
      $.each(data, function(key, value) {
        dataPoints.push({
        x: parseInt(value[0]),
        y: parseInt(value[1])
        });
        dpsLength++;
      });
      
      if (dataPoints.length >  20 ) {
            dataPoints.shift();				
          }
      chart3.render();
      setTimeout(function(){updateChart()}, 1000);
    });
      }
    

  }


}
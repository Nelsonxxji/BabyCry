import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Color, Label } from 'ng2-charts';
// FireStore Service
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-data-usage',
  templateUrl: './data-usage.component.html',
  styleUrls: ['./data-usage.component.css']
})
export class DataUsageComponent implements OnInit {
  public users = [];
  
  // Line Chart
  lineChartData: ChartDataSets[] = [
    {data: [6,7,3,8,9,4], label: 'Cost in K USD'},
  ];

  lineChartLabels: Label[] = ['Jan','Feb','Mar','Apr','May','Jun'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(88,212,212,0.6)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  //Bar Chart
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Peru', 'Chile', 'Brasil', 'Argentina', 'Ecuador'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [35000, 33000, 35000, 37000, 34000], label: 'Recordings' }
  ];
  // Doughnut Chart
  doughnutChartLabels: Label[] = ['CPU Utilization', 'Disk Reads', 'Disk Writes', 'Network Packets','CPU Credit Usage','CPU Credit Balance','Status Check Failed'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20, 50, 76, 42, 12]
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLegend = true;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.db.getUsers().subscribe(res => {
      res.forEach(data => {
        this.users.push(data.payload.doc.data());
      });
    });
  
  }


}
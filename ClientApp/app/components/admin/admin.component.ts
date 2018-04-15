import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  data = {
    labels: ['BMW', 'Audi', 'Mazda'],
    datasets: [
      {
        data: [5, 3, 1],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }
    ]
  };
  
  constructor() { }

  ngOnInit() {
  }

}

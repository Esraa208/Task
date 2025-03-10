import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() type: 'line' | 'bar' = 'line'; // Type of chart
  @Input() data: number[] = []; // Data received from API
  @Input() labels: string[] = []; // Labels for X-axis

  chart: Chart | undefined;

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  constructor() {
    Chart.register(...registerables); // Register required Chart.js components
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges() {
    this.renderChart();
  }

  renderChart() {
    if (!this.chartCanvas) return;

    const canvas = this.chartCanvas.nativeElement;

    if (this.chart) {
      this.chart.destroy(); // Destroy the existing chart instance
    }

    this.chart = new Chart(canvas, {
      type: this.type as ChartType,
      data: {
        labels: this.labels,
        datasets: [
          {
            label:
              this.type === 'line'
                ? 'USD to EUR (Last 30 Days)'
                : 'Latest Exchange Rates',
            data: this.data,
            backgroundColor:
              this.type === 'bar'
                ? ['#FF6384', '#36A2EB', '#FFCE56']
                : 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}

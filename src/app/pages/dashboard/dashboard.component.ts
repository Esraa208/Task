import { ChangeDetectorRef, Component } from '@angular/core';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  viewMode = true; // Toggle View/Edit Mode
  boxes = ['line', 'bar']; // Active chart types

  lineChartData: number[] = [];
  lineChartLabels: string[] = [];
  barChartData: number[] = [];
  barChartLabels: string[] = ['USD/EGP', 'USD/GBP', 'USD/EUR'];

  constructor(
    private exchangeService: ExchangeRateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.exchangeService.getTimeSeriesData().subscribe((data) => {
      this.lineChartLabels = Object.keys(data.rates);
      this.lineChartData = this.lineChartLabels.map(
        (date) => data.rates[date]['EUR']
      );
      this.cdr.detectChanges();
    });

    this.exchangeService.getLatestRates().subscribe((data) => {
      this.barChartData = [
        data.rates['EGP'],
        data.rates['GBP'],
        data.rates['EUR'],
      ];
      this.cdr.detectChanges();
    });
  }

  toggleMode(event: any) {
    this.viewMode = !this.viewMode;
  }

  hideBox(type: 'line' | 'bar') {
    this.boxes = this.boxes.filter((box) => box !== type);
  }

  addBox(type: 'line' | 'bar') {
    if (this.boxes.length < 2) this.boxes.push(type);
  }

  isCollapsed = true;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}

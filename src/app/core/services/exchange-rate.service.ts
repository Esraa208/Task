import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://api.apilayer.com/exchangerates_data';

  constructor(private http: HttpClient) {}

  getTimeSeriesData(): Observable<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    return this.http.get<any>(
      `${this.apiUrl}/timeseries?apikey=${environment.apiKey}&start_date=${formattedStartDate}&end_date=${endDate}&symbols=EUR&base=USD`
    );
  }

  getLatestRates(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/latest?apikey=${environment.apiKey}&symbols=EGP,GBP,EUR&base=USD`
    );
  }
}

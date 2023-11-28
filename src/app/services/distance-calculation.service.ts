import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs';
import { secrets } from 'src/environments/secrets';

@Injectable({
  providedIn: 'root',
})
export class DistanceCalculationService {
  constructor(private http: HttpClient) {}

  public calculateDistance(address1: string, address2: string) {
    this.getCoordinates(address1)
      .pipe(take(1))
      .subscribe((location1) => {
        console.log(location1);

        this.getCoordinates(address2)
          .pipe(take(1))
          .subscribe((location2) => {
            console.log(location2);

            if (location1 && location2) {
              const distance = this.getDistanceFromLatLonInKm(
                location1.latitude,
                location1.longitude,
                location2.latitude,
                location2.longitude
              );
              console.log(distance);
            }
          });
      });
  }

  private getCoordinates(address: string) {
    // Uses OpenCage API to get coordinates from address
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${secrets.openCage.apiKey}`;

    return this.http.get(url).pipe(
      map((data: any) => {
        if (data && data.results && data.results.length > 0) {
          const location = data.results[0].geometry;
          return { latitude: location.lat, longitude: location.lng };
        }
        return null;
      })
    );
  }

  private getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}

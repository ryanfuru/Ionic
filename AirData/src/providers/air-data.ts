import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AirData {

    tempTitle;
    data = [];
    labels = [];
    measurements = [];

    constructor(public http: HttpClient) {
        console.log('Get Air Quality Data');

        let data:Observable<any>;
        data = this.http.get('../assets/importData.json')
        data.subscribe(result => {
            for (var i = 0; i < 50; i++) {
                this.measurements.push(result.data.day[0].values[i][1]);
                this.labels.push(new Date(result.data.day[0].values[i][0]));
            }
        });
    }

    getData(){
        return this.measurements;
    }

    getLabels(){
        return this.labels;
    }

    presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}

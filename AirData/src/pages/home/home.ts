import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { AirData } from '../../providers/air-data';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(
    public navCtrl: NavController, 
    public airService: AirData,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController
  ) { }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.airService.getLabels(),
        datasets: [
        {
          label: "Kitchen",
          data: this.airService.getData(),
          borderColor: "rgba(0,0,255,0.3)",
          pointHoverBackgroundColor: "rgba(0,0,255,0.3)",
          pointHoverBorderColor: "rgba(0,0,255,0.3)",
          pointRadius: 0,
          fill: false,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            id: 'Time',
            type: 'time',
            time: {
            }
          }],
          yAxes: [{
            id: 'Air Quality',
          }]
        },
      }
    });
  }

  openFilterMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filter By',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Date Range',
          icon: !this.platform.is('ios') ? 'ios-code-working' : null,
          handler: () => {
            console.log('Date Range clicked');
          }
        },
        {
          text: 'Annotation',
          icon: !this.platform.is('ios') ? 'ios-attach' : null,
          handler: () => {
            console.log('Annotation clicked');
          }
        },

        {
          text: 'Time',
          icon: !this.platform.is('ios') ? 'ios-time' : null,
          handler: () => {
            console.log('Time clicked');
          }
        },
        {
          text: 'Averages',
          icon: !this.platform.is('ios') ? 'ios-calculator' : null,
          handler: () => {
            console.log('Averages clicked');
          }
        },
        {
          text: 'Reset',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-refresh' : null,
          handler: () => {
            console.log('Reset clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}

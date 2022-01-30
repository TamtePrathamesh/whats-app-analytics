import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts.src.js';
import { COLOR_CODES } from 'src/@common/constant/config';
import { Message } from 'whatsapp-chat-parser/types/types';
import { DataAnalysis } from '../app.component';

@Component({
  selector: 'app-emoji-bar-chart',
  templateUrl: './emoji-bar-chart.component.html',
  styleUrls: ['./emoji-bar-chart.component.scss']
})
export class EmojiBarChartComponent implements OnInit {

  @Input('analysisPerAuthor') analysisPerAuthor: Map<String, DataAnalysis> = new Map();

  emojiCategories = ['❤️', '😘', '😍', '🤣', '😅', '😂', '👍'];


  updateFlag = true;
  Highcharts = Highcharts;
  chartConstructor = 'chart';
  chartCallback = (chart) => {
    setTimeout(() => {
      chart.reflow();
    }, 0);
  };


  chartOptions = {
    chart: {
      type: 'column',
      backgroundColor: '#fafafa',

    },
    title: {
      text: "Emoji's Used"
    },

    accessibility: {
      point: {
        valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
      }
    },
    xAxis: [{
      categories: this.emojiCategories,
      reversed: false,
      labels: {
        step: 1
      },
    }],
    yAxis: {
      title: {
        text: "No. of emoji's"
      },
      labels: {
        formatter: function () {
          return Math.abs(this.value);
        }
      },
      accessibility: {
        description: 'Percentage population',
      }
    },

    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },

    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + ' ' + this.point.category + '</b><br/>' +
          'Emoji Count: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
      }
    },
    colors: COLOR_CODES,
    series: [],
    credits: {
      enabled: false
    },
  }

  constructor() {

  }

  ngOnInit() {
    for (let analysis of this.analysisPerAuthor) {
      const emojiCountPerUser = [];
      for (let emoji of this.emojiCategories) {
        let emojiCnt = analysis[1].emojiCountMap[emoji] || 0;
        
        emojiCountPerUser.push(emojiCnt);
      }

      this.chartOptions.series.push({
        name: analysis[0],
        data: emojiCountPerUser
      });
    }
    this.updateFlag = true;
  }

}

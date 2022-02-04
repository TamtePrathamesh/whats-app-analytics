import { Component, OnInit, Input } from "@angular/core";
import * as Highcharts from "highcharts/highcharts.src.js";
declare var require: any;
const Wordcloud = require("highcharts/modules/wordcloud");
Wordcloud(Highcharts);
import { DataAnalysis } from "../app.component";


@Component({
  selector: "app-frequent-words",
  templateUrl: "./frequent-words.component.html",
  styleUrls: ["./frequent-words.component.scss"],
})
export class FrequentWordsComponent implements OnInit {
  @Input("authorAnalysis") authorAnalysis: DataAnalysis;

  updateFlag = true;
  Highcharts = Highcharts;
  chartConstructor = 'chart';

  chartCallback = (chart) => {
    setTimeout(() => {
      chart.reflow();
    }, 0);
  };


  constructor() { }

  chartOptions = {
    title: {
      text: "",
    },
    series: [
      {
        type: "wordcloud",
        placementStrategy: "random",
        name: "Occurrences",
        data: [
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  data: object[];
  authName: "";

  ngOnInit() {
    this.authorAnalysis.wordCount.delete("<Media");
    this.authorAnalysis.wordCount.delete("omitted>");
    const regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    let data = [...this.authorAnalysis.wordCount]
      .sort((a, b) => b[1] - a[1])
      .filter((k) => !regex.test(k[0]))
      .map((kv) => {
        return { name: kv[0], weight: kv[1] };
      })
      .slice(0, 60);
    console.log("frequent-word", data);
    this.chartOptions.series[0].data = data;
    this.chartOptions.title.text = this.authorAnalysis.author;
  }
}

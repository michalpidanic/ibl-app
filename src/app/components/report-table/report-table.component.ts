import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IReport } from '../../interfaces/response.interface';

/**
 * This component is responsible for displaying a table of reports
 * @author Michal Pidanic
 */
@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit, OnChanges {
  @Input() public data: IReport[] = [];
  public groupedReports: { stationId: string; reports: IReport[] }[] = [];
  public displayedColumns: string[] = ['queryType', 'reportTime', 'textHTML'];

  /**
   * This method is called when the component is initialized
   * @returns {void}
   */
  public ngOnInit(): void {
    this._groupReportsByStation();
  }

  /**
   * This method is called when the data input changes
   * @param {SimpleChanges} changes Changes object
   * @returns {void}
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this._groupReportsByStation();
    }
  }

  /**
   * This method groups reports by stationId
   * @returns {void}
   */
  private _groupReportsByStation(): void {
    const grouped = this.data.reduce((acc, report) => {
      if (!acc[report.stationId]) {
        acc[report.stationId] = [];
      }
      acc[report.stationId].push(report);
      return acc;
    }, {} as Record<string, IReport[]>);

    this.groupedReports = Object.keys(grouped).map((stationId) => ({
      stationId,
      reports: grouped[stationId],
    }));
  }
}

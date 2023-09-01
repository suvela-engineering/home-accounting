import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/services/entry-service.service';

@Component({
  selector: 'table-entries',
  // templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  template: `
  <div class="mx-auto">
    <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
  </div>
`
})

export class EntriesComponent implements OnInit {

  constructor(private entryService: EntryService) {
  }

  ngOnInit() {
    this.getEntries();
  }

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  getEntries = async (): Promise<Entry[] | null> => {
    const response = await this.entryService.getEntries();
    if (response.ok) {
      const data = await response.json();
      const entryData = data.data;
      if (entryData && entryData.length > 0) {
        const entries: Entry[] = entryData.map((entryData: any) => {
          return new Entry(
            entryData.entry_id,
            entryData.entry_name,
            entryData.entry_description,
            entryData.entry_category_id,
            new Date(entryData.start),
            entryData.stop ? new Date(entryData.stop) : null,
            entryData.deleted,
            new Date(entryData.modified),
            entryData.modified_by,
            parseFloat(entryData.amount ?? 0)
          );
        });
        console.log("entries ok");
        return entries;
        
      }
      else if (entryData) {
        return entryData;
      }
      console.log(`An unknown error occurred: ${(response).status}. details: ${(response).text()} `);
      return null;
    }
    else {
      console.log(`An error occurred: ${(response).status}`);
      return null;
    }
  }
}

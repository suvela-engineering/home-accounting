export class Entry implements IEntry{
    entryId: number;
    entryName: string;
    entryDescription: string;
    entryCategoryId: number;
    start: Date;
    stop: Date | null;
    deleted: boolean;
    modified: Date;
    modifiedBy: string;
    amount: number;
    
    constructor(
      entryId: number,
      entryName: string,
      entryDescription: string,
      entryCategoryId: number,
      start: Date,
      stop: Date | null,
      deleted: boolean,
      modified: Date,
      modifiedBy: string,
      amount: number
    ) {
      this.entryId = entryId;
      this.entryName = entryName;
      this.entryDescription = entryDescription;
      this.entryCategoryId = entryCategoryId;
      this.start = start;
      this.stop = stop;
      this.deleted = deleted;
      this.modified = modified;
      this.modifiedBy = modifiedBy;
      this.amount = amount;
    }
  }

  interface IEntry {
    entryId: number;
    entryName: string;
    entryDescription: string;
    entryCategoryId: number;
    start: Date;
    stop: Date | null;
    deleted: boolean;
    modified: Date;
    modifiedBy: string;
    amount: number;
  }
  
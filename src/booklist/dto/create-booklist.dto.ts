export class CreateBooklistDto {
  title: string;
  privateStatus: boolean;
}

export class InsertBookIntoBooklistDto {
  book_id: number;
  booklists: number[];
}

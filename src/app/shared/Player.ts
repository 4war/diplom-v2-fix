export class Player {
  rni: number = 0;
  surname: string = '';
  name: string = '';
  patronymic: string = '';
  dateOfBirth!: Date;
  city: string = '';
  point: number = 0;
  gender!: number;

  getShortFio(): string {
    return `${this.surname} ${this.name?.length > 0 ? this.name[0] + '. ' : ''} ${this.patronymic?.length > 0 ? this.patronymic[0] + '. ' : ''}`
  }
}

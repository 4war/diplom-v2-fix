export const ages: Age[] = [
  {max: 10, min: 9, viewValue: '9-10 лет'},
  {max: 12, min: 10, viewValue: 'до 13 лет'},
  {max: 14, min: 11, viewValue: 'до 15 лет'},
  {max: 16, min: 12, viewValue: 'до 17 лет'},
  {max: 18, min: 13, viewValue: 'до 19 лет'},
  {max: 100, min: 14, viewValue: 'Взрослые'},
]

export const allCategories: Category[] = [
  {digit: 'V', letter: 'Г', viewValue: ''},
  {digit: 'V', letter: 'В', viewValue: ''},
  {digit: 'V', letter: 'Б', viewValue: ''},
  {digit: 'V', letter: 'А', viewValue: ''},

  {digit: 'IV', letter: 'В', viewValue: ''},
  {digit: 'IV', letter: 'Б', viewValue: ''},
  {digit: 'IV', letter: 'А', viewValue: ''},

  {digit: 'III', letter: 'В', viewValue: ''},
  {digit: 'III', letter: 'Б', viewValue: ''},
  {digit: 'III', letter: 'А', viewValue: ''},

  {digit: 'II', letter: 'Б', viewValue: ''},
  {digit: 'II', letter: 'А', viewValue: ''},

  {digit: 'I', letter: 'Б', viewValue: ''},
  {digit: 'I', letter: 'А', viewValue: ''},

  //{digit: 'ФТ', letter: '', viewValue: ''},
].reverse();

export const categoryMap: Map<string, string[]> = new Map<string, string[]>();
allCategories.forEach(category => {
  if (!categoryMap.has(category.digit)){
    categoryMap.set(category.digit, []);
  }

  categoryMap.get(category.digit)!.push(category.letter);
});

class Age {
  max = 0;
  min = 0;
  viewValue = '';
}

export class Category {
  digit = '';
  letter = '';

  get viewValue(): string {
    if (this.letter.length == 0)
      return this.digit;

    return `${this.digit} ${this.letter}`;
  }
}



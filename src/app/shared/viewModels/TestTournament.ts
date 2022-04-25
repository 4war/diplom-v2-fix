import {NgttRound, NgttTournament} from "ng-tournament-tree";

export class TestTournament implements NgttTournament {
  rounds: NgttRound[] = [
    {
      type: 'Winnerbracket',
      matches: [
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        }, {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        }
      ]
    }, {
      type: 'Winnerbracket',
      matches: [
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        }
      ]
    },
    {
      type: 'Winnerbracket',
      matches: [
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        },
        {
          teams: [
            {rni: 40092, score: '1'},
            {rni: 40092, score: '2'}]
        }
      ]
    },
    {
      type: 'Final',
      matches: [
        {
          teams: [
            {
              rni: 40092,
              score: 1
            },
            {
              rni: 40092,
              score: 2
            }
          ]
        },
      ]
    }
  ]
}

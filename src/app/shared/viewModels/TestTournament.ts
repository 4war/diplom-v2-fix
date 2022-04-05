import {NgttRound, NgttTournament} from "ng-tournament-tree";

export class TestTournament implements NgttTournament {
  rounds: NgttRound[] = [
    {
      type: 'Winnerbracket',
      matches: [
        {
          teams: [
            { name: 'Team  A', score: 1 },
            { name: 'Team  B', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  C', score: 1 },
            { name: 'Team  D', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  E', score: 1 },
            { name: 'Team  F', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  G', score: 1 },
            { name: 'Team  H', score: 2 }]
        }, {
          teams: [
            { name: 'Team  A', score: 1 },
            { name: 'Team  B', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  C', score: 1 },
            { name: 'Team  D', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  E', score: 1 },
            { name: 'Team  F', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  G', score: 1 },
            { name: 'Team  H', score: 2 }]
        }
      ]
    }, {
      type: 'Winnerbracket',
      matches: [
        {
          teams: [
            { name: 'Team  A', score: 1 },
            { name: 'Team  B', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  C', score: 1 },
            { name: 'Team  D', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  E', score: 1 },
            { name: 'Team  F', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  G', score: 1 },
            { name: 'Team  H', score: 2 }]
        }
      ]
    },
    {
      type: 'Winnerbracket',
      matches: [
        {
          teams: [
            { name: 'Team  B', score: 1 },
            { name: 'Team  D', score: 2 }]
        },
        {
          teams: [
            { name: 'Team  F', score: 1 },
            { name: 'Team  H', score: 2 }]
        }
      ]
    },
    {
      type: 'Final',
      matches: [
        {
          teams: [
            {
              name: 'Team  D',
              score: 1
            },
            {
              name: 'Team  H',
              score: 2
            }
          ]
        },
      ]
    }
  ]

}

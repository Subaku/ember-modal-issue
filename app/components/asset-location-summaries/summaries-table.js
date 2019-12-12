import Component from '@ember/component';

export default class SummariesTable extends Component {
  summaryColumns = [
    {name: 'Location', slug: 'location'},
    {name: 'Inventory', slug: 'inventory'},
    {name: 'Non-Assigned Inventory', slug: 'non-assigned'},
    {name: '', slug: 'actions'},
  ];
}

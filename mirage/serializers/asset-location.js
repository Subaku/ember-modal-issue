import ApplicationSerializer from './application';

export default class AssetLocationSerializer extends ApplicationSerializer {
  embed = true;

  include = ['location', 'asset', 'assignedTo', 'seenBy']
}

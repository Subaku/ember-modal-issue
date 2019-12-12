import ApplicationSerializer from './application';

export default class AssetLocationSummarySerializer extends ApplicationSerializer {
  embed = true;

  include = ['location']
}

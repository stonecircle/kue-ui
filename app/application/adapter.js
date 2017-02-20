import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/v2`,
});

import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';
import config from 'client/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${config.apiURL}/v2`,
});

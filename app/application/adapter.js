import { get } from '@ember/object';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';

import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${get(window, '__kueUiExpress.apiURL') || config.apiURL}/v2`,
});

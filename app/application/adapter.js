import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';
import Ember from 'ember';

import config from '../config/environment';

const { get } = Ember;

export default DS.JSONAPIAdapter.extend({
  host: `${get(window, '__kueUiExpress.apiURL') || config.apiURL}/v2`,
});

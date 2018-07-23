import { helper as buildHelper } from '@ember/component/helper';

export function formatJson(params/*, hash*/) {
  var str = JSON.stringify(params[0], undefined, 2);
  return str.replace(/ /g, '&nbsp').htmlSafe();
}

export default buildHelper(formatJson);

import { helper as buildHelper } from '@ember/component/helper';

export function formatError(params/*, hash*/) {
  return params[0];
}

export default buildHelper(formatError);

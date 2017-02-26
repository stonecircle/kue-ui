export default function contains(context, element, text, message) {
  message = message || `${element} should contain "${text}"`;
  let actual = element.text();
  let expected = text;
  let result = !!actual.match(new RegExp(expected));

  this.pushResult({ result, actual, expected, message });
}

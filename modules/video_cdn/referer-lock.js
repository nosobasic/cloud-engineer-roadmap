function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var allowedDomain = "${allowed_domain}".toLowerCase();

  var referer = "";
  if (headers.referer && headers.referer.value) {
    referer = headers.referer.value.toLowerCase();
  }

  var origin = "";
  if (headers.origin && headers.origin.value) {
    origin = headers.origin.value.toLowerCase();
  }

  var refererAllowed = referer.indexOf(allowedDomain) !== -1;
  var originAllowed = origin.indexOf(allowedDomain) !== -1;

  if (refererAllowed || originAllowed) {
    return request;
  }

  return {
    statusCode: 403,
    statusDescription: "Forbidden",
    headers: {
      "content-type": { value: "text/plain" }
    },
    body: "Hotlinking is not allowed"
  };
}

const corsHeaders = {
  // What headers are allowed. * is wildcard. Instead of using '*', you can specify a list of specific headers that are allowed, such as: Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Authorization.
  'Access-Control-Allow-Headers': '*',
  // Allowed methods. Others could be GET, PUT, DELETE etc.
  'Access-Control-Allow-Methods': '*',
  // This is URLs that are allowed to access the server. * is the wildcard character meaning any URL can.
  'Access-Control-Allow-Origin': '*',
};

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response('OK', {
      headers: corsHeaders
    });
  }
  return getLocation(request);
}

async function getLocation(request) {
  const response = {};
  if (request.cf) {
    const cf = request.cf;
    if (cf.continent) response.continent = cf.continent;
    if (cf.longitude) response.longitude = cf.longitude;
    if (cf.latitude) response.latitude = cf.latitude;
    if (cf.latitude) response.latitude = cf.latitude;
    if (cf.country) response.country = cf.country;
    if (cf.isEUCountry) response.isEUCountry = cf.isEUCountry;
    if (cf.city) response.city = cf.city;
    if (cf.postalCode) response.postalCode = cf.postalCode;
    if (cf.metroCode) response.metroCode = cf.metroCode;
    if (cf.region) response.region = cf.region;
    if (cf.regionCode) response.regionCode = cf.regionCode;
    if (cf.timezone) response.timezone = cf.timezone;
  }
  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
};

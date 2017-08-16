# Atlas

[WIP] Our [Hugo](https://gohugo.io/) starter site.

## Security Headers

Security headers can be configured within `/layouts/index.headers`, which is then built to `/public/_headers`. The default headers we include are: [X-Frame-Options](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options), [X-XSS-Protection](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-xss-protection), [X-Content-Type-Options](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options), [Referrer-Policy](https://scotthelme.co.uk/a-new-security-header-referrer-policy/).

These headers are configured with the following values:

```
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
```

Learn more about [Headers with Netlify](https://www.netlify.com/docs/headers-and-basic-auth/).

## Redirects & Aliases

Hugo [Aliases](https://gohugo.io/content-management/urls/#aliases) are usually handled by `<meta http-equiv="refresh" ...>` tags. These have been disabled within `config.toml` with `disableAliases = true`, and instead are handled by [Netlify Redirects](https://www.netlify.com/docs/redirects/).

Custom redirect rules can be added to `/layouts/index.redirects`, which is then built to `/public/_redirects`.

## Deploy to Netlify

You can deploy directly to Netlify using this button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/indigotree/atlas)

## License

MIT © [Indigo Tree](https://indigotree.co.uk)
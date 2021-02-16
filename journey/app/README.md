# trimet-mod-otp

TriMet-specific implementation of the [otp-react-redux](https://github.com/opentripplanner/otp-react-redux) library, managed using Yarn and Webpack 4.

## Setup and Configuration Instructions

1. Ensure that [Yarn](https://yarnpkg.com/en/) (v1.9+) and [Node.js](https://nodejs.org/en/) (v8.9+) are installed locally.

2. Clone the trimet-mod-otp repository:

```bash
git clone https://github.com/conveyal/trimet-mod-otp.git
```

3. Install dependencies using Yarn:

```bash
yarn install
```

4. Update the configuration file, `lib/config.yml`, as needed. You can also duplicate this file and reference the new file with the `--env.YAML_CONFIG` option [as described below](#using-custom-indexhtml-css-and-js). This file allows for configuration of the:

- page title
- base URL path,
- OTP API,
- map base layers and overlays,
- enabled travel modes, and
- other settings.

See [`config.yml`](https://github.com/ibi-group/trimet-mod-otp/blob/master/lib/config.yml) comments for details.

## Development/Deployment:

### Running a local test instance

Run the `start` command with Yarn to deploy the application locally for testing. This command uses [webpack-dev-server](https://github.com/webpack/webpack-dev-server) and deploys to `http://localhost:8080`:

```bash
yarn start
```

### Building a bundle for production deployment

Run the `build` command with Yarn to bundle the application for production deployment. This command uses webpack running in production mode and produces minified/optimized code:

```bash
yarn build
```

This will build three files in the `dist/` directory: `index.html`, `bundle.js`, and `styles.css`. These files can then be deployed to any public-facing web server. Note: if deploying to a URL subdirectory, the path must match the `reactRouter.basename` property specified in `config.yml`.

### Using custom index.html, css, and js

Both the `yarn build` and `yarn start` commands are equipped with the ability to override the default `lib/index.tpl.html`, `lib/style.scss`, and `config.js` (not to mention the `config.yml`). This can be handy for injecting some custom scripts/widgets into the html (in a pinch), overriding the default branding, or configuring pieces of `config.js` like the icons used for modes (e.g., car, bus, or trolley) and the disclaimers shown in the sidebar footer.

To override these files, run the start/build command with any of the options specified with an absolute file path to the file override. For example:

```bash
# Optionally, copy and modify the default CSS file (making the navbar color pink).
sed 's/base-color: #084c8d/base-color: pink/' lib/style.scss > lib/branding.scss

# Kick off dev server with custom items (only specify items you want to override).
yarn start \
  # This is the CSS we just created above ^^
  --env.CUSTOM_CSS=/Users/$USER/git/trimet-mod-otp/lib/branding.scss \
  --env.YAML_CONFIG=/absolute/path/to/config.yml \
  --env.HTML_FILE=/path/to/index.html \
  --env.JS_CONFIG=/path/to/my-config.js
```

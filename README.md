# Snail Tail

Run (or walk!) from an ephemeral adversary of your choice. Move your body to put distance between you and them or face an uncertain threat...

Just kidding! You can opt out just as easily as you opt in. We just want you to make physical activity a routine.

[Try the live app now!](https://krazkidd.github.io/snail-tail/)

Project hosted at: https://github.com/krazkidd/snail-tail

License: AGPLv3 (see LICENSE.md file)

## Features

* Start or stop the chaser at will
* Customizable user and chaser avatars
* Dark mode

## Development

First and foremost, this is an Ionic app, so we use Ionic tooling which wraps Angular tooling. Capacitor tooling is used for mobile targeting.

### Setup

To install dependencies:

```bash
npm install
```

To install the Angular CLI, [follow these instructions](https://angular.io/guide/setup-local#install-the-angular-cli) or simply run:

```bash
npm install -g @angular/cli
```

To install the Ionic CLI, [follow these instructions](https://ionicframework.com/docs/cli#installation) or simply run:

```bash
npm install -g @ionic/cli
```

Then, to run the app in dev mode:

```bash
ionic serve
```

The server listens on http://localhost:8100/.

## Deployment (Web)

Ionic (with Angular) apps run on the client side.

### Build

To generate the site files, run:

```bash
ionic build --prod
```

Then simply copy the contents of the `www/` directory to your host. An `index.html` entry point is provided.

## Hosting

### GitHub Pages (free)

Create a `gh-pages` (orphan) branch and commit the generated files. You may need to configure this branch to be your publishing source, but after that, deployment is automatic.

## Attributions

The running shoe favicon (`src/assets/icon/favicon.ico` and accompanying files) and other emojis are used under the [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) license from the [twemoji](https://github.com/twitter/twemoji) project.

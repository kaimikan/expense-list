# expenses-list

An app with the purpose of tracking expenses. Following Andrew Mead's React course.

## Setup:

to create node_modules if first time cloning

```
yarn install
```

to run webpack module building into bundle

```
yarn run build:dev
```

or

```
yarn run build:prod
```

to run dev server

```
yarn run dev-server
```

## Issues:

While following the course a build up of deprecated packages is making some of the progress sluggish and not worthwhile. I will record these here in case I want to revisit them at a later date instead.

- **Video #134 - Creating Seperate CSS Files** - tried Mini Css Extract Plugin as suggested from Q&A with no noticeable result. Webpack is updated to 4.1.0 -> Webpack-CLI -> building does not generate anything anymore, neither bundle.js nor the wanted styles.css file

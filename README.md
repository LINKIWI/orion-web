# react-static-boilerplate

This project provides base configuration and boilerplate for a simple, ES6/JSX, static, client-only React SPA.

## Instructions

### Containers and components

Ideally, components should be dumb and presentational. Containers may contain isolated state, or may retrieve it from the global Redux store (ensuring to pull state up as much as possible). Container children may include other containers and components, but a container should never be the child of a component.

Components are in `app/react/components`. Containers are in `app/react/containers`.

### Adding a new Redux action/reducer

Add a new action with factory functions for serialized action objects:

```diff
diff --git a/action.js b/action.js
new file mode 100644
index 0000000..da7e463
--- /dev/null
+++ b/action.js
@@ -0,0 +1,16 @@
+export const ACTION_NAME = 'ACTION_NAME';
+
+export const actionCreator = (param) => ({
+  type: ACTION_NAME,
+  payload: { param },
+});
```

Add a corresponding reducer with an initial state for that reducer namespace and a mapping from action types to reduction functions:

```diff
diff --git a/reducer.js b/reducer.js
new file mode 100644
index 0000000..4cf0218
--- /dev/null
+++ b/reducer.js
@@ -0,0 +1,23 @@
+import { ACTION_NAME } from 'app/redux/actions/action';
+import createReducer from 'app/redux/reducers/create-reducer';
+
+const initialState = {
+  state: false,
+};
+
+const setTrue = (state) => ({
+  ...state,
+  state: true,
+});
+
+const reducerMapping = {
+  [ACTION_NAME]: setTrue,
+};
+
+export default createReducer(reducerMapping, initialState);
```

Add the namespace to `app/redux/reducers/index.js`:

```diff
diff --git a/src/app/redux/reducers/index.js b/src/app/redux/reducers/index.js
index f6ce50b..1aadb44 100644
--- a/src/app/redux/reducers/index.js
+++ b/src/app/redux/reducers/index.js
@@ -1,5 +1,8 @@
 import { combineReducers } from 'redux';
+import reducerReducer from 'app/redux/reducers/reducer';

-const reducer = combineReducers({});
+const reducer = combineReducers({
+  reducer: reducerReducer,
+});

 export default reducer;
```

## Usage

### Forking a new project

```bash
$ git clone git@git.kevinlin.info:personal/react-static-boilerplate.git my-project
$ cd my-project
$ rm -rf .git && git init
```

### Development

```bash
$ npm install
$ npm run start
# This starts webpack-dev-server on port 8080.
# Changes to source are live-reloaded.
```

### Deployment

```bash
$ NODE_ENV=production npm run build
# This creates a minified HTML file with all JS inlined at dist/index.html.
```

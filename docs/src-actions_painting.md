# Module `paintingActions`

![category:other](https://img.shields.io/badge/category-other-blue.svg?style=flat-square)

Actions for scope painting.&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;li&gt;Redux Actions have a prefixed scope (painting)&lt;/li&gt;&lt;/ul&gt;

[Source file](../src/actions/painting.js)

## Constants

### `ADD_PAINTING`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)



#### Value

```javascript
'ADD_PAINTING'
```

---

### `REMOVE_PAINTING`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)



#### Value

```javascript
'REMOVE_PAINTING'
```

---

### `SHARE_PAINTING`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)



#### Value

```javascript
'SHARE_PAINTING'
```

---

### `OPEN_PAINTING`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)



#### Value

```javascript
'OPEN_PAINTING'
```

---

### `RECEIVE_PAINTING`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)



#### Value

```javascript
'RECEIVE_PAINTING'
```

---

### `TRIGGER`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)



#### Value

```javascript
'TRIGGER'
```

---

### `INITIAL_DATA_LOAD`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)



#### Value

```javascript
'INITIAL_DATA_LOAD'
```

---

### `UNSELECT_PAINTING`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)



#### Value

```javascript
'UNSELECT_PAINTING'
```

---

### `addPainting`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)

Action to create a new painting.
Dispatches an openPainting action.&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;/ul&gt;

Parameters | Type | Description
--- | --- | ---
__*return*__ | `Redux.AsyncAction` | **

#### Value

```javascript
() => (dispatch) => {
  const painting = new Painting();
  dispatch({
    type: ADD_PAINTING,
    painting,
  });
  dispatch(openPainting(painting.id));
}
```

---

### `receivePainting`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)

Action to load a painting into the state.&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;/ul&gt;

Parameters | Type | Description
--- | --- | ---
__paintingId__ | `number` | **
__*return*__ | `Redux.AsyncAction` | **

#### Value

```javascript
(paintingId) => async (dispatch) => {
  const db = await database();
  const painting = await db.paintings.get(parseInt(paintingId));
  dispatch({
    type: RECEIVE_PAINTING,
    paintingId,
    painting,
  });
}
```

---

### `openPainting`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)

Action to open a painting into the state.&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;/ul&gt;

Parameters | Type | Description
--- | --- | ---
__paintingId__ | `number` | **
__*return*__ | `Redux.AsyncAction` | **

#### Value

```javascript
(paintingId) => async (dispatch) => {
  dispatch(receivePainting(paintingId));
  dispatch(updateLocationURL('/paint/' + paintingId));
}
```

---

### `removePainting`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)

Action to remove a painting.&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;/ul&gt;

Parameters | Type | Description
--- | --- | ---
__paintingId__ | `number` | **
__*return*__ | `Redux.AsyncAction` | **

#### Value

```javascript
(paintingId) => async (dispatch) => {
  dispatch({
    type: REMOVE_PAINTING,
    paintingId,
  });
}
```

---

### `sharePainting`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)

Action to start sharing a painting.&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;/ul&gt;

Parameters | Type | Description
--- | --- | ---
__paintingId__ | `number` | **
__*return*__ | `Redux.AsyncAction` | **

#### Value

```javascript
(paintingId) => async (dispatch) => {
  dispatch({
    type: SHARE_PAINTING,
    paintingId,
  });
}
```

---

### `trigger`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)

Triggers a store changed event.&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;/ul&gt;

Parameters | Type | Description
--- | --- | ---
__*return*__ | `Redux.AsyncAction` | **

#### Value

```javascript
() => async (dispatch) => {
  const ts = Date.now();
  dispatch({
    type: TRIGGER,
    ts,
  });
}
```

---

### `unselectPainting`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)

Action to unselect the current painting.
This is the reverse action for [receivePainting](receivePainting).&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;/ul&gt;

Parameters | Type | Description
--- | --- | ---
__*return*__ | `Redux.AsyncAction` | **

#### Value

```javascript
() => async (dispacth) => {
  dispacth({
    type: UNSELECT_PAINTING,
  });
}
```

---

### `initializeState`

![modifier: public](images/badges/modifier-public.svg) ![modifier: static](images/badges/modifier-static.svg)

Initializes the store with the data for the overview page.&lt;ul&gt;&lt;li&gt;Redux Functionality&lt;/li&gt;&lt;/ul&gt;

Parameters | Type | Description
--- | --- | ---
__*return*__ | `Redux.AsyncAction` | **

#### Value

```javascript
() => async (dispatch) => {
  const db = await database();
  const paintings = await db.paintings.toArray((arr) =>
    arr.map(({id, dataURL}) => ({id, dataURL})));
  dispatch({
    type: INITIAL_DATA_LOAD,
    paintings,
  });
}
```

---

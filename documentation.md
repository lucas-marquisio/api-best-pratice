# Documentation Simple Api

- Port: 4000

### API

_Method_: **Post /checkin**

```typescript
body: {
  id: string
}
```

```
Response status: 200
{
  id: number
  userId: string
  checkin: Date
  checkout: Date | null
}
```

```
Response error status: 400
{
    error: 'missing param error: param'
}
```

_Method_: **Post /checkout**

```typescript
body: {
  id: string
}
```

```
Response status: 200
{
  id: number
  userId: string
  checkin: Date
  checkout: Date
}
```

```
Response error status: 400
{
    error: 'missing param error: param'
}
```

# API Endpoint Documentation

This document outlines the API endpoints exposed by the LAMS backend.

# Students

## Get all Students

Get the all students from the database

**URL** : `/students`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
[
{
  "fname": String,
  "lname": String,
  "dorm": String,
  "room": String,
  "status": String,
  "rin": Number,
  "email": String,
  "cname": String,
  "ccode": String,
  "cprof": String,
  "concern": String,
  "la": String,
  "ewsdate": Date,
  "ewscount": Number,
  "profcomment": String,
  "lacomment": String,
  "emailcnt": Number
},
{
  data
},
]
```

## Get one Student

Get one student’s information from the database

**URL** : `/students/:rin/:course`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "fname": String,
  "lname": String,
  "dorm": String,
  "room": String,
  "status": String,
  "rin": Number,
  "email": String,
  "cname": String,
  "ccode": String,
  "cprof": String,
  "concern": String,
  "la": String,
  "ewsdate": Date,
  "ewscount": Number,
  "profcomment": String,
  "lacomment": String,
  "emailcnt": Number
}
```

## Modify one Student

Modify one Student’s data in the database

**URL** : `/students/:rin/:course`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "message": "Successfully modified student: ___"
}
```

## Add student(s)

Add student(s) to database

**URL** : `/students`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "message": "Successfully added new data"
}
```

## Delete all

Delete all students from database

**URL** : `/students`

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "message": "Successfully deleted all student records"
}
```

## Delete one Student

Delete one Student from database

**URL** : `/students/:rin/:course`

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "Message": "Successfully deleted Student _____"
}
```

# Users

## Get all Users

Get all User data from the database

**URL** : `/users`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "uid": Number,
  "email": String,
  "role": String
},
{
  data
}
```

## Get one User

Get the specified User data from the database

**URL** : `/users/:uid`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "uid": Number,
  "email": String,
  "role": String
}
```

## Modify one User

Update the specified user in the database

**URL** : `/users/:uid`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "message": "Successfully modified user ___"
}
```

## Delete one User

Delete the specified user in the database

**URL** : `/students`

**Method** : `DETELE`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "message": "Successfully deleted user ___"
}
```

## Add one User

Delete a single user to the database

**URL** : `/users/:uid`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : LA Role

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "message": "Successfully added user ___"
}
```

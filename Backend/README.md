
# NeoMovie


# Backend

------------

## Necessary to start

------------

### If you use Windows

* Install WSL2
  * <https://docs.microsoft.com/fr-fr/windows/wsl/install-win10>

### Whatever you use

* Setup your vscode
  * <https://docs.microsoft.com/fr-fr/windows/wsl/tutorials/wsl-vscode>
* Install node and `npm`
  * <https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04>
* Setup your `.env`
  * `.env.local`
  * `.env.test`
* Add `ESLint` to your vscode extension
* Add `Prettier - Code formatter` to your vscode extension
  * Add `Prettier` to your default formatter document

### Database

##### Start Docker

To run docker, you must enter the following command:
(You will maybe need to use "sudo" to avoid some errors)

```bash
$> docker-compose up
```

##### Acess to DataBase and PgAdmin

By filling in the information in the .env files, you can have access to this database.  
If the Docker is launched on your machine, the host will be `localhost`. If it is launched on a remote machine, it will be the ip address of that machine.

Access ports are:
* PostgreSQL : `5432`
* PgAdmin : `8000`

Make sure to create the "neomovie_db" database in PgAdmin, if not defined.  
Then make sure you .env. has "neomovie_db" as DB_USER.


### Install PostgreSql clients

``` bash
$> sudo apt-get install postgresql-client-12
```

------------

## Run project

------------
### Start project for developper

```bash
$> npm run run-ts:local
```

### Test project

```bash
$> npm run test:integration
```

### Build projet with

```bash
$> npm run build
```

## What you must do before push 😉

------------

1. Create and do your **integration test** and **unit test** (if it's needed)
2. Do your error handling if is needed

## Testing

------------

There are npm commands to run the tests
### Unit Tests

```bash
$> npm run test:unit
```

### Integration Tests
```bash
$> npm run test:integration
```

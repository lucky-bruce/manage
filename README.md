# prerequisite
golang
MongoDB
Docker
NodeJS

# testing
``` bash
make server_start
```
By doing this you start Golang server_start.

Then in another terminal you write following to start Envoy proxy:

```bash
make envoy_build
```

```bash
make envoy_start
```

Lastly type this to start React app:
```bash
cd frontend
npm install
npm run build
serve -s build
```

```bash
docker run --rm \
  -v root_open-webui:/from:ro \
  -v "$PWD/open-webui-data":/to \
  alpine sh -c "cd /from && cp -a . /to"
```

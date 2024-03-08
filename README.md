# yalin.dev
The source code for my personal website, [yalin.dev](https://yalin.dev).

## Development
The website is built using [Hugo](https://gohugo.io/) and it uses a modified version of the [Blowfish](https://blowfish.page) theme: [ygunayer/blowfish](https://github.com/blowfish/ygunayer)

### Running
Make sure Hugo is installed, and then update the Git submodules to download the theme

```
$ git submodule update --recursive --remote
```

Then run the Hugo in server mode with the draft flag enabled

```
$ hugo server -D
```

You can now access the website at [https://localhost:1313](https://localhost:1313)

## Deployment
TBD

## License
MIT

# Runme inside of Devcontainer (sandboxed)

It's handy to attach to a container in dev on demand. Alternatively, one could use SSH to attach to a remote host but that's out of scope.

```sh
$ echo "Hello World"
```

```sh
$ export SYSTEM_INFO=$(uname -a)
$ echo "Running inside devcontainer? Check the spec:"
$ echo " 👉 $SYSTEM_INFO"
```

*Read the docs on [runme.dev](https://www.runme.dev/docs/intro) to learn how to get most out of Runme notebooks!*

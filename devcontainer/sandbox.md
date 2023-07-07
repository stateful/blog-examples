# Runme inside of Devcontainer (sandboxed)

It's handy to attach to a container in dev on demand. Alternatively, one could use SSH to attach to a remote host.

```sh
$ echo "Hello World"
$ echo
$ export SYSTEM_INFO=$(uname -a)
$ echo "Running inside devcontainer with the spec: $SYSTEM_INFO"
```

*Read the docs on [runme.dev](https://www.runme.dev/docs/intro) to learn how to get most out of Runme notebooks!*

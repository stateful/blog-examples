## Prerequiste 

[Brew](https://brew.sh/): Install package manager.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install node exporter 

```sh
brew install node_exporter
```

Install grafana

```sh
brew install grafana
```

Install prometheus 

```sh
brew install prometheus
```

Start the services

```sh
brew services start node_exporter
brew services start prometheus
brew services start grafana
```

Stop services from running 

```sh
brew services stop node_exporter
brew services stop prometheus
brew services stop grafana
```
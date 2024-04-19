## Node Exporter

Install Prometheus

```sh {"promptEnv":"yes"}
export version
export platform

# Download the Node Exporter binary (adjust the version as necessary)
wget https://github.com/prometheus/node_exporter/releases/download/v${version}/node_exporter-${version}.${platform}-arm64.tar.gz

# Extract the binary
tar -xzf node_exporter-${version}.${platform}-arm64.tar.gz

# Move the binary to a suitable location (e.g., /usr/local/bin)
sudo mv node_exporter-${version}.${platform}-arm64/node_exporter /usr/local/bin/

# Optionally, create a system service file (e.g., for systemd)
sudo nano /etc/systemd/system/node_exporter.service
```

Setup node exporter as a service

```sh
cat <<EOF > ${PWD}/node_exporter/node_exporter.service
[Unit]
Description=Prometheus Node Exporter
After=network.target

[Service]
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=default.target

EOF

```

Run node exporter as a service

```sh
sudo cp -rf ${PWD}/node_exporter/node_exporter.service /etc/systemd/system/

sudo systemctl daemon-reload

sudo systemctl enable node_exporter
echo "node exporter enable"

sudo systemctl start node_exporter
echo "node_exporter has started."


sudo systemctl status node_exporter

sudo systemctl restart node_exporter
```

## Prometheus

Install Prometheus

```sh {"promptEnv":"yes"}
export version

curl -LO https://github.com/prometheus/prometheus/releases/download/v${version}/prometheus-${version}.linux-amd64.tar.gz

tar -xzf prometheus-${version}.linux-amd64.tar.gz
mkdir -p ${PWD}/prometheus

cp -r prometheus-${version}.linux-amd64/prometheus ${PWD}/prometheus
cp -r prometheus-${version}.linux-amd64/promtool ${PWD}/prometheus
```

Setup your prometheus configuration

```sh
cat <<EOF > ${PWD}/prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
scrape_configs:
  - job_name: 'node_'
    metrics_path: /metrics
    static_configs:
      - targets:
        - 10.90.2.1:9116
EOF
```

Setup prometheus as a service

```sh
cat <<EOF > ${PWD}/prometheus/prometheus.service
[Unit]
Description=Prometheus Agent Mode
After=network-online.target
[Service]
User=${USER}
WorkingDirectory=${PWD}
ExecStart=${PWD}/prometheus/prometheus --config.file=${PWD}/prometheus/prometheus.yml --enable-feature=agent
[Install]
WantedBy=multi-user.target
EOF
```

Run Prometheus as a service

```sh
sudo cp -rf ${PWD}/prometheus/prometheus.service /etc/systemd/system/

sudo systemctl daemon-reload

sudo systemctl enable prometheus
echo "prometheus enable"

sudo systemctl start prometheus
echo "prometheus has started."

sudo systemctl status prometheus

sudo systemctl restart prometheus
```

Open the app

```sh
open http://localhost:9090
```

## Grafana

Install Grafana

```sh
sudo apt-get install -y adduser libfontconfig1   
wget https://dl.grafana.com/enterprise/release/grafana-enterprise_9.4.7_amd64.deb 
sudo dpkg -i grafana-enterprise_9.4.7_amd64.deb 
sudo apt-get install grafana 
systemctl enable --now grafana-server
systemctl restart grafana-server 
```

Open the app

```sh
open http://localhost:3000
```

## Alert Manager

Install alert manager 

```sh
curl -LO https://github.com/prometheus/alertmanager/releases/download/v0.27.0/alertmanager-0.27.0.linux-amd64.tar.gz

# Extract the binary
tar -xzf alertmanager-${version}.${platform}-amd64.tar.gz

# Move the binary to a suitable location (e.g., /usr/local/bin)
sudo mv alertmanager-${version}.${platform}-amd64/alertmanager /usr/local/bin/

# Move the binary to a suitable location (e.g., /etc)
cp alertmanager-<version>.${platform}-amd64/alertmanager.yml /etc/alertmanager/

alertmanager --config.file=/etc/alertmanager/alertmanager.yml
```

Edit the `alertmanager.yml` file to define your alerting configurations, notification integrations, and routing rules.

```sh
nano /etc/alertmanager/alertmanager.yml
```

Setup alert manager as a service

```sh
cat <<EOF > ${PWD}/alertmanager/alertmanager.service
[Unit]
Description=Alertmanager
Wants=network-online.target
After=network-online.target

[Service]
User=alertmanager
Group=alertmanager
Type=simple
ExecStart=/usr/local/bin/alertmanager --config.file=/etc/alertmanager/alertmanager.yml

[Install]
WantedBy=multi-user.target
EOF
```

Run alert manager as a service

```sh
sudo cp -rf ${PWD}/alertmanager/alertmanager.service /etc/systemd/system/

sudo systemctl daemon-reload

sudo systemctl start alertmanager
echo "alertmanager has started."

sudo systemctl enable alertmanager
echo "alertmanager enable"

sudo systemctl status alertmanager

sudo systemctl restart alertmanager
```

Open the app

```sh
open http://localhost:9093
```

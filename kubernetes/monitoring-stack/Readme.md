## Node Exporter

```sh {"id":"01HTHAM8YXDZD1DZYS2YJ0PNQ7","promptEnv":"yes"}
export version
export platform

# Download the Node Exporter binary (adjust the version as necessary)
wget https://github.com/prometheus/node_exporter/releases/download/v${version}/node_exporter-${version}.${platform}-amd64.tar.gz

# Extract the binary
tar -xzf node_exporter-${version}.${platform}-amd64.tar.gz

# Move the binary to a suitable location (e.g., /usr/local/bin)
sudo mv node_exporter-${version}.${platform}-amd64/node_exporter /usr/local/bin/

# Optionally, create a system service file (e.g., for systemd)
sudo nano /etc/systemd/system/node_exporter.service
```

```sh {"id":"01HTHAND34CXEK31FHK7FP0TKX"}
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

```sh {"id":"01HTHANZVNHFQX8T5F8DR4BEZ9"}
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

```sh {"id":"01HTH94A5KJ9YZZQSN0V58C7CH","promptEnv":"yes"}
export version

curl -LO https://github.com/prometheus/prometheus/releases/download/v${version}/prometheus-${version}.linux-amd64.tar.gz

tar -xzf prometheus-${version}.linux-amd64.tar.gz
mkdir -p ${PWD}/prometheus

cp -r prometheus-${version}.linux-amd64/prometheus ${PWD}/prometheus
cp -r prometheus-${version}.linux-amd64/promtool ${PWD}/prometheus
```

Setup your prometheus configuration

```sh {"id":"01HTH95FD9TZZMF5BNF92MVGVD"}
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

```sh {"id":"01HTH960STNY5ZJ3Y5ZRPPT6N1"}
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

```sh {"id":"01HTH96EFWG83BDVR1ME22A617"}
sudo cp -rf ${PWD}/prometheus/prometheus.service /etc/systemd/system/

sudo systemctl daemon-reload

sudo systemctl enable prometheus
echo "prometheus enable"

sudo systemctl start prometheus
echo "prometheus has started."

sudo systemctl status prometheus

sudo systemctl restart prometheus
```

## Grafana

Install Grafana

```sh {"id":"01HTHB7RZJA17S46Q5JE4XZ7Z1"}
sudo apt-get install -y adduser libfontconfig1   
wget https://dl.grafana.com/enterprise/release/grafana-enterprise_9.4.7_amd64.deb 
sudo dpkg -i grafana-enterprise_9.4.7_amd64.deb 
sudo apt-get install grafana 
systemctl enable --now grafana-server
systemctl restart grafana-server 
```
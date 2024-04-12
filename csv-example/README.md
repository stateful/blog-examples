---
runme:
  id: 01HV8M5A94AGGXWVK5N3NG2PXK
  version: v3
---

# Monitoring

> Requires extension [Data Table Renderers](vscode:extension/RandomFractalsInc.vscode-data-table)

Show CPU usage per Server

```sh {"id":"01HV8M69C0RYKTRDN9C9MMHNNQ","mimeType":"text/plain","name":"cpu-usave","terminalRows":"7"}
cat cpu-usage.csv # It could be a different source, i.e. remote resource
```

Show the latest build statuses

```sh {"id":"01HV8M6SEDP57MTWZ4P1K5W7Z4","mimeType":"text/plain","name":"builds","terminalRows":"7"}
cat builds.csv # It could be a different source, i.e. remote resource
```

Show the latest deployment statuses

```sh {"id":"01HV8M79VFT7QV1726J872JV7J","interactive":"true","mimeType":"text/plain","name":"deployments","terminalRows":"7"}
cat deployments.csv # It could be a different source, i.e. remote resource
```
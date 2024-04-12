---
runme:
  id: 01HV8Q9NTBRERV05N7PQWXQQ9R
  version: v3
---

# Environment State

This notebook demonstrates the usage of environment variables.

Let's set up a new environment variable

```sh {"id":"01HV8QC0BB83ZNHW48CXGM28C5","interactive":"false","name":"prompt","terminalRows":"2"}
export DEMO_VAR="Placeholder value"
```

Print the value of __DEMO_VAR__

```sh {"id":"01HV8QH2TD6HRJ406TZPARJZHN","name":"print","terminalRows":"2"}
echo $DEMO_VAR
```
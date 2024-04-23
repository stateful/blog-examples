---
runme:
  id: 01HW5H91ZG0R5RK0B9CM4GG1XE
  version: v3
---

## BigQuery on Google Cloud Platform Example

With the Google Cloud Platform SDK installed authenticate your account:

```sh {"id":"01HW5H91ZG0R5RK0B9CD77F41D"}
$ gcloud auth login
```

Edit SQL query to run:

```sql {"id":"01HW5HMS8KPR7JSVR2E9F3DFS5","name":"SQL_QUERY","terminalRows":"5"}
SELECT title, num_characters, timestamp, id, revision_id FROM
  `bigquery-public-data.samples.wikipedia`
WHERE num_characters < 67100
LIMIT 10;
```

Run and display BigQuery results.

```sh {"id":"01HW5H91ZG0R5RK0B9CG5R2KB6","interactive":"false","mimeType":"application/json"}
$ bq query --format prettyjson --use_legacy_sql=false $SQL_QUERY
```

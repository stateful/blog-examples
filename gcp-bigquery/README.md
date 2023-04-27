## BigQuery on Google Cloud Platform Example

With the Google Cloud Platform SDK installed authenticate your account:

```sh
$ gcloud auth login
```

Set format, run, and display BigQuery results.

```sh { interactive=false }
$ export FORMAT="sparse"
```

```sh { mimeType=text/csv }
$ bq query --format $FORMAT --use_legacy_sql=false < query.sql 2> /dev/null
```

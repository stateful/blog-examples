---
runme:
  id: 01J14G0JFWK8DWH9XH0K9NEWRZ
  version: v3
---

# Prerequisites

This tutorial requires four (4) virtual or physical ARM64 machines running Debian 12 (bookworm). The follow table list the four machines and thier CPU, memory, and storage requirements.

| Name    | Description            | CPU | RAM   | Storage |
|---------|------------------------|-----|-------|---------|
| jumpbox | Administration host    | 1   | 512MB | 10GB    |
| server  | Kubernetes server      | 1   | 2GB   | 20GB    |
| node-0  | Kubernetes worker node | 1   | 2GB   | 20GB    |
| node-1  | Kubernetes worker node | 1   | 2GB   | 20GB    |

Generate Jumpbox ID

```sh {"background":"true","id":"01HYMJ8DC5A2V2ZMQ4V9C3MXZK"}
aws ec2 describe-images --filters "Name=name,Values=*debian-12*" "Name=architecture,Values=arm64"
```

Generate Server ID

```sh {"background":"true","id":"01HYX2X85G35J0KKDEFQC0E2AM"}
aws ec2 describe-images --filters "Name=name,Values=*debian-12*" "Name=architecture,Values=arm64"
```

Generate Node-0

```sh {"background":"true","id":"01HYX2ZDJWSEP2PKKMW0MJ4756"}
aws ec2 describe-images --filters "Name=name,Values=*debian-12*" "Name=architecture,Values=arm64"
```

Generate Node-1 ID

```sh {"background":"true","id":"01HYX2ZNZZ85BE9MFKJXRTXFXS"}
aws ec2 describe-images --filters "Name=name,Values=*debian-12*" "Name=architecture,Values=arm64"
```

Create pem key

```sh {"background":"true","id":"01HYMJAFSNXPF7C3S7V2HR9ABD"}
aws ec2 create-key-pair --key-name RunmeKeyPair --query 'KeyMaterial' --output text > RunmeKeyPair.pem
chmod 400 RunmeKeyPair.pem
```

Create security- group

```sh {"background":"true","id":"01HYMJC5CFKE2QDQ85K2M8V9KS"}
aws ec2 create-security-group --group-name MyRunmeSecurityGroup --description "My security group"
```

```sh {"background":"true","id":"01HYMJDE7XX2YM75REGB0VH3ZD"}
aws ec2 authorize-security-group-ingress --group-name MyRunmeSecurityGroup --protocol tcp --port 22 --cidr 0.0.0.0/0

```

Create Jumpbox

```sh {"background":"true","id":"01HYMJGAWFR7350AQHYSK1PWF4"}
aws ec2 run-instances --image-id ami-07261f3082643d18d --instance-type t4g.nano --key-name RunmeKeyPair --security-groups MyRunmeSecurityGroup --block-device-mappings '[{"DeviceName":"/dev/sda1","Ebs":{"VolumeSize":10}}]' --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=Debian12BookwormInstance}]'

```

Create node-0

```sh {"id":"01HYX2YWSTREY8NTWPWPJVJ7WJ"}
aws ec2 run-instances --image-id ami-07261f3082643d18d --instance-type t4g.small --key-name RunmeKeyPair --security-groups MyRunmeSecurityGroup --block-device-mappings '[{"DeviceName":"/dev/sda1","Ebs":{"VolumeSize":20}}]' --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=Debian12BookwormInstance}]'
```

Create node-1

```sh {"id":"01J14GEVY50ZCTH5FYSWKPTZZB"}
aws ec2 run-instances --image-id ami-07261f3082643d18d --instance-type t4g.small --key-name RunmeKeyPair --security-groups MyRunmeSecurityGroup --block-device-mappings '[{"DeviceName":"/dev/sda1","Ebs":{"VolumeSize":20}}]' --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=Debian12BookwormInstance}]'
```

Create Server

```sh {"id":"01J14GEYDFZT5GM2BTG5EM65TK"}
aws ec2 run-instances --image-id ami-07261f3082643d18d --instance-type t4g.small --key-name RunmeKeyPair --security-groups MyRunmeSecurityGroup --block-device-mappings '[{"DeviceName":"/dev/sda1","Ebs":{"VolumeSize":20}}]' --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=Debian12BookwormInstance}]'
```

# Cleanup

Delete the compute resources created during this tutorial.

## Compute Instances

Delete the controller and worker compute instances.

Stop or terminate instance

```sh {"background":"true","id":"01HYMM0FK6BDYRD5P78CKYD4KA"}
aws ec2 terminate-instances --instance-ids i-04be9bc79ae6c42a0

```

Delete the security group:

```sh {"background":"true","id":"01HYMK5YKJ37MT25S7CGS7T8DC"}
aws ec2 delete-security-group --group-name MyRunmeSecurityGroup

```
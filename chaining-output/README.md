---
runme:
  id: 01HV8TCT91WQK41ZN6NP48QXEK
  version: v3
---

# Chaining output between cells

With the `$__` parameter you can transfer the stdout result of a previous cell into your next execution. This is useful if you want to reuse the output across interpretes

Run a command to save its output automatically

```sh {"id":"01HV8TJ5C27G4XB2JWMNH42H36","name":"ping","terminalRows":"7"}
ping -c 1 www.google.com
```

Now use the output of the previous command.

* Note: If you rerun the same cell, the value of `$__` will be replaced with its latest output.

```sh {"id":"01HV8TMCGKPVH19YN4Q1Q6529Q","name":"print-last-value","terminalRows":"3"}
echo $__ | tail -n 3
```

Resolve a public IP address class A

```sh {"id":"01HV8VFZGDPEQ0P2ZKM6AJX4P4","name":"public-ip","terminalRows":"2"}
curl -s https://ipecho.net/plain
```

Print a IP address class C

```sh {"id":"01HV8W1RFARXVEA89231KGY33M","name":"local-ip","terminalRows":"2"}
echo "192.168.0.1"
```

Now, let's analyze the output using a straightforward Python script to determine the class of the IP address.

```python {"id":"01HV8VMVBH865FPHWZDS94VTFN","name":"ip-class","terminalRows":"3"}
import os

def get_ip_class(ip_address):
    # Split the IP address into octets
    octets = ip_address.split('.')

    # Convert the first octet to an integer
    first_octet = int(octets[0])

    # Determine the IP address class based on the first octet
    if 1 <= first_octet <= 126:
        return 'Class A'
    elif 128 <= first_octet <= 191:
        return 'Class B'
    elif 192 <= first_octet <= 223:
        return 'Class C'
    elif 224 <= first_octet <= 239:
        return 'Class D (Multicast)'
    elif 240 <= first_octet <= 255:
        return 'Class E (Reserved)'
    else:
        return 'Invalid IP address'

# Read the IP address from the environment variable
ip_address = os.getenv("__")

# Check if the IP address is provided
if ip_address:
    ip_class = get_ip_class(ip_address)
    print(f"The IP address {ip_address} belongs to {ip_class}.")
else:
    print("No IP address provided in the environment variable.")
```
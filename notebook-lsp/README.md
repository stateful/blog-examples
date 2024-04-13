---
runme:
  id: 01HVC0KKGVRRZVJYKTNSYBJMB2
  version: v3
---

# Notebook Language Syntax Support

Runme Notebooks provide extensive support for fenced code blocks in Markdown, accommodating various scripting and declarative languages. Whether you're using  `Bash`, `YAML`, `JSON`, `Python`, `Javascript`, or other languages within your Markdown documents.

Runme ensures seamless integration with text highlighting and auto-completion features. This comprehensive language support empowers you to write and document more efficiently, enhancing your documentation experience.

Yaml example

```yaml {"id":"01HVC4P0KE6YKN9HRPYD8XTRNN"}
name: John Doe
age: 30

hobbies:
  - reading
  - cooking

description: |
  John Doe is a DevOps Engineer with passion for learning new tech
```

Python Example

```python {"id":"01HVC4RFTRG2FYTMA5WN6V648N"}
def say_hello():
  print("Hello!")

say_hello()
```

Javascript Example

```javascript {"id":"01HVC4SXH3CMH7EF3RYBME2XEB"}
function sayHello() {
  console.log("Hello!")
}

sayHello()
```

Bash Example

```sh {"id":"01HVC4VDBWTRZGRXXAC0PGFM0N"}
hello_world() {
  echo "Hello, world!"
}

hello_world
```
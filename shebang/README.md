# Mix & Match Languagues

In this case, JavaScript + Bash + Ruby. Fetching a list of veggies from a REST API.

```javascript { terminalRows=20 }
(async function getVeggies() {
    const response = await fetch('http://localhost:8888/api/vegetables');
        
    const veggiesObject = await response.json();
    const veggiesArray = Object.values(veggiesObject);
        
    veggiesArray.forEach(v => console.log(v));
})();

```

### Don't like spinach? 🤔

The previous cell's output will be "piped" into `$__`.

```sh { terminalRows=10 }
echo -n $__ | grep -v Spinach
```

### No more Spinach 🥬

Similarly Ruby can use the `__` environment variable to access the previous cell's output.

```ruby
def chop_em(cart)
    print cart.split(/[\r\n]+/).sort()
end

chop_em(ENV["__"])
```

Read the docs at [runme.dev](https://runme.dev/) to learn more about shebang and how to get most out of Runme notebooks!
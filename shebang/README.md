# Mix and match: JavaScript + Bash + Ruby

```javascript { terminalRows=20 }
(async function getVeggies() {
    const response = await fetch('http://localhost:8888/api/vegetables');
        
    const veggiesObject = await response.json();
    const veggiesArray = Object.values(veggiesObject);
        
    veggiesArray.forEach(v => console.log(v));
})();

```

Don't like spinach? 🤔

```sh { terminalRows=10 }
echo -n $__ | grep -v Spinach
```

```ruby
def chop_em(cart)
    print cart.split(/[\r\n]+/)
end

chop_em(ENV["__"])
```

Read the docs on [runme.dev](https://runme.dev/) to learn how to get most out of Runme notebooks! 
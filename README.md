# v-dotdotdot

vue directive for ellipsis on multiple line content

# Usage

```js
// global register in main.js or import inside the component and use as directive
import Dotdotdot from 'v-dotdotdot'
import 'v-dotdotdot/dist/v-dotdotdot.css'

Vue.use(Dotdotdot)
// Vue.use(Dotdotdot, { line: 2 })

<component v-dotdotdot />
// <component v-dotdotdot="{ line: 3, className: 'my-class', moreType: 'icon' }" />
```

# Configuration

| option | description | type | defaut |
| ---------- |:----------:| ----------:|----------:|
| line | num of line to keep in clamp | number | 0 (no clamp) |
| className | custom class name | string | '' |
| moreType | type of more tag | text \| icon | text |
| moreText | text of more tag | string | 'show more' (effect with text moreType only) |
| disableAutoDot | auto clamp with dot initially | boolean | false |


# MeteorJs SelectBoxes

These are the reactive select boxes for meteor

```bash
$ meteor add lylak:select-boxes
```
[GitHub](https://github.com/stepanlylak/select-boxes), [AtmosphereJs](https://atmospherejs.com/lylak/select-boxes)
# **How to use:**

### template:
```html
<template name="Your_template">
    ...
    {{>Select_boxes yourConfig}}
    ...
</template>
```
### config:
```js
Template.Your_template.helpers({
    yourConfig() {
        return {
            className: 'your-modal-class(es)',
            currentVal: 'css',
            valKey: 'mode', // select value key in options array(default 'val')
            txtKey: 'text', // select text key in options array(default 'txt')
            options: [
                {
                    text: 'JavaScript/JSON',
                    mode: 'javascript'
                },
                {
                    text: 'CSS/SCSS',
                    mode: 'css'
                },
                {
                    text: 'PHP',
                    mode: 'php'
                },
                {
                    text: 'HTML',
                    mode: 'htmlmixed'
                }
            ],
            onChange() { // onChange callback
                console.log(this) // 'this' it is selected object
            }
        };
    }
});

//or get data from element
const selected = Blaze.getView(document.getElementsByClassName('.select-boxes')[0])._templateInstance.active.curValue
```

# React-Simple-Select
## A simple select react component designed for 3 things
1. simplicity 
2. ease of custom styling 
3. Mobile - (Works for both mobile and web out of the box)

## Purpose:
I wanted a simple React component that wasn't bogged down in all the extras. Something I could easily style and extend. Something that even if I did build in some additional features I could do it in a way that didn't compromise my original simple, stylable component. It also needed to do enough easily so as to be worth creating a better starting point for future me and possibly even others.

## 1. Simplicity
```javascript
const options = [
    {value: 1, label: 'Option 1'},
    {value: 'text value 2', label: 'Option 2'},
    {value: {complex: 'object', moreProps: 'hello'}, label: 'Option 3'}
]
const onChange = (event, val, fullOption) => {
    //triggered on select of new item and on cancellation of an item.
}
```
```html
<SimpleSelect options={options} onChange={onChange}/>
```

## 2. Easy Custom Styling

A few basic props for those that fear or despise CSS.
```html
<SimpleSelect options={options} width='200px'/> //Fixed Width (Fluid by default)
<SimpleSelect options={options} fixedHeight/> //Fixed Height - assumes single line of text with ellipsis (Fluid by default)
<SimpleSelect options={options} hasSharpCorners> //Standard Corners (Rounded by default)
```

CSS is divided into a separate file for each part of the component and added extra comments to guide novices on what to change and wear to get good results. We want to provide the simplest way to style or change any portion of the component easily.
You can inject your custom css and use the same definitions while adding a single tagname to increase CSS specificity by 1. The examples below can be added to styles.css and just work (they are 1 point more specific than the default styles). The component also behaves like a normal div...no odd behavior if placed inside another container regardless of positioning or style. 
```css
/* Default in SimpleSelect.css */
div.mySelectDefault .fieldset {
  padding: 0.5em;
  font-size: 1.2em; /*All the padding is em-based meaning if you change the font-size first you may find you are happy with the relative padding.*/
}
/* Default in SimpleSelect-legend.css */
div.mySelectDefault .fieldset .legend {
  background-color: lime;
  padding: 0em 0.5em;
  border: 1px solid green;
  font-size: 0.8em;
  font-style: italic;
  font-variant: small-caps;
}
```

## 3. Mobile
It works out of the box...

---

## Getting Started

Since this is a create-react-scripts project you can clone the project, npm install, and npm start.

---

Other Documentation:
### onChange
onChange fire appropriately when a new value is selected and when a value is canceled. Passing in your own onChange event will receive the core event, theCurrentVal of the option, and the fullOption (in case the label or other option properties are important to you.)

## Why:
Why did I build this: I'll be honest I built this component after rage quitting use of all 3 of the most popular react select components online. They all do a lot of things and have a ton of features, but they are all painful to work with and painful to style (surprise...that is often the cost of complexity.) That is not to say these other options aren't great...if you need a lot of bells and whistles that might be the way to go. (Or if you just like the idea of spending more time trying to reduce the padding on a component than you did plugging it into your app). This component is meant to be a simple starting point. I did not set out to ["beat"](https://xkcd.com/844/) all those other components I do not underestimate the amount of work that goes into supporting a complex widget with dozens of internal features. I have great empathy around how we found ourselves in this current state, but not so much as to prevent a rage-driven coding frenzy that produced this first iteration of a new react-simple-select component. ([just what we all need...](https://xkcd.com/927/))



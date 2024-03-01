# applehover

The `useAppleHover` hook and `AppleHoverWrapper` are designed to provide an interactive hover effect similar to the one seen on Apple TV apps. It allows elements to move slightly in 3D space when hovered, giving a sense of depth and responsiveness.

## Installation

```bash
npm install appplehover
```
```bash
yarn add applehover
```

## Usage

To apply the Apple hover effect to a component, you will need to use the `useAppleHover` hook and pass it to the `ref` property of your component.

```jsx
import React from 'react';
import { useAppleHover } from 'applehover';

const MyComponent = () => {
  const appleHoverRef = useAppleHover({ 
    /* options */ 
    scale: 1.05,
    duration: 0.4,
    shadowColor: 'd3d3d3',
    cardBackgroundColor: 'fafafa',
    modifier: 10,
    });

  return (
    <div ref={appleHoverRef}>
      {/* content */}
    </div>
  );
};

export default MyComponent;
```
##
Alternatively, the `AppleHoverWrapper` component takes a single child (which can be any React node) and applies the Apple hover effect to it using the useAppleHover hook. The effect's behavior can be customized via props passed to the AppleHoverWrapper component.

This approach allows you to easily add an interactive hover effect to any component or element in your application without directly managing ref hooks or event listeners each time.

```jsx
import React from 'react';
import AppleHoverWrapper from './AppleHoverWrapper';

const MyComponent = () => {
  return (
    <AppleHoverWrapper
      scale={1.05}
      duration={0.5}
      shadowColor="d3d3d3"
      cardBackgroundColor="fafafa"
      shadow={true}
    >
      <div>
        Hover over me!
      </div>
    </AppleHoverWrapper>
  );
};

export default MyComponent;
```

## Options
`useAppleHover` accepts an object with the following properties to customize the hover effect:

- `scale` (default: 1.1): The scale to which the element should grow when hovered.
- `duration` (default: 0.5): The duration of the hover effect transition in seconds.
- `transitionTimingFunction` (default: 'linear'): The CSS timing function to use for the transition.
- `shadowTimingFunction` (default: 'cubic-bezier(0.215, 0.61, 0.355, 1)'): The CSS timing function to use for the shadow transition.
- `shadow` (default: true): A boolean indicating whether a shadow should be displayed during the hover effect.
- `shadowColor` (default: '000'): The color of the shadow in hexadecimal format.
- `cardBackgroundColor` (default: 'fff'): The background color of the card in hexadecimal format.
- `cardBackgroundOpacity` (default: 1.0): The opacity of the card background.
- `shadowOpacity` (default: 0.15): The opacity of the shadow.
delay (default: 0): The delay before the transition starts in seconds.
- `modifier` (default: 5): A multiplier for the hover effect's rotation degree.

## Notes
The hook uses the ref attribute to apply the effect to the DOM element, so it must be attached to a component that forwards refs.
The shadowColor and cardBackgroundColor expect hexadecimal color values without the hash (#). The hook will convert these to RGB format internally.

## License
This project is open-sourced under the MIT license.

## Contributions
Contributions are welcome! Please submit a pull request or create an issue if you have any features or fixes to propose.
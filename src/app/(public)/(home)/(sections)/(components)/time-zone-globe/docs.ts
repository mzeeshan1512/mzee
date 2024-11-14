/**
 * Renders an interactive 3D globe with spinning and animated arc features.
 * 
 * This code defines a Three.js-based globe component using React and React-Three-Fiber,
 * with customizable animations of arcs representing connections between points on the globe.
 * It consists of the following components and utilities:
 * 
 * - `SpinningGlobe`: Displays a textured globe sphere that rotates continuously.
 * - `generateRandomPoint`: Generates random points on the globe’s surface, used as start and end positions for arcs.
 * - `createArcPoints`: Creates interpolated arc points between two points, giving height to the arc for visual effect.
 * - `TravelingArc`: Draws an animated dashed line between two points, creating a traveling arc with customizable color, speed, and height.
 * - `Globe`: Combines all elements to render the globe and multiple animated arcs in a Canvas component.
 * 
 * ## Components
 * 
 * ### `SpinningGlobe`
 * Renders a rotating globe with a specified texture.
 * 
 * - **Texture**: `BG`, an image asset applied as a map for the sphere’s surface.
 * - **Rotation**: Automatically rotates on the Y-axis within the `useFrame` hook.
 * 
 * ### `generateRandomPoint`
 * Creates random points on a spherical surface for arcs.
 * 
 * - **Returns**: A `Vector3` point positioned randomly on a sphere of radius 35.
 * 
 * ### `createArcPoints`
 * Generates points along an arc between a start and end point, adding height for a curved effect.
 * 
 * - **Parameters**:
 *   - `start`: Start point of the arc.
 *   - `end`: End point of the arc.
 *   - `height`: Height of the arc’s curve.
 *   - `segments`: Number of segments for interpolating points.
 * - **Returns**: Array of `Vector3` points along the arc.
 * 
 * ### `TravelingArc`
 * Draws an animated arc with dashed lines traveling between two points on the globe.
 * 
 * - **Props**:
 *   - `start`: Start position (`Vector3`).
 *   - `end`: End position (`Vector3`).
 *   - `color`: Color of the arc.
 *   - `height`: Curve height of the arc (default is 10).
 *   - `delay`: Animation delay in seconds (default is 0).
 *   - `speed`: Speed of arc animation (default is 1).
 * - **Animation**: Utilizes `useFrame` to adjust dash size, gap, offset, and opacity for a dynamic arc animation.
 * 
 * ### `Globe`
 * Main component combining the spinning globe and multiple animated arcs.
 * 
 * - **Arcs**: Creates a set of `TravelingArc` components with random start/end points, colors, and animation properties.
 * - **Camera**: Positioned for optimal viewing of the globe.
 * - **Controls**: Orbit controls with constraints to limit globe rotation, enable auto-rotate, and disable zoom/pan.
 * - **Lighting**: Ambient and directional light provide basic illumination.
 * 
 * ## Usage
 * Import the `Globe` component and add it to a React app with styles defined for the container.
 * 
 * Example:
 * ```jsx
 * import { Globe } from './path/to/Globe';
 * 
 * function App() {
 *   return <Globe />;
 * }
 * ```
 */

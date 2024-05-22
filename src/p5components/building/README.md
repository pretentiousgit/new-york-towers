## Buildings are envelopes

In architecture, the building is an envelope around living spaces. 

You design the spaces inside, then layer the building materials around those spaces to define them. 

In this folder are the materials to design volumes, onto which we hang the decor that makes the apartment. The structures defined in these files don't need to be actually drawn in order to imply the shape inside them

Decor is stored in other folders - stairs, windows, things that decorate windows and need a relationship to those volumes, and then things that decorate buildings and therefore require those mathematical relationships. 

Windows and fire escapes are both a type of functional box decoration in this case - they set up geometries that other pieces of decor might hang off of, and by their physics define the shape of that decoration.

Therefore, both a building and a window or a fire escape have both "generators," which define their math, and draw calls, which reify the math into the projection in game space.

Generators should in general run first, and contribute their math to both each other and draw calls

### Specific Notes On 2D Building Generation
- Building, from top-left down - sets possibility of building size, shape, fire escapes, type of escape, etc.
  - All these can be manually overridden to test different "random" generator elements
- Story count for building 
  - Buildings are not a guaranteed height, but levels are consistent within them?
  - Sometimes a level is taller at the top and bottom

After we have those elements, we can work on other ones:
- **What flavour of windows does it have?** Each building has all the same.
- **What flavour of fire escapes does it have?** Every level of these is the same.
- Is the building symmetric or not? - this implies max and min windows per floor

Elements that concern specifically windows:
- Once generated, any window should have some other properties:
  - Illumination
  - Air conditioner
  - Cat?
  - Houseplants?
  - Other Decor??
- These properties would make good programming exercises

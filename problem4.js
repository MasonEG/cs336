// Similar to GL_example1b, but illustrates using a varying variable
// to interpolate a color attribute for each vertex.  (See shader source
// in GL_Example2.html.)

// raw data for some point positions
var numPoints = 12;
var vertices = new Float32Array([
-0.8, -0.3,
-0.8, 0.3,
-0.2, -0.3,
-0.2, -0.3,
-0.2, 0.3,
-0.8, 0.3, //multicolor square
0.2, -0.3,
0.2, 0.3,
0.8, 0.3,
0.8, 0.3,
0.8, -0.3,
0.2, -0.3 //selected color square
]
);

// a color value for each vertex
var colors = new Float32Array([
1.0, 0.0, 0.0, 1.0,  // red
0.0, 1.0, 0.0, 1.0,  // green
0.0, 0.0, 1.0, 1.0,  // blue
0.0, 0.0, 1.0, 1.0,  // blue
0.0, 0.0, 0.0, 0.0,  //alpha
1.0, 0.0, 0.0, 1.0,  // red
0.0, 0.0, 1.0, 1.0,  // blue
0.0, 0.0, 1.0, 1.0,  // blue
0.0, 0.0, 1.0, 1.0,  // blue
0.0, 0.0, 1.0, 1.0,  // blue
0.0, 0.0, 1.0, 1.0,  // blue
0.0, 0.0, 1.0, 1.0   // blue
]
);


// A few global variables...

// the OpenGL context
var gl;

// handles to buffers on the GPU
var vertexbuffer;
var colorbuffer;

// handle to the compiled shader program on the GPU
var shader;


// code to actually render our geometry
function draw()
{
  // clear the framebuffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  // bind the shader
  gl.useProgram(shader);

  // bind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexbuffer);

  // get the index for the a_Position attribute defined in the vertex shader
  var positionIndex = gl.getAttribLocation(shader, 'a_Position');
  if (positionIndex < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // "enable" the a_position attribute 
  gl.enableVertexAttribArray(positionIndex);
  
  // associate the data in the currently bound buffer with the a_position attribute
  // (The '2' specifies there are 2 floats per vertex in the buffer.  Don't worry about
  // the last three args just yet.)
  gl.vertexAttribPointer(positionIndex, 2, gl.FLOAT, false, 0, 0);

  // we can unbind the buffer now (not really necessary when there is only one buffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // bind the buffer with the color data
  gl.bindBuffer(gl.ARRAY_BUFFER, colorbuffer);

  // get the index for the a_Color attribute defined in the vertex shader
  var colorIndex = gl.getAttribLocation(shader, 'a_Color');
  if (colorIndex < 0) {
    console.log('Failed to get the storage location of a_Color');
    return;
  }

  // "enable" the a_Color attribute 
  gl.enableVertexAttribArray(colorIndex);
  
  // Associate the data in the currently bound buffer with the a_Color attribute
  // The '4' specifies there are 4 floats per vertex in the buffer
  gl.vertexAttribPointer(colorIndex, 4, gl.FLOAT, false, 0, 0);

  // we can unbind the buffer now
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  // draw, specifying the type of primitive to assemble from the vertices
  gl.drawArrays(gl.TRIANGLES, 0, numPoints);
  
  // unbind shader and "disable" the attribute indices
  // (not really necessary when there is only one shader)
  gl.disableVertexAttribArray(positionIndex);
  gl.disableVertexAttribArray(colorIndex);
  gl.useProgram(null);

}

// entry point when page is loaded
function main() {
  
  // basically this function does setup that "should" only have to be done once,
  // while draw() does things that have to be repeated each time the canvas is 
  // redrawn	
	
    // get graphics context
  gl = getGraphicsContext("theCanvas");

  // load and compile the shader pair
  shader = createProgram(gl, 'vertexShader', 'fragmentShader');

  // load the vertex data into GPU memory
  vertexbuffer = createAndLoadBuffer(vertices);
  
  //load the color data into GPU memory
  colorbuffer = createAndLoadBuffer(colors);
  
  
  // specify a fill color for clearing the framebuffer
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  
  // we could just call draw() once to see the result, but setting up an animation
  // loop to continually update the canvas makes it easier to experiment with the 
  // shaders
  //draw();
  
  // define an animation loop
  var animate = function() {
	draw();
	
	// request that the browser calls animate() again "as soon as it can"
    requestAnimationFrame(animate); 
  };
  
  // start drawing!
  animate();

  
}
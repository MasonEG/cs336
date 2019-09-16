
// Gets the graphics context from the window
function getGraphicsContext(canvasId) {
    // retrieve <canvas> element
    let canvas = document.getElementById(canvasId);
  
    // get graphics context - note that WebGL 2.0 seems
    // to be incompatible with the Chrome shader editor,
    // so use WebGL 1.0 for now
    //let context = canvas.getContext("webgl2");
    let context = canvas.getContext("webgl");
    if (!context) {
      console.log('Failed to get the rendering context for WebGL');
    }
    return context;
  }
  
  // Helper function to load and compile one shader (vertex or fragment)
  function loadAndCompileShader(gl, type, source) {
    // Create shader object
    var shader = gl.createShader(type);
    if (shader == null) {
      console.log('unable to create shader');
      return null;
    }
  
    // Set the source code
    gl.shaderSource(shader, source);
  
    // Compile
    gl.compileShader(shader);
  
    // Check the result of compilation
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      var error = gl.getShaderInfoLog(shader);
      console.log('Failed to compile shader: ' + error);
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  
  // Helper function compiles two shaders and creates shader program
  function createProgram(gl, vshaderId, fshaderId) {
  
    // extract shader source code from the html
    var vshaderSource = document.getElementById(vshaderId).textContent;
    var fshaderSource = document.getElementById(fshaderId).textContent;
  
    // Load and compile shader code
    var vertexShader = loadAndCompileShader(gl, gl.VERTEX_SHADER, vshaderSource);
    var fragmentShader = loadAndCompileShader(gl, gl.FRAGMENT_SHADER, fshaderSource);
    if (!vertexShader || !fragmentShader) {
      return null;
    }
  
    // Create a program object
    var program = gl.createProgram();
    if (!program) {
      return null;
    }
  
    // Attach the shader objects
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
  
    // Link the program object
    gl.linkProgram(program);
  
    // Check the result of linking
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      var error = gl.getProgramInfoLog(program);
      console.log('Failed to link program: ' + error);
      gl.deleteProgram(program);
      gl.deleteShader(fragmentShader);
      gl.deleteShader(vertexShader);
      return null;
    }
    return program;
  }
  
  // allocates a gpu memory buffer and fills it with the given data
  function createAndLoadBuffer(data)
  {
    // request a handle for a chunk of GPU memory
    let buffer = gl.createBuffer();
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return;
    }
  
    // "bind" the buffer as the current array buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  
    // load our data onto the GPU (uses the currently bound buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  
    // now that the buffer is filled with data, we can unbind it
    // (we still have the handle, so we can bind it again when needed)
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
    return buffer;
  
  }
  
  // allocates a gpu memory buffer and fills it with the given data
  function createAndLoadIndexBuffer(data)
  {
    // request a handle for a chunk of GPU memory
    let buffer = gl.createBuffer();
    if (!buffer) {
      console.log('Failed to create the buffer object');
      return;
    }
  
    // "bind" the buffer as the current array buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  
    // load our data onto the GPU (uses the currently bound buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  
    // now that the buffer is filled with data, we can unbind it
    // (we still have the handle, so we can bind it again when needed)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  
    return buffer;
  
  }
  
  function toRadians(degrees)
  {
      return degrees * Math.PI / 180;
  }
  
  function toDegrees(radians)
  {
      return radians * 180 / Math.PI;
  }
  
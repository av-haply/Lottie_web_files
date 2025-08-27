// threejs-animation.js

function initThreeJsAnimation(containerId) {
  const container = document.getElementById(containerId);

  // === Scene / Camera / Renderer ===
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // === Video setup ===
  const video1 = makeVideo("https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4");
  const video2 = makeVideo("https://interactive-examples.mdn.mozilla.net/media/cc0-videos/beer.mp4");

  const plane1 = makeVideoPlane(video1, -3);
  const plane2 = makeVideoPlane(video2,  3);
  scene.add(plane1, plane2);

  // Try autoplay
  syncPlay([video1, video2]);

  // === Animation loop ===
  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // Handle resizes
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// === Helpers ===
function makeVideo(url) {
  const video = document.createElement("video");
  video.src = url;
  video.loop = true;
  video.muted = true;       // autoplay requires muted
  video.playsInline = true;
  video.crossOrigin = "anonymous";
  return video;
}

function makeVideoPlane(video, xOffset) {
  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const geometry = new THREE.PlaneGeometry(2.5, 1.5);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = xOffset;
  return mesh;
}

async function syncPlay(videos) {
  videos.forEach(v => v.currentTime = 0);
  try {
    await Promise.allSettled(videos.map(v => v.play()));
  } catch (err) {
    console.warn("Autoplay failed, user gesture needed:", err);
  }
}






// 
  // document.addEventListener("DOMContentLoaded", function() {
  
  //   // Identifiers
  // 	const robot_image = document.querySelector("#block-yui_3_17_2_1_1753104290995_7775")
  //   const design_image = document.querySelector("#block-cf0709b671497ee60b5c")
  // 	const AI_image = document.querySelector("#block-ec4780b41ecdfdf15249")
    
  //   const button_one = document.querySelector("#block-ea96154502bc2f3878d1")
	// const button_two = document.querySelector("#block-f20b57fc6267cfbf37f4")
  //   const button_three = document.querySelector("#block-5ae795bde28f1be251c6")
    
  //   // State
  //   let image_state = robot_image
    
  //   let dict = {
  //   	'robot_image' : robot_image,
  //   	'design_image' : design_image,
  //   	'AI_image' : AI_image,
  //   }

  //   // Arrays of elements
  //   const arr = [[button_one, 'robot_image'], [button_two, 'design_image'], [button_three, 'AI_image']]
    
    
    
  //   // Innitialize image 2 and 3 as off
  //  	design_image.className = design_image.className + ' off'
  //  	AI_image.className = AI_image.className + ' off'
    
    
  //   arr.forEach( ( el ) => {
  //     // add transition animations
  //     dict[ el[1] ].className = dict[ el[1] ].className + ' image-transitions'
      
  //     const handler = ( event ) => {
  //       // if already active, return
  //       if ( image_state == dict[ el[1]] ) return;
       
  //       // activate new image with class
  //       let split = dict[ el[1] ].className.split('off')
  //       let new_string = split.join('')
  //       dict[ el[1] ].className = new_string
        
  //       // add transition class to previous active image
  //       image_state.className = image_state.className + ' image-on-transition'
        
  //       let target = image_state
  //       setTimeout( () => {
	// 		let split = target.className.split('image-on-transition')
  //       	let new_string = split.join('')
  //           target.className = new_string + ' off'
  //       }, 200 )

  //       // disable the previous active image after transition to reset

  //       // make new image the currently active
  //       image_state = dict[ el[1] ]
  //     }
    
  //   	el[0].addEventListener( 'click', handler )
  //       el[0].addEventListener( 'touchdown', handler )

  //   })
  // })
// ?
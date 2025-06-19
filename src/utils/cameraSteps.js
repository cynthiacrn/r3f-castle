import * as THREE from 'three'

export const cameraSteps = [
  {
    name: 'intro',
    position: new THREE.Vector3(60, 20, 120),
    lookAt: new THREE.Vector3(0, 15, 0),
    title: 'The Watchful Fortress',
    text: `Welcome to Castle Brumeciel, a fortress born from mist and stone, standing tall on its hill like a sentinel of time. 
From this vantage point, the entire structure reveals its design: towers like spears to the sky, walls shaped by ancient defense, and a story carved into every stone.`
  },
  {
    name: 'moat',
    position: new THREE.Vector3(59.86, 7.19, 66.84),
    lookAt: new THREE.Vector3(59.75, 9.98, 16.25),
    title: 'The Moat’s Embrace',
    text: `Surrounding the base of the castle, the moat served both as a natural defense and a mirror to the sky. 
Its waters, still and treacherous, formed the first line of resistance against any siege, forcing enemies to pause and hesitate.`
  },
  {
    name: 'bridge',
    position: new THREE.Vector3(49.09, 4.57, 57.75),
    lookAt: new THREE.Vector3(18.82, 5.73, 59.29),
    title: 'The Stone Bridge',
    text: `Built with unwavering stone, the bridge was the only way in and often, the last way out. 
Crossing it meant passing under the watchful eye of archers above, a quiet warning etched in every footstep.`
  },
  {
    name: 'gate',
    position: new THREE.Vector3(-2.27, 12.57, 45.05),
    lookAt: new THREE.Vector3(-2.46, 25.58, -6.67),
    title: 'The Castle Gate',
    text: `Massive and reinforced, the castle gate was more than just an entrance, it was a message: “You enter on our terms.” Flanked by watchtowers and fortified stone, it channeled both awe and intimidation.`
  },
  {
    name: 'walls',
    position: new THREE.Vector3(-40.02, 27.67, 22.10),
    lookAt: new THREE.Vector3(-2.78, 16.13, -1.79),
    title: 'The Shielding Walls',
    text: `Looming above the landscape, the ramparts were the backbone of the castle’s defense. Soldiers once patrolled these walls day and night, ever vigilant, scanning the horizon for threats or omens.`
  },
  {
    name: 'towers',
    position: new THREE.Vector3(58.95, 15.57, 5.25),
    lookAt: new THREE.Vector3(4.95, 29.17, 12.29),
    title: 'The Skyward Towers',
    text: `Rising like spears into the sky, the towers were both sentinels and sanctuaries. From here, one could spot distant riders or watch storms rolling in across the hills.`
  },
  {
    name: 'chapel',
    position: new THREE.Vector3(-2.60, 30.51, 16.80),
    lookAt: new THREE.Vector3(1.34, 24.21, 0.23),
    title: 'The Inner Chapel',
    text: `Quiet and solemn, the chapel offered a place of reflection and hope. 
Even the most hardened knights knelt here, seeking strength beyond steel.`
  },
  {
    name: 'keep',
    position: new THREE.Vector3(14.10, 37.09, 18.70),
    lookAt: new THREE.Vector3(-2.75, 35.21, -2.80),
    title: 'The Final Keep',
    text: `The highest and most secure point of the castle, the last refuge in times of siege. It housed the lord, the archives, and the secrets of Brumeciel.`
  },
  {
    name: 'end',
    position: new THREE.Vector3(60.00, 20.00, 120.00),
    lookAt: new THREE.Vector3(0, 15, 0),
    title: 'Farewell to Brumeciel',
    text: `As you drift away from the stone and shadow, the stories of this place remain. Whispers of history, courage, and quiet resistance echo through its halls.`
  }
]

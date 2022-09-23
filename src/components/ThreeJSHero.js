import React from 'react'

import {Canvas, extend} from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from "../assets/fonts/gentilis_bold.typeface.json"


import {FontLoader} from "three/examples/jsm/loaders/FontLoader";

extend({ TextGeometry })



const ThreeJSHero = () => {


//---------- Text 3D
    const font = new FontLoader().parse(myFont);


    const bevelSize = 0.02;
    const bevelThickness = 0.03;

    const options = {
        font,
        size:1,
        height:0.5,
        curveSegments:6,
        bevelEnabled: true,
        bevelThickness:bevelThickness,
        bevelSize:bevelSize,
        bevelOffset:0,
        bevelSegments:3
    };

    const readMesh = React.useRef();
    const writeMesh = React.useRef();
    const earnMesh = React.useRef();

    //---------------- 3D Other elements

    function createElement() {
        return{
            position: {
                    x:(-Math.random() + 0.3)*25,
                    y:(Math.random() - 0.5)*25 ,
                    z:(-Math.random() - 0.2)*25
                },
            rotation: {
                x:(2* Math.PI * Math.random()),
                y:(2* Math.PI * Math.random()),
                z:(2* Math.PI * Math.random())
            }
            }
    }


    let icosahedronGeometry = [];
    let octahedronGeometry = [];
    let tetrahedronGeometry = [];
    for (let j = 0; j < 25; j++) {

            icosahedronGeometry.push(createElement());
            octahedronGeometry.push(createElement());
            tetrahedronGeometry.push(createElement());

    }

        //--------------------


    return (
        <div style={{ "width":"100%", "overflow":"hidden"}} id="canvas-container">
            <Canvas className={"vh-100 position-relative"} style={{"width":"100vw",'backgroundColor':"black", "overflow":"hidden !important"}}>
                <ambientLight intensity={0.3} />

                <directionalLight color="white" position={[0, 0, 5]} />
                <directionalLight color="white" position={[0, 0, -5]} />


                <mesh ref={readMesh} position={[-4,1,0]} rotation={[0,0,0]}>
                    <textGeometry args={['Read', options]}/>
                    <meshStandardMaterial color={'#00A632'} />
                </mesh>


                <mesh ref={writeMesh} position={[-4,0,0]}>
                    <textGeometry args={['Write', options]}/>
                    <meshStandardMaterial color={'#989898'} />
                </mesh>


                <mesh ref={earnMesh} position={[-4,-1,0]}>
                    <textGeometry args={['Earn', options]}/>
                    <meshStandardMaterial color={'#1F6935'} />
                </mesh>

                {icosahedronGeometry.map(element => {
                   return (
                        <mesh
                            key={element.position.x}
                            position={[element.position.x,element.position.y,element.position.z]}
                            rotation={[element.rotation.x,element.rotation.y,element.rotation.z]}

                        >
                            <icosahedronGeometry/>
                            <meshStandardMaterial color={'#989898'} />
                        </mesh>
                    )
                })}

                {octahedronGeometry.map(element => {
                    return (
                        <mesh
                            key={element.position.x}
                            position={[element.position.x,element.position.y,element.position.z]}
                            rotation={[element.rotation.x,element.rotation.y,element.rotation.z]}

                        >
                            <octahedronGeometry/>
                            <meshStandardMaterial color={'#00A632'} />
                        </mesh>
                    )
                })}

                {tetrahedronGeometry.map(element => {
                    return (
                        <mesh
                            key={element.position.x}
                            position={[element.position.x,element.position.y,element.position.z]}
                            rotation={[element.rotation.x,element.rotation.y,element.rotation.z]}

                        >
                            <tetrahedronGeometry/>
                            <meshStandardMaterial color={'#1F6935'} />
                        </mesh>
                    )
                })}


            </Canvas>
        </div>

    )
}

export default ThreeJSHero
